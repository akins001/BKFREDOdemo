import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save, Trash2 } from "lucide-react";

type Row = { id: string; youtube_url: string; autoplay: boolean };

const FeaturedVideoAdmin = () => {
  const [row, setRow] = useState<Row | null>(null);
  const [url, setUrl] = useState("");
  const [autoplay, setAutoplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("featured_video")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) {
      setRow(data as Row);
      setUrl(data.youtube_url);
      setAutoplay(data.autoplay);
    } else {
      setRow(null);
      setUrl("");
      setAutoplay(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("YouTube URL required");
      return;
    }
    setSaving(true);
    const payload = { youtube_url: url.trim(), autoplay, updated_at: new Date().toISOString() };
    const { error } = row
      ? await supabase.from("featured_video").update(payload).eq("id", row.id)
      : await supabase.from("featured_video").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(row ? "Updated" : "Added");
      load();
    }
  };

  const handleRemove = async () => {
    if (!row) return;
    if (!confirm("Remove featured video?")) return;
    const { error } = await supabase.from("featured_video").delete().eq("id", row.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Removed");
      load();
    }
  };

  return (
    <Card className="p-6 mb-10">
      <h2 className="text-xl font-semibold mb-4">Featured Video</h2>
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="yt-url">YouTube URL</Label>
            <Input
              id="yt-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="autoplay" checked={autoplay} onCheckedChange={setAutoplay} />
            <Label htmlFor="autoplay" className="cursor-pointer">
              Enable autoplay (muted by default)
            </Label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {row ? "Update" : "Add"} Video
            </Button>
            {row && (
              <Button type="button" variant="destructive" onClick={handleRemove}>
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>
        </form>
      )}
    </Card>
  );
};

export default FeaturedVideoAdmin;
