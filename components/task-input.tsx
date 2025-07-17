// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import type { Task } from "./task-list-firebase"

// export function TaskInput() {
//   const [taskText, setTaskText] = useState("")
//   const { toast } = useToast()

//   const addTask = () => {
//     if (!taskText.trim()) return

//     const newTask: Task = {
//       id: Date.now().toString(),
//       text: taskText.trim(),
//       completed: false,
//     }

//     // Get existing tasks from localStorage
//     const existingTasks = localStorage.getItem("tasks")
//     const tasks = existingTasks ? JSON.parse(existingTasks) : []

//     // Add new task and save back to localStorage
//     const updatedTasks = [...tasks, newTask]
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks))

//     // Show success toast
//     toast({
//       title: "Task added",
//       description: newTask.text,
//       duration: 2000,
//     })

//     // Clear input
//     setTaskText("")

//     // Force a re-render of TaskList by triggering a custom event
//     window.dispatchEvent(new Event("storage"))
//   }

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       addTask()
//     }
//   }

//   return (
//     <div className="flex gap-2">
//       <Input
//         placeholder="Add a new task..."
//         value={taskText}
//         onChange={(e) => setTaskText(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className="flex-1"
//       />
//       <Button onClick={addTask} disabled={!taskText.trim()}>
//         <PlusCircle className="h-4 w-4 mr-2" />
//         Add Task
//       </Button>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { addTodo } from "@/lib/todos" // ✅ Firebase create function

export function TaskInput() {
  const [taskText, setTaskText] = useState("")
  const { toast } = useToast()

  const addTask = async () => {
    if (!taskText.trim()) return

    try {
      await addTodo(taskText.trim())

      toast({
        title: "Task added",
        description: taskText.trim(),
        duration: 2000,
      })

      setTaskText("")
    } catch (error) {
      console.error("Error adding task:", error)
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        duration: 2000,
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTask()
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Add a new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button onClick={addTask} disabled={!taskText.trim()}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </div>
  )
}
