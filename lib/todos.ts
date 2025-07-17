// lib/todos.ts
import { db } from './firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from 'firebase/firestore'

const todosCollection = collection(db, 'todos')

// CREATE
export const addTodo = async (text: string) => {
  return await addDoc(todosCollection, { text, completed: false })
}

// READ (Real-time)
export const listenTodos = (callback: (todos: any[]) => void) => {
  const q = query(todosCollection)
  return onSnapshot(q, (snapshot) => {
    const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(todos)
  })
}

// TOGGLE complete
export const toggleTodo = async (todo: any) => {
  const todoRef = doc(db, 'todos', todo.id)
  await updateDoc(todoRef, { completed: !todo.completed })
}

// UPDATE text
export const updateTodoText = async (id: string, text: string) => {
  const todoRef = doc(db, 'todos', id)
  await updateDoc(todoRef, { text })
}

// DELETE
export const deleteTodo = async (id: string) => {
  const todoRef = doc(db, 'todos', id)
  await deleteDoc(todoRef)
}
