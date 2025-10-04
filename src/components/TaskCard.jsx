import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TaskModal from './TaskModal'

export default function TaskCard({ task, index }){
  const [open, setOpen] = useState(false)
  // Colorful priority badge
  const priorityColors = {
    High: 'bg-red-400 text-white',
    Medium: 'bg-yellow-300 text-gray-800',
    Low: 'bg-green-300 text-gray-800'
  }
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-4 rounded-2xl shadow-lg bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 border border-white/60 hover:scale-[1.03] transition-all cursor-pointer ${
              snapshot.isDragging ? 'ring-4 ring-pink-300' : ''
            }`}
            onClick={()=>setOpen(true)}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-1">{task.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{task.description?.slice(0,80)}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full font-semibold shadow ${priorityColors[task.priority] || 'bg-gray-300 text-gray-700'}`}>
                {task.priority}
              </span>
              {task.tags && task.tags.slice(0,3).map((t,i)=>
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/60 text-pink-600 font-semibold shadow">{t}</span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {open && <TaskModal task={task} onClose={()=>setOpen(false)} />}
    </>
  )
}
