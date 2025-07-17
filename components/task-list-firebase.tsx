// "use client"

// import { useState, useEffect } from "react"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"
// import { Trash2, Pencil, Check } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { Input } from "@/components/ui/input" // assuming you're using a custom Input component

// export type Task = {
//   id: string
//   text: string
//   completed: boolean
// }

// export function TaskList() {
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
//   const [editedText, setEditedText] = useState("")
//   const { toast } = useToast()

//   // Load tasks from localStorage on component mount
//   useEffect(() => {
//     const savedTasks = localStorage.getItem("tasks")
//     if (savedTasks) {
//       try {
//         setTasks(JSON.parse(savedTasks))
//       } catch (e) {
//         console.error("Failed to parse tasks from localStorage")
//       }
//     }
//   }, [])

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks))
//   }, [tasks])

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const savedTasks = localStorage.getItem("tasks")
//       if (savedTasks) {
//         try {
//           setTasks(JSON.parse(savedTasks))
//         } catch (e) {
//           console.error("Failed to parse tasks from localStorage")
//         }
//       }
//     }

//     window.addEventListener("storage", handleStorageChange)
//     return () => window.removeEventListener("storage", handleStorageChange)
//   }, [])

//   const toggleTaskCompletion = (taskId: string) => {
//     setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))

//     const task = tasks.find((t) => t.id === taskId)
//     if (task) {
//       toast({
//         title: task.completed ? "Task marked as incomplete" : "Task completed",
//         description: task.text,
//         duration: 2000,
//       })
//     }
//   }

//   const deleteTask = (taskId: string) => {
//     const taskToDelete = tasks.find((t) => t.id === taskId)
//     setTasks(tasks.filter((task) => task.id !== taskId))

//     if (taskToDelete) {
//       toast({
//         title: "Task deleted",
//         description: taskToDelete.text,
//         duration: 2000,
//       })
//     }
//   }

//   const startEditing = (taskId: string, currentText: string) => {
//     setEditingTaskId(taskId)
//     setEditedText(currentText)
//   }

//   const saveEditedTask = () => {
//     if (editingTaskId) {
//       setTasks(tasks.map(task => task.id === editingTaskId ? { ...task, text: editedText } : task))
//       toast({
//         title: "Task updated",
//         description: editedText,
//         duration: 2000,
//       })
//       setEditingTaskId(null)
//       setEditedText("")
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold">Your Tasks</h2>

//       {tasks.length === 0 ? (
//         <div className="text-center py-8 text-muted-foreground">
//           No tasks yet. Add a task or ask the AI assistant for suggestions!
//         </div>
//       ) : (
//         <ul className="space-y-2">
//           {tasks.map((task) => (
//             <li key={task.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
//               <div className="flex items-center gap-3 w-full">
//                 <Checkbox
//                   checked={task.completed}
//                   onCheckedChange={() => toggleTaskCompletion(task.id)}
//                   id={`task-${task.id}`}
//                 />
//                 {editingTaskId === task.id ? (
//                   <Input
//                     value={editedText}
//                     onChange={(e) => setEditedText(e.target.value)}
//                     className="flex-1"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") saveEditedTask()
//                     }}
//                   />
//                 ) : (
//                   <label
//                     htmlFor={`task-${task.id}`}
//                     className={`text-lg flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
//                   >
//                     {task.text}
//                   </label>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 {editingTaskId === task.id ? (
//                   <Button variant="ghost" size="icon" onClick={saveEditedTask}>
//                     <Check className="h-4 w-4" />
//                     <span className="sr-only">Save task</span>
//                   </Button>
//                 ) : (
//                   <Button variant="ghost" size="icon" onClick={() => startEditing(task.id, task.text)}>
//                     <Pencil className="h-4 w-4" />
//                     <span className="sr-only">Edit task</span>
//                   </Button>
//                 )}

//                 <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
//                   <Trash2 className="h-4 w-4" />
//                   <span className="sr-only">Delete task</span>
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }
// export default TaskList


"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { addTodo, deleteTodo, listenTodos, toggleTodo, updateTodoText } from "@/lib/todos"

export type Task = {
  id: string
  text: string
  completed: boolean
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editedText, setEditedText] = useState("")
  const { toast } = useToast()

  // 🔁 Real-time listener to Firestore
  useEffect(() => {
    const unsubscribe = listenTodos((todos: Task[]) => setTasks(todos))
    return () => unsubscribe()
  }, [])

  const toggleTaskCompletion = async (task: Task) => {
    await toggleTodo(task)

    toast({
      title: task.completed ? "Task marked as incomplete" : "Task completed",
      description: task.text,
      duration: 2000,
    })
  }

  const deleteTaskById = async (task: Task) => {
    await deleteTodo(task.id)

    toast({
      title: "Task deleted",
      description: task.text,
      duration: 2000,
    })
  }

  const startEditing = (taskId: string, currentText: string) => {
    setEditingTaskId(taskId)
    setEditedText(currentText)
  }

  const saveEditedTask = async () => {
    if (editingTaskId && editedText.trim() !== "") {
      await updateTodoText(editingTaskId, editedText.trim())

      toast({
        title: "Task updated",
        description: editedText,
        duration: 2000,
      })

      setEditingTaskId(null)
      setEditedText("")
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
              <div className="flex items-center gap-3 w-full">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task)}
                  id={`task-${task.id}`}
                />
                {editingTaskId === task.id ? (
                  <Input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditedTask()
                    }}
                  />
                ) : (
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-lg flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.text}
                  </label>
                )}
              </div>

              <div className="flex gap-2">
                {editingTaskId === task.id ? (
                  <Button variant="ghost" size="icon" onClick={saveEditedTask}>
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Save task</span>
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => startEditing(task.id, task.text)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit task</span>
                  </Button>
                )}

                <Button variant="ghost" size="icon" onClick={() => deleteTaskById(task)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
