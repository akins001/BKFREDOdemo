import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Trash2, Pencil, User, Plus } from "lucide-react";

type StaffRow = {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
  storage_path: string | null;
  sort_order: number;
};

const StaffAdmin = () => {
  const [items, setItems] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(false);

  // Add form
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Edit
  const [editing, setEditing] = useState<StaffRow | null>(null);
  const [editName, setEditName] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("staff_members" as any)
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    else setItems((data as unknown as StaffRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadImage = async (f: File) => {
    const ext = f.name.split(".").pop() || "jpg";
    const path = `staff/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from("gallery")
      .upload(path, f, { contentType: f.type, upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from("gallery").getPublicUrl(path);
    return { image_url: data.publicUrl, storage_path: path };
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim()) {
      toast.error("Name and position required");
      return;
    }
    setSaving(true);
    try {
      let image_url: string | null = null;
      let storage_path: string | null = null;
      if (file) {
        const up = await uploadImage(file);
        image_url = up.image_url;
        storage_path = up.storage_path;
      }
      const maxSort = items.reduce(
        (m, i) => Math.max(m, i.sort_order),
        0
      );
      const { error } = await supabase
        .from("staff_members" as any)
        .insert({
          name: name.trim(),
          position: position.trim(),
          image_url,
          storage_path,
          sort_order: maxSort + 1,
        });
      if (error) throw error;
      toast.success("Staff added");
      setName("");
      setPosition("");
      setFile(null);
      const el = document.getElementById(
        "staff-file"
      ) as HTMLInputElement | null;
      if (el) el.value = "";
      load();
    } catch (err: any) {
      toast.error(err.message ?? "Failed");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (s: StaffRow) => {
    setEditing(s);
    setEditName(s.name);
    setEditPosition(s.position);
    setEditFile(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editName.trim() || !editPosition.trim()) {
      toast.error("Name and position required");
      return;
    }
    setSavingEdit(true);
    try {
      let image_url = editing.image_url;
      let storage_path = editing.storage_path;
      if (editFile) {
        const up = await uploadImage(editFile);
        if (editing.storage_path) {
          await supabase.storage
            .from("gallery")
            .remove([editing.storage_path]);
        }
        image_url = up.image_url;
        storage_path = up.storage_path;
      }
      const { error } = await supabase
        .from("staff_members" as any)
        .update({
          name: editName.trim(),
          position: editPosition.trim(),
          image_url,
          storage_path,
        })
        .eq("id", editing.id);
      if (error) throw error;
      toast.success("Updated");
      setEditing(null);
      load();
    } catch (err: any) {
      toast.error(err.message ?? "Update failed");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (s: StaffRow) => {
    if (!confirm(`Delete "${s.name}"?`)) return;
    if (s.storage_path) {
      await supabase.storage.from("gallery").remove([s.storage_path]);
    }
    const { error } = await supabase
      .from("staff_members" as any)
      .delete()
      .eq("id", s.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      setItems((prev) => prev.filter((i) => i.id !== s.id));
    }
  };

  return (
    <Card className="p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Core Staff</h2>

      <form
        onSubmit={handleAdd}
        className="grid md:grid-cols-2 gap-4 mb-6"
      >
        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Position (e.g. Manager)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Input
          id="staff-file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          Add staff
        </Button>
      </form>

      {loading ? (
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No staff yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                {s.image_url ? (
                  <img
                    src={s.image_url}
                    alt={s.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground/40" />
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm line-clamp-1">
                  {s.name}
                </p>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {s.position}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEdit(s)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(s)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit staff member</DialogTitle>
          </DialogHeader>
          {editing && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              {editing.image_url && (
                <img
                  src={editing.image_url}
                  alt={editing.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <div>
                <Label htmlFor="edit-staff-file">
                  Replace photo (optional)
                </Label>
                <Input
                  id="edit-staff-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditFile(e.target.files?.[0] ?? null)
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-staff-name">Name</Label>
                <Input
                  id="edit-staff-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-staff-position">Position</Label>
                <Input
                  id="edit-staff-position"
                  value={editPosition}
                  onChange={(e) => setEditPosition(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={savingEdit}>
                  {savingEdit && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StaffAdmin;
