"use client"

import * as React from "react"
import { Sparkles, Loader2, Music4, Zap, Mic2, CassetteTape, History, Trash2, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { generateMusicWithGenreAndMood } from "@/ai/flows/generate-music-with-genre-and-mood"
import { BeatMindPlayer } from "./BeatMindPlayer"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const GENRES = ["Cinematic", "Gaming", "Lo-Fi", "Electronic", "Classical", "Rock", "Jazz"] as const
const MOODS = ["Happy", "Sad", "Energetic", "Relaxing", "Intense", "Peaceful"] as const

type Track = {
  id: string
  prompt: string
  genre?: string
  mood?: string
  duration: number
  audioDataUri: string
  createdAt: number
}

export function PromptSection() {
  const [prompt, setPrompt] = React.useState("")
  const [selectedGenre, setSelectedGenre] = React.useState<typeof GENRES[number] | undefined>()
  const [selectedMood, setSelectedMood] = React.useState<typeof MOODS[number] | undefined>()
  const [duration, setDuration] = React.useState<"15" | "30">("15")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [genProgress, setGenProgress] = React.useState(0)
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null)
  const [history, setHistory] = React.useState<Track[]>([])

  // Load history from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("beatmind_history")
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse history", e)
      }
    }
  }, [])

  // Save history to localStorage
  React.useEffect(() => {
    localStorage.setItem("beatmind_history", JSON.stringify(history))
  }, [history])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setGenProgress(10)
    
    // Simulate progress while generating
    const progressInterval = setInterval(() => {
      setGenProgress(prev => {
        if (prev >= 90) return prev
        return prev + 5
      })
    }, 800)

    try {
      const result = await generateMusicWithGenreAndMood({
        prompt,
        genre: selectedGenre,
        mood: selectedMood,
        duration: parseInt(duration),
      })

      const newTrack: Track = {
        id: Math.random().toString(36).substring(7),
        prompt,
        genre: selectedGenre,
        mood: selectedMood,
        duration: parseInt(duration),
        audioDataUri: result.audioDataUri,
        createdAt: Date.now()
      }

      setGenProgress(100)
      setTimeout(() => {
        setCurrentTrack(newTrack)
        setHistory(prev => [newTrack, ...prev])
        setIsGenerating(false)
        setGenProgress(0)
      }, 500)

    } catch (error) {
      console.error("Failed to generate music", error)
      setIsGenerating(false)
      setGenProgress(0)
    } finally {
      clearInterval(progressInterval)
    }
  }

  const deleteTrack = (id: string) => {
    setHistory(prev => prev.filter(t => t.id !== id))
    if (currentTrack?.id === id) setCurrentTrack(null)
  }

  const examplePrompts = [
    "Epic orchestral cinematic battle theme",
    "Chill lo-fi study beats with raining sound",
    "Fast paced 8-bit retro arcade background music",
    "Emotional piano melody for a sad drama scene",
    "Energetic synthwave track for a car race"
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div id="generator" className="relative bg-card border border-border/60 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/20 transition-all duration-1000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -ml-32 -mb-32 group-hover:bg-accent/20 transition-all duration-1000" />
        
        <div className="relative space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              Sonic Imagination
            </h2>
            <p className="text-muted-foreground text-lg">Describe the sound, energy, and mood for your perfect track.</p>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="e.g., A mysterious ambient soundscape with deep bass and shimmering synths..."
              className="min-h-[140px] text-lg bg-background/40 border-border/50 focus:ring-primary focus:border-primary resize-none p-6 rounded-2xl shadow-inner"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest self-center mr-2">Try:</span>
              {examplePrompts.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="text-xs text-muted-foreground bg-muted/20 hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/30 transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6 border-y border-border/30">
            <div className="space-y-4">
              <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                <CassetteTape className="w-4 h-4 text-primary" /> Genre
              </label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer px-4 py-1.5 text-sm font-medium transition-all active:scale-95 border-border/50",
                      selectedGenre === genre ? "bg-primary border-primary shadow-lg shadow-primary/30" : "hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
                    )}
                    onClick={() => setSelectedGenre(selectedGenre === genre ? undefined : genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                <Music4 className="w-4 h-4 text-accent" /> Mood
              </label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <Badge
                    key={mood}
                    variant={selectedMood === mood ? "secondary" : "outline"}
                    className={cn(
                      "cursor-pointer px-4 py-1.5 text-sm font-medium transition-all active:scale-95 border-border/50",
                      selectedMood === mood ? "bg-accent border-accent text-accent-foreground shadow-lg shadow-accent/30" : "hover:bg-accent/10 hover:border-accent/40 hover:text-accent"
                    )}
                    onClick={() => setSelectedMood(selectedMood === mood ? undefined : mood)}
                  >
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-4">
            <div className="flex items-center gap-4 bg-muted/20 p-1.5 rounded-xl border border-border/40">
              <span className="text-[10px] font-bold text-muted-foreground ml-3 mr-1 uppercase tracking-widest">Duration</span>
              <Tabs value={duration} onValueChange={(v) => setDuration(v as any)}>
                <TabsList className="bg-transparent h-10 gap-1 p-0">
                  <TabsTrigger value="15" className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg px-6 h-full font-bold">15s</TabsTrigger>
                  <TabsTrigger value="30" className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg px-6 h-full font-bold">30s</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 w-full sm:w-auto">
              {isGenerating ? (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest mb-1">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> 
                      AI Orchestrating...
                    </span>
                    <span>{genProgress}%</span>
                  </div>
                  <Progress value={genProgress} className="h-2 bg-muted/30" />
                </div>
              ) : (
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-full font-headline font-bold text-xl shadow-xl shadow-primary/30 group relative overflow-hidden active:scale-95 transition-all"
                >
                  <Zap className="w-6 h-6 mr-2 fill-current group-hover:animate-bounce" />
                  Generate Track
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTrack && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-accent" />
              New Masterpiece
            </h3>
            <span className="text-xs font-bold text-muted-foreground bg-muted/30 px-3 py-1 rounded-full uppercase tracking-tighter flex items-center gap-2">
              <Clock className="w-3 h-3" /> Just now
            </span>
          </div>
          <BeatMindPlayer
            src={currentTrack.audioDataUri}
            title={currentTrack.prompt}
            duration={currentTrack.duration}
            className="shadow-2xl border-primary/20 ring-1 ring-primary/10"
          />
        </div>
      )}

      {history.length > 0 && (
        <div id="library" className="space-y-8 pt-16 border-t border-border/50 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-3xl font-headline font-bold flex items-center gap-3">
                <History className="w-8 h-8 text-primary" />
                Music Library
              </h3>
              <p className="text-muted-foreground">Your collection of AI-generated compositions.</p>
            </div>
            <Badge variant="outline" className="h-8 px-4 font-bold border-border/50">
              {history.length} Tracks
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {history.map((track) => (
              <div 
                key={track.id} 
                className={cn(
                  "bg-card/40 border border-border/40 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 hover:border-primary/30 hover:bg-card/60 transition-all group relative overflow-hidden",
                  currentTrack?.id === track.id && "border-accent/50 bg-accent/5"
                )}
              >
                <div className="w-14 h-14 bg-muted/20 rounded-xl flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0 shadow-inner">
                  <Music4 className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0 text-center md:text-left space-y-1">
                  <p className="font-bold text-lg text-foreground truncate">{track.prompt}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {track.genre && <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest py-0 px-2 bg-background/40">{track.genre}</Badge>}
                    {track.mood && <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest py-0 px-2 bg-background/40 border-accent/20 text-accent">{track.mood}</Badge>}
                    <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest py-0 px-2 bg-background/40">{track.duration}s</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentTrack(track)} 
                    className="text-primary hover:text-primary hover:bg-primary/10 font-bold uppercase tracking-widest text-xs"
                  >
                    Load Player
                  </Button>
                  <div className="h-8 w-[1px] bg-border/50 hidden md:block" />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteTrack(track.id)}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
