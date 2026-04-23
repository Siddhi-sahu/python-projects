import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchTasks()
  }, [user, navigate])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/tasks')
      setTasks(res.data)
    } catch (error) {
      setMessage('Failed to fetch tasks')
    }
  }

  const addTask = async () => {
    if (!newTask.trim()) return
    try {
      await axios.post('http://localhost:8000/api/v1/tasks', { title: newTask, completed: false })
      setNewTask('')
      fetchTasks()
      setMessage('Task added successfully')
    } catch (error) {
      setMessage('Failed to add task')
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tasks/${id}`)
      fetchTasks()
      setMessage('Task deleted successfully')
    } catch (error) {
      setMessage('Failed to delete task')
    }
  }

  const updateTask = async (id, title, completed) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/tasks/${id}`, { title, completed })
      fetchTasks()
      setMessage('Task updated successfully')
    } catch (error) {
      setMessage('Failed to update task')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Welcome, {user?.username}!</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Your Tasks</h3>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => updateTask(task.id, task.title, e.target.checked)}
            />
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task.id, e.target.value, task.completed)}
            />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {message && <p style={{ color: 'blue' }}>{message}</p>}
    </div>
  )
}

export default Dashboard
