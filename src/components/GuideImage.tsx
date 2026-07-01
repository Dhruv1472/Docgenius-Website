import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";

interface GuideImageProps {
  imageName?: string;
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
}

export const GuideImage = ({
  imageName,
  src,
  alt,
  caption,
  className = "",
}: GuideImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Construct full S3 URL if imageName is provided
  const imageUrl = imageName
    ? `https://docgenius.s3.us-east-1.amazonaws.com/User_Guide_Images/${imageName}.png`
    : src || "";

  return (
    <div className={`my-8 select-none ${className}`}>
      {/* Image Container with Hover zoom overlay */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative group cursor-zoom-in rounded-2xl border border-border bg-muted/30 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 max-w-full"
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center min-h-[240px]">
            <span className="text-xs text-muted-foreground">Loading image...</span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015] ${isLoading ? "opacity-0" : "opacity-100"
            }`}
        />

        {/* Hover overlay icon */}
        {!isLoading && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-border/50 scale-95 group-hover:scale-100 transition-transform duration-300">
              <ZoomIn className="w-4 h-4 text-foreground" />
              <span className="text-xs font-semibold text-foreground">Click to Expand</span>
            </div>
          </div>
        )}
      </div>

      {/* Caption description */}
      {caption && (
        <p className="mt-3 text-xs text-center text-muted-foreground leading-relaxed px-4 italic">
          {caption}
        </p>
      )}

      {/* Full-Screen Zoom Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
              aria-label="Close zoom preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center bg-card/10 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-2xl cursor-default"
            >
              <img
                src={imageUrl}
                alt={alt}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
              {caption && (
                <div className="w-full bg-background/80 border-t border-border/40 py-3.5 px-6 mt-2 text-center text-sm font-medium text-foreground rounded-b-lg line-clamp-2">
                  {caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
