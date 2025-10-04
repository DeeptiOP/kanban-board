import React, { useState } from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskModal({ task, onClose }){
  const { updateTask, deleteTask } = useTasks()
  const [form, setForm] = useState({ title: task.title, description: task.description, status: task.status, priority: task.priority })

  const save = ()=>{
    updateTask(task.id, form)
    onClose()
  }

  const remove = ()=>{
    if(confirm('Delete this task?')) {
      deleteTask(task.id)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 p-8 rounded-2xl shadow-2xl z-10 w-full max-w-xl border-2 border-white/60">
        <h3 className="text-2xl font-bold mb-5 text-pink-700 drop-shadow">Task Details</h3>

        <label className="block mb-2 text-sm font-semibold text-blue-700">Title</label>
        <input
          className="w-full p-2 rounded-lg bg-white/80 mb-4 border border-pink-200 text-black focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          value={form.title}
          onChange={e=>setForm({...form, title: e.target.value})}
        />

        <label className="block mb-2 text-sm font-semibold text-blue-700">Description</label>
        <textarea
          className="w-full p-2 rounded-lg bg-white/80 mb-4 border border-pink-200 text-black focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          value={form.description}
          onChange={e=>setForm({...form, description: e.target.value})}
        />

        <div className="flex gap-4 mb-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-blue-700">Status</label>
            <select
              value={form.status}
              onChange={e=>setForm({...form, status: e.target.value})}
              className="p-2 rounded-lg bg-white/80 border border-yellow-200 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-blue-700">Priority</label>
            <select
              value={form.priority}
              onChange={e=>setForm({...form, priority: e.target.value})}
              className="p-2 rounded-lg bg-white/80 border border-green-200 text-black focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={remove}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-semibold shadow transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg font-semibold shadow transition"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
