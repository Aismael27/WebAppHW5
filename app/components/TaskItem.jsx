import './TaskItem.css'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <button
        className={`task-item__checkbox ${task.completed ? 'task-item__checkbox--checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && (
          <svg viewBox="0 0 24 24" fill="none">
            <polyline
              points="20 6 9 17 4 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span className="task-item__text">{task.text}</span>
      <button
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        Delete
      </button>
    </div>
  )
}