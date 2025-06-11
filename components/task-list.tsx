"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type Task = {
  id: string
  text: string
  completed: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { toast } = useToast()

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (e) {
        console.error("Failed to parse tasks from localStorage")
      }
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const handleStorageChange = () => {
      const savedTasks = localStorage.getItem("tasks")
      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks))
        } catch (e) {
          console.error("Failed to parse tasks from localStorage")
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))

    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed",
        description: task.text,
        duration: 2000,
      })
    }
  }

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((t) => t.id === taskId)
    setTasks(tasks.filter((task) => task.id !== taskId))

    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: taskToDelete.text,
        duration: 2000,
      })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Tasks</h2>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No tasks yet. Add a task or ask the AI assistant for suggestions!
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  id={`task-${task.id}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.text}
                </label>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
