import React from 'react'
import TaskCard from './TaskCard'

export default function Column({ column, tasks }){
  return (
    <div className="bg-white/80 backdrop-blur-md p-0 rounded-2xl shadow-2xl min-h-[340px] border-2 border-white/40 transition-all duration-300 hover:scale-[1.02]">
      <div className="rounded-t-2xl px-4 py-3 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300 flex items-center justify-between shadow">
        <h2 className="text-lg font-bold text-white drop-shadow">{column.title}</h2>
        <span className="text-xs bg-white/30 text-white px-2 py-1 rounded-full font-semibold">{tasks.length}</span>
      </div>
      <div className="p-4 space-y-4">
        {tasks && tasks.length ? tasks.map((task, index)=>(
          <TaskCard key={task.id} task={task} index={index} />
        )) : <p className="text-sm text-gray-500 italic">No tasks</p>}
      </div>
    </div>
  )
}
