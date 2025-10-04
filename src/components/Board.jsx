import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from './Column'
import { useTasks } from '../context/TaskContext'

export default function Board(){
  const { data, reorder } = useTasks()

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if(!destination) return
    reorder(source.droppableId, destination.droppableId, source.index, destination.index, draggableId)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen py-8 px-2 md:px-8 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 transition-all duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(data.columns).map((col, idx) => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-2xl shadow-xl p-4 transition-all duration-300 ${
                    [
                      "bg-gradient-to-b from-blue-200 to-blue-100",
                      "bg-gradient-to-b from-pink-200 to-pink-100",
                      "bg-gradient-to-b from-yellow-200 to-yellow-100"
                    ][idx % 3]
                  } ${snapshot.isDraggingOver ? "ring-4 ring-pink-400" : ""}`}
                >
                  <Column column={col} tasks={col.taskIds.map(id => data.tasks[id])}/>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}
