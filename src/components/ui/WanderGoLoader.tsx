import React from "react";

interface WanderGoLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

export const WanderGoLoader: React.FC<WanderGoLoaderProps> = ({
  message = "Loading your journey...",
  subMessage = "Preparing unforgettable travel experiences",
  fullScreen = true,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
      {/* Brand Logo with Rotating Glowing Aura */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Ambient Blurred Pulse Glow */}
        <div className="absolute size-28 rounded-full bg-[#EC003F]/20 blur-xl animate-pulse" />
        
        {/* Outer Rotating Gradient Ring */}
        <div className="size-24 rounded-full border-3 border-transparent border-t-[#EC003F] border-r-pink-400 border-b-transparent border-l-transparent animate-spin" />
        
        {/* Inner Counter-Rotating Ring */}
        <div className="absolute size-20 rounded-full border-2 border-dashed border-[#EC003F]/30 animate-spin [animation-direction:reverse] [animation-duration:4s]" />

        {/* Center Brand Logo Icon Container */}
        <div className="absolute inset-0 m-auto size-16 rounded-2xl bg-card border border-border/60 shadow-lg flex items-center justify-center p-2.5 overflow-hidden">
          <img
            src="/src/assets/images/WanderGoLOgo2.png"
            alt="WanderGo"
            className="w-full h-auto object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Modern Status Typography */}
      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-base sm:text-lg font-extrabold text-foreground font-nunito tracking-tight flex items-center justify-center gap-1">
          <span>{message}</span>
          <span className="flex gap-1 ml-0.5">
            <span className="size-1 rounded-full bg-[#EC003F] animate-bounce [animation-delay:-0.3s]" />
            <span className="size-1 rounded-full bg-[#EC003F] animate-bounce [animation-delay:-0.15s]" />
            <span className="size-1 rounded-full bg-[#EC003F] animate-bounce" />
          </span>
        </h3>
        {subMessage && (
          <p className="text-xs text-muted-foreground font-medium">
            {subMessage}
          </p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full min-h-[320px] flex items-center justify-center">
      {content}
    </div>
  );
};

export default WanderGoLoader;
