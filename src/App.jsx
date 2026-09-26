import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [input, setInput] = useState("")

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (input.trim() === "") return

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setInput("")
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  return (
    <div className="app">
      <div className="todo-card">

        <div className="header">
          <div>
            <p className="small-title">YOUR DAILY PLANNER</p>
            <h1>My To-Do List</h1>
            <p className="subtitle">
              Organize your day, one task at a time.
            </p>
          </div>

          <div className="task-count">
            <span>{tasks.length}</span>
            <small>Tasks</small>
          </div>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={addTask}>＋ Add Task</button>
        </div>

        <div className="progress-section">
          <div className="progress-info">
            <span>Your Progress</span>
            <span>
              {completedTasks}/{tasks.length}
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width:
                  tasks.length === 0
                    ? "0%"
                    : `${(completedTasks / tasks.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="tasks-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h2>No tasks yet</h2>
              <p>Add your first task and start being productive.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className={`task ${task.completed ? "completed" : ""}`}
                key={task.id}
              >
                <button
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className="task-text">{task.text}</span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="footer">
            <span>
              {completedTasks === tasks.length
                ? "🎉 All tasks completed!"
                : `${tasks.length - completedTasks} tasks remaining`}
            </span>
          </div>
        )}

      </div>
    </div>
  )
}

export default App