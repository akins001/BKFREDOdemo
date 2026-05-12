import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Trash2, Upload, LogOut } from "lucide-react";

const CATEGORIES = ["Turkish Doors", "Floor Tiles", "Wall Tiles", "Non-Slip Tiles"] as const;
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

  // Login form
  const [email, setEmail] = useState("admin@bkfredo.com");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Upload form
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Turkish Doors");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
      toast.error("Image and title are required");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${category.replace(/\s+/g, "-").toLowerCase()}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);

      const { error: insErr } = await supabase.from("gallery_images").insert({
        title: title.trim(),
        category,
        description: description.trim() || null,
        image_url: pub.publicUrl,
        storage_path: path,
      });
      if (insErr) throw insErr;

      toast.success("Image uploaded");
      setFile(null);
      setTitle("");
      setDescription("");
      (document.getElementById("file-input") as HTMLInputElement).value = "";
      loadItems();
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryRow) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    const { error: rmErr } = await supabase.storage.from("gallery").remove([item.storage_path]);
    if (rmErr) toast.error(rmErr.message);
    const { error } = await supabase.from("gallery_images").delete().eq("id", item.id);
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
          <h1 className="text-2xl font-heading font-bold mb-6">Admin Login</h1>
          {session && !isAdmin && (
            <p className="text-sm text-destructive mb-4">
              Signed in but not an admin.{" "}
              <button onClick={handleLogout} className="underline">
                Sign out
              </button>
            </p>
          )}
          {!session && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loggingIn}>
                {loggingIn && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Gallery Admin</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </Button>
      </div>

      <Card className="p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Upload new image</h2>
        <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="file-input">Image file</Label>
            <Input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} required />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="desc">Description (optional)</Label>
            <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              Upload
            </Button>
          </div>
        </form>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Uploaded images ({items.length})</h2>
      {loadingItems ? (
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">No images uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-3">
                <p className="text-xs text-primary font-semibold uppercase tracking-wider">{item.category}</p>
                <p className="font-semibold text-sm mt-1 line-clamp-1">{item.title}</p>
                {item.description && <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>}
                <Button variant="destructive" size="sm" className="mt-3 w-full" onClick={() => handleDelete(item)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
