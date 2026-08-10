import React from "react";

export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={className}
      src="https://assets.21st.dev/ascii-recipes/videos/user_3GfKZHMVrEGaZQLVz5Qufduwjfk/b1e07644-b9c3-4bf3-a409-44a1e95759db.mp4"
      poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GfKZHMVrEGaZQLVz5Qufduwjfk/5a2bb8d2-7315-4c9d-a2ff-0b1bc615c76c.webp"
      autoPlay
      loop
      muted
      playsInline
      aria-label="Neon Nebula — animated ASCII art"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
