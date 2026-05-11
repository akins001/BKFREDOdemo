import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement>;

/**
 * Image with a subtle shimmer placeholder that fades to the loaded image.
 * Drop-in replacement for <img />.
 */
const ImageWithLoader = ({ className, onLoad, alt, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!loaded && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
        </div>
      )}
      <img
        {...props}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
};

export default ImageWithLoader;
