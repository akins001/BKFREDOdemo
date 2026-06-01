import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Volume2, VolumeX, ExternalLink } from "lucide-react";

const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => ["embed", "shorts", "v"].includes(p));
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    return null;
  } catch {
    return null;
  }
};

const FeaturedVideo = () => {
  const [data, setData] = useState<{ youtube_url: string; autoplay: boolean } | null>(null);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    supabase
      .from("featured_video")
      .select("youtube_url, autoplay")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.youtube_url) setData(data);
      });
  }, []);

  if (!data) return null;
  const videoId = extractVideoId(data.youtube_url);
  if (!videoId) return null;

  const autoplay = data.autoplay;
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? (muted ? "1" : "0") : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
  });
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  const toggleMute = () => {
    const cmd = muted ? "unMute" : "mute";
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: cmd, args: [] }),
      "*"
    );
    setMuted((m) => !m);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Watch</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Featured Video</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden bg-black shadow-lg" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              ref={iframeRef}
              key={embedUrl}
              src={embedUrl}
              title="Featured Video"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {autoplay && (
              <button
                onClick={toggleMute}
                className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded font-semibold text-sm hover:bg-primary/10 transition-colors"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {muted ? "Unmute" : "Mute"}
              </button>
            )}
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-primary text-primary-foreground px-6 py-2.5 rounded font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Watch on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
