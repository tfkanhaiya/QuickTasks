"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, PlusCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Task } from "./task-list"

export function AiAssistant() {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { toast } = useToast()

  const generateSuggestions = async () => {
    setIsLoading(true)
    setSuggestions([])

    try {
      const response = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate suggestions")
      }

      const data = await response.json()

      if (data.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setSuggestions(data.suggestions)
      } else {
        // Fallback if we don't get proper suggestions
        setSuggestions([
          "Review your goals for the week",
          "Schedule time for exercise today",
          "Clear your email inbox",
          "Prepare a healthy meal",
          "Take a 10-minute mindfulness break",
        ])
        toast({
          title: "Using default suggestions",
          description: "We've provided some default task ideas for you.",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("Error generating suggestions:", error)
      toast({
        title: "Error",
        description: "Failed to generate task suggestions. Please try again.",
        variant: "destructive",
      })

      // Provide fallback suggestions on error
      setSuggestions([
        "Review your goals for the week",
        "Schedule time for exercise today",
        "Clear your email inbox",
        "Prepare a healthy meal",
        "Take a 10-minute mindfulness break",
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const addSuggestionToTasks = (suggestion: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: suggestion,
      completed: false,
    }

    // Get existing tasks from localStorage
    const existingTasks = localStorage.getItem("tasks")
    const tasks = existingTasks ? JSON.parse(existingTasks) : []

    // Add new task and save back to localStorage
    const updatedTasks = [...tasks, newTask]
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

    // Show success toast
    toast({
      title: "Task added",
      description: suggestion,
      duration: 2000,
    })

    // Force a re-render of TaskList
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Task Suggestions
        </CardTitle>
        <CardDescription>Need inspiration? Let AI suggest some tasks for you.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <span>{suggestion}</span>
                <Button size="sm" variant="ghost" onClick={() => addSuggestionToTasks(suggestion)}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Click the button below to get AI-powered task suggestions.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={generateSuggestions} disabled={isLoading} variant="outline">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating suggestions...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Task Suggestions
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
