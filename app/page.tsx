import { TaskList } from "@/components/task-list"
import { TaskInput } from "@/components/task-input"
import { AiAssistant } from "@/components/ai-assistant"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">QuickTasks</h1>
          <ThemeToggle />
        </header>

        <div className="space-y-8">
          <TaskInput />
          <AiAssistant />
          <TaskList />
        </div>
      </div>
    </div>
  )
}
