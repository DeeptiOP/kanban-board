import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { TaskProvider } from './context/TaskContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
)
