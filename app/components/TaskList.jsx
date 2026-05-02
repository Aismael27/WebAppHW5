import TaskItem from './TaskItem.jsx'
import './TaskList.css'

export default function TaskList({ tasks, onToggle, onDelete, onClearCompleted }) {
  const hasCompleted = tasks.some(t => t.completed)

  return (
    <div className="task-list">
      <div className="task-list__items">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <p className="task-list__empty">No tasks yet. Add one above!</p>
        )}
      </div>

      <div className="task-list__footer">
        {hasCompleted && (
          <button className="task-list__clear" onClick={onClearCompleted}>
            Clear Completed
          </button>
        )}
      </div>
    </div>
  )
}