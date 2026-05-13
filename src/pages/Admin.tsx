import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Trash2, Upload, LogOut, Pencil } from "lucide-react";

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
  const [email, setEmail] = useState("");
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

  // Edit dialog
  const [editing, setEditing] = useState<GalleryRow | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<Category>("Turkish Doors");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const openEdit = (item: GalleryRow) => {
    setEditing(item);
    setEditTitle(item.title);
    setEditCategory((CATEGORIES as readonly string[]).includes(item.category) ? (item.category as Category) : "Turkish Doors");
    setEditDescription(item.description ?? "");
    setEditFile(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editTitle.trim()) {
      toast.error("Title is required");
      return;
    }
    setSavingEdit(true);
    try {
      let image_url = editing.image_url;
      let storage_path = editing.storage_path;

      if (editFile) {
        const ext = editFile.name.split(".").pop() || "jpg";
        const path = `${editCategory.replace(/\s+/g, "-").toLowerCase()}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, editFile, {
          contentType: editFile.type,
          upsert: false,
        });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
        // remove old file
        await supabase.storage.from("gallery").remove([editing.storage_path]);
        image_url = pub.publicUrl;
        storage_path = path;
      }

      const { error } = await supabase
        .from("gallery_images")
        .update({
          title: editTitle.trim(),
          category: editCategory,
          description: editDescription.trim() || null,
          image_url,
          storage_path,
        })
        .eq("id", editing.id);
      if (error) throw error;

      toast.success("Updated");
      setEditing(null);
      loadItems();
    } catch (err: any) {
      toast.error(err.message ?? "Update failed");
    } finally {
      setSavingEdit(false);
    }
  };

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

    // Auto sign-out on tab/window close so each session requires fresh login
    const signOutOnUnload = () => {
      try {
        // Clear Supabase auth keys synchronously so refresh tokens don't survive
        Object.keys(localStorage)
          .filter((k) => k.startsWith("sb-") && k.endsWith("-auth-token"))
          .forEach((k) => localStorage.removeItem(k));
      } catch {}
    };
    window.addEventListener("beforeunload", signOutOnUnload);

    // Inactivity auto-logout after 15 minutes
    let inactivityTimer: number | undefined;
    const resetInactivity = () => {
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        supabase.auth.signOut();
        toast.message("Signed out due to inactivity");
      }, 15 * 60 * 1000);
    };
    const activityEvents = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    activityEvents.forEach((e) => window.addEventListener(e, resetInactivity));
    resetInactivity();

    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("beforeunload", signOutOnUnload);
      activityEvents.forEach((e) => window.removeEventListener(e, resetInactivity));
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
    };
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
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required />
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
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(item)}>
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDelete(item)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit image</DialogTitle>
          </DialogHeader>
          {editing && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <img src={editing.image_url} alt={editing.title} className="w-full h-40 object-cover rounded" />
              <div>
                <Label htmlFor="edit-file">Replace image (optional)</Label>
                <Input
                  id="edit-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                />
              </div>
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} maxLength={120} required />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as Category)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="edit-desc">Description</Label>
                <Input id="edit-desc" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} maxLength={200} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button type="submit" disabled={savingEdit}>
                  {savingEdit && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
