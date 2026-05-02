'use client'

import { useState } from 'react'
import Header from './Header'
import TabBar from './TabBar'
import AddTaskInput from './AddTaskInput'
import TaskList from './TaskList'

type Todo = {
  id: string
  text: string
  completed: boolean
}

export default function TodoApp({ initialTodos }: { initialTodos: Todo[] }) {
  // Initial state comes from the server — no extra fetch needed on load
  const [tasks, setTasks] = useState<Todo[]>(initialTodos)

  async function handleAdd(text: string) {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const newTask = await res.json()
    setTasks(prev => [...prev, newTask])
  }

  async function handleToggle(id: string) {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    })
    const updated = await res.json()
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)))
  }

  async function handleDelete(id: string) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  async function handleClearCompleted() {
    const completed = tasks.filter(t => t.completed)
    await Promise.all(
      completed.map(t => fetch(`/api/todos/${t.id}`, { method: 'DELETE' }))
    )
    setTasks(prev => prev.filter(t => !t.completed))
  }

  return (
    <div className="app-wrapper">
      <div className="app-card">
        <Header />
        <TabBar />
        <div className="app-body">
          <AddTaskInput onAdd={handleAdd} />
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onClearCompleted={handleClearCompleted}
          />
        </div>
      </div>
    </div>
  )
}
