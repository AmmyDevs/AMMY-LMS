import { Card } from '@/app/ui/components/Card'
import { PenTool } from 'lucide-react'

export default async function SolvePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Solve Mode</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-2">
          Apply what you've learned through interactive challenges and quizzes for {moduleSlug.replace(/-/g, ' ')}.
        </p>
      </header>

      {/* Placeholders for Interactive Challenges */}
      <div className="max-w-3xl mx-auto mt-8">
        <Card 
          icon={<PenTool className="text-primary" />}
          title="Challenge Placeholder"
          className="min-h-[300px]"
          footerLabel="Submit Answer"
        >
          <div className="flex flex-col items-center justify-center h-48 text-[hsl(var(--muted-foreground))] text-sm border-2 border-dashed border-[hsl(var(--border))] rounded-lg mt-4 bg-[hsl(var(--muted))]">
            <p>Quiz / Fill-in-the-blank / Multiple Choice will go here</p>
            <p className="text-xs mt-2 opacity-70">Waiting for content upload...</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
