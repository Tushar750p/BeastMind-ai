import { Header } from "@/components/Header"
import { PromptSection } from "@/components/PromptSection"
import { Sparkles, ArrowDown, AudioLines, Zap, ShieldCheck, Music, Headphones } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 pt-40 pb-24 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary animate-in fade-in zoom-in duration-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Next-Gen Audio Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.95] tracking-tighter">
            Score your ideas <br />
            <span className="text-primary italic relative">
              with AI.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            BeatMind AI translates your descriptions into studio-grade background music in seconds. Royalty-free, copyright-safe, pure creativity.
          </p>

          <div className="flex flex-col items-center gap-6 pt-6">
            <div className="flex items-center gap-4 text-muted-foreground/60 text-sm font-bold uppercase tracking-widest">
              <AudioLines className="w-6 h-6 text-primary/60" />
              Describe it to generate
            </div>
            <a href="#generator" className="p-3 bg-secondary/50 rounded-full hover:bg-secondary transition-colors border border-border/50 shadow-lg">
              <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
            </a>
          </div>
        </section>

        {/* Generator Section */}
        <section className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
          <PromptSection />
        </section>

        {/* Features / Benefits */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 p-10 rounded-3xl space-y-5 hover:border-primary/50 hover:bg-card/50 transition-all group">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
              <Music className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-headline font-bold">Text-to-Sonic</h4>
            <p className="text-muted-foreground leading-relaxed">Describe a scene and our reasoning-based AI model handles the arrangement, mixing, and mastering automatically.</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 p-10 rounded-3xl space-y-5 hover:border-accent/50 hover:bg-card/50 transition-all group">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-lg shadow-accent/10">
              <Zap className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-headline font-bold">Fast-Track AI</h4>
            <p className="text-muted-foreground leading-relaxed">Get high-fidelity MP3/WAV outputs in under 60 seconds. Optimized for content creators and video editors.</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 p-10 rounded-3xl space-y-5 hover:border-foreground/20 hover:bg-card/50 transition-all group">
            <div className="w-14 h-14 bg-muted/20 rounded-2xl flex items-center justify-center text-foreground group-hover:scale-110 transition-transform shadow-lg shadow-muted/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-headline font-bold">Unlimited License</h4>
            <p className="text-muted-foreground leading-relaxed">Own everything you create. Perfect for YouTube, Twitch, podcasts, and indie games without copyright strikes.</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-primary/20 via-background to-accent/10 rounded-[3rem] p-12 md:p-20 text-center space-y-8 border border-border/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Ready to elevate your sound?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">Join 10,000+ creators using BeatMind AI to soundtrack their imagination.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-headline font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-primary/30">
              Get Started Free
            </button>
            <button className="bg-background/50 hover:bg-background/80 border border-border px-10 py-4 rounded-full font-headline font-bold text-lg transition-all">
              View Showcase
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/20 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-headline font-bold text-2xl tracking-tight">BeatMind AI</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              Empowering creators with generative intelligence to score the world's best content.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-4">
              <h5 className="font-bold uppercase tracking-widest text-[10px] text-primary">Product</h5>
              <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Generator</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Showcase</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold uppercase tracking-widest text-[10px] text-accent">Company</h5>
              <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold uppercase tracking-widest text-[10px] text-foreground">Social</h5>
              <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} BeatMind AI. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
