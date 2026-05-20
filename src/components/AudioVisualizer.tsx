"use client"

import { cn } from "@/lib/utils"

export function AudioVisualizer({ isPlaying = false, className }: { isPlaying?: boolean, className?: string }) {
  return (
    <div className={cn("flex items-end justify-center gap-[2px] h-8", className)}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-primary rounded-full wave-bar",
            isPlaying ? "animate-wave" : "h-[10%]"
          )}
          style={{
            height: isPlaying ? undefined : `${10 + Math.random() * 40}%`
          }}
        />
      ))}
    </div>
  )
}
