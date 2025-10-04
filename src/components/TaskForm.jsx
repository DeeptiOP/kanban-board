import React, { useState } from 'react'
import { useTasks } from '../context/TaskContext'

export default function TaskForm({ onClose }){
  const { addTask } = useTasks()
  const [form, setForm] = useState({ title:'', description:'', status:'todo', priority:'Normal', tags:[] })

  const submit = (e)=>{
    e.preventDefault()
    if(!form.title.trim()) return alert('Title required')
    addTask(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <form onSubmit={submit} className="bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 p-8 rounded-2xl shadow-2xl z-10 w-full max-w-md border-2 border-white/60">
        <h3 className="text-2xl font-bold mb-5 text-gray-800 drop-shadow">New Task</h3>

        <label className="block mb-2 text-sm font-semibold text-gray-800">Title</label>
        <input
          className="w-full p-2 rounded-lg bg-white mb-4 border border-pink-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          value={form.title}
          onChange={e=>setForm({...form, title: e.target.value})}
          placeholder="Enter task title"
        />

        <label className="block mb-2 text-sm font-semibold text-gray-800">Description</label>
        <textarea
          className="w-full p-2 rounded-lg bg-white mb-4 border border-pink-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          value={form.description}
          onChange={e=>setForm({...form, description: e.target.value})}
          placeholder="Enter task description"
        />

        <div className="flex gap-4 mb-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Status</label>
            <select
              value={form.status}
              onChange={e=>setForm({...form, status: e.target.value})}
              className="p-2 rounded-lg bg-white border border-yellow-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Priority</label>
            <select
              value={form.priority}
              onChange={e=>setForm({...form, priority: e.target.value})}
              className="p-2 rounded-lg bg-white border border-green-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg font-semibold shadow transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
