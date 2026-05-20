"use client"

import * as React from "react"
import { Play, Pause, Download, Volume2, SkipBack, SkipForward, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { AudioVisualizer } from "./AudioVisualizer"
import { cn } from "@/lib/utils"

interface BeatMindPlayerProps {
  src: string
  title: string
  duration?: number
  onDownload?: () => void
  className?: string
}

export function BeatMindPlayer({ src, title, duration = 15, onDownload, className }: BeatMindPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [volume, setVolume] = React.useState([80])
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const audioDuration = audioRef.current?.duration || duration

  return (
    <div className={cn("w-full bg-card border border-border rounded-xl p-4 shadow-xl", className)}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary shrink-0">
          <Music className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-headline font-semibold text-lg truncate">{title}</h4>
          <p className="text-sm text-muted-foreground uppercase tracking-widest text-xs font-medium">BeatMind Generated Track</p>
        </div>
        <AudioVisualizer isPlaying={isPlaying} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground w-10">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={audioDuration}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1 cursor-pointer"
          />
          <span className="text-xs font-mono text-muted-foreground w-10">{formatTime(audioDuration)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button 
              onClick={togglePlay} 
              size="icon" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12 rounded-full shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group">
              <Volume2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="w-20">
                <Slider 
                  value={volume} 
                  max={100} 
                  onValueChange={setVolume}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary/50 text-primary hover:bg-primary/10 gap-2"
              onClick={() => {
                const link = document.createElement('a');
                link.href = src;
                link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.mp3`;
                link.click();
                onDownload?.();
              }}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
