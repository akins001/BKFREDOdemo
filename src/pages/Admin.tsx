import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Trash2, Upload, LogOut } from "lucide-react";

const CATEGORIES = [
  "Turkish Doors",
  "Floor Tiles",
  "Wall Tiles",
  "Non-Slip Tiles",
] as const;

type Category = typeof CATEGORIES[number];

type GalleryRow = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  storage_path: string;
};

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  // auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // upload
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Turkish Doors");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  // edit (FIXED)
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] =
    useState<Category>("Turkish Doors");
  const [editDescription, setEditDescription] = useState("");

  const [items, setItems] = useState<GalleryRow[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) checkAdmin(s.user.id);
      else {
        setIsAdmin(false);
        setChecking(false);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) checkAdmin(data.session.user.id);
      else setChecking(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    setChecking(true);

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data);
    setChecking(false);

    if (data) loadItems();
  };

  const loadItems = async () => {
    setLoadingItems(true);

    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) toast.error(error.message);
    else setItems(data as GalleryRow[]);

    setLoadingItems(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoggingIn(false);

    if (error) toast.error(error.message);
    else toast.success("Signed in");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      toast.error("Image and title required");
      return;
    }

    setUploading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${category
        .replace(/\s+/g, "-")
        .toLowerCase()}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("gallery")
        .upload(path, file);

      if (upErr) throw upErr;

      const { data: pub } = supabase.storage
        .from("gallery")
        .getPublicUrl(path);

      const { error: insErr } = await supabase
        .from("gallery_images")
        .insert({
          title: title.trim(),
          category,
          description: description.trim() || null,
          image_url: pub.publicUrl,
          storage_path: path,
        });

      if (insErr) throw insErr;

      toast.success("Uploaded");

      setFile(null);
      setTitle("");
      setDescription("");
      (document.getElementById("file-input") as HTMLInputElement).value =
        "";

      loadItems();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  // EDIT START
  const startEdit = (item: GalleryRow) => {
    setEditItemId(item.id);
    setEditTitle(item.title);
    setEditCategory(item.category as Category);
    setEditDescription(item.description ?? "");
  };

  // EDIT SAVE
  const saveEdit = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gallery_images")
        .update({
          title: editTitle.trim(),
          category: editCategory,
          description: editDescription.trim() || null,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Updated");

      setEditItemId(null);
      loadItems();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (item: GalleryRow) => {
    if (!confirm(`Delete "${item.title}"?`)) return;

    await supabase.storage.from("gallery").remove([item.storage_path]);

    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", item.id);

    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  if (checking) {
    return (
      <div className="container-custom py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="container-custom py-16 max-w-md">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

          {!session && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button disabled={loggingIn} className="w-full">
                {loggingIn && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Sign In
              </Button>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Gallery Admin</h1>

        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>

      {/* UPLOAD */}
      <Card className="p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Upload</h2>

        <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-4">
          <Input
            id="file-input"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border p-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button disabled={uploading}>
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Upload
          </Button>
        </form>
      </Card>

      {/* ITEMS */}
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="p-3">
            <img
              src={item.image_url}
              className="h-40 w-full object-cover"
            />

            <p className="font-semibold">{item.title}</p>

            {editItemId === item.id ? (
              <>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <Button onClick={() => saveEdit(item.id)}>
                  Save
                </Button>

                <Button onClick={() => setEditItemId(null)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => startEdit(item)}>Edit</Button>
            )}

            <Button
              variant="destructive"
              onClick={() => handleDelete(item)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;