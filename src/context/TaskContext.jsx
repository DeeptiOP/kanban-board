import React, { createContext, useContext, useEffect, useState } from 'react'
const TaskContext = createContext()

const STORAGE_KEY = 'kanban_tasks_v1'

const initialData = {
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
    'done': { id: 'done', title: 'Done', taskIds: [] }
  },
  tasks: {}
}

export function TaskProvider({ children }){
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) return JSON.parse(raw)
    } catch(e){}
    return initialData
  })

  useEffect(()=>{
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch(e){}
  },[data])

  const addTask = (task)=>{
    const id = 'task-' + Date.now()
    const newTask = { id, title: task.title, description: task.description || '', status: task.status || 'todo', tags: task.tags || [], priority: task.priority || 'Normal' }
    setData(prev=>{
      const tasks = {...prev.tasks, [id]: newTask}
      const column = prev.columns[newTask.status]
      const columns = {...prev.columns, [newTask.status]: {...column, taskIds: [id, ...column.taskIds]}}
      return {...prev, tasks, columns}
    })
  }

  const updateTask = (id, changes)=>{
    setData(prev=>{
      const task = {...prev.tasks[id], ...changes}
      // if status changed, move id between columns
      let columns = {...prev.columns}
      if(changes.status && changes.status !== prev.tasks[id].status){
        const from = columns[prev.tasks[id].status]
        const to = columns[changes.status]
        from.taskIds = from.taskIds.filter(tid=>tid !== id)
        to.taskIds = [id, ...to.taskIds]
        columns = {...columns, [from.id]: from, [to.id]: to}
      }
      const tasks = {...prev.tasks, [id]: task}
      return {...prev, tasks, columns}
    })
  }

  const deleteTask = (id)=>{
    setData(prev=>{
      const tasks = {...prev.tasks}
      const status = tasks[id].status
      delete tasks[id]
      const column = {...prev.columns[status], taskIds: prev.columns[status].taskIds.filter(tid=>tid!==id)}
      const columns = {...prev.columns, [status]: column}
      return {...prev, tasks, columns}
    })
  }

  const reorder = (sourceColId, destColId, sourceIndex, destIndex, taskId) => {
    setData(prev=>{
      const columns = {...prev.columns}
      const source = {...columns[sourceColId], taskIds: Array.from(columns[sourceColId].taskIds)}
      source.taskIds.splice(sourceIndex,1)
      const dest = sourceColId === destColId ? source : {...columns[destColId], taskIds: Array.from(columns[destColId].taskIds)}
      dest.taskIds.splice(destIndex,0,taskId)
      // update tasks' status if moved across columns
      const tasks = {...prev.tasks}
      if(sourceColId !== destColId){
        tasks[taskId] = {...tasks[taskId], status: destColId}
      }
      return {...prev, columns: {...columns, [sourceColId]: source, [destColId]: dest}, tasks}
    })
  }

  return (
    <TaskContext.Provider value={{ data, addTask, updateTask, deleteTask, reorder, setData }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks(){
  return useContext(TaskContext)
}
