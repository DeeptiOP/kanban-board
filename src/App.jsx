import React, { useState } from 'react'
import Board from './components/Board'
import TaskForm from './components/TaskForm'
import { FiPlus } from 'react-icons/fi'

export default function App(){
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <div className="flex items-center gap-3">
          <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-sky-600 rounded hover:bg-sky-500">
            <FiPlus/> New Task
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <Board />
      </main>

      {showForm && <TaskForm onClose={()=>setShowForm(false)} />}
    </div>
  )
}
