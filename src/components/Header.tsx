"use client"

import { Headphones, Menu, User, Library, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Headphones className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-pulse-slow">
            BeatMind AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#generator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generator
          </Link>
          <Link href="#library" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <Library className="w-4 h-4" />
            My Tracks
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Docs</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-muted/20">
            <User className="w-5 h-5" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}
