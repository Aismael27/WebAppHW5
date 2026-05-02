'use client'

import { useState } from 'react'
import './AddTaskInput.css'

export default function AddTaskInput({ onAdd }) {
  const [value, setValue] = useState('')

  const handleAdd = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="add-task">
      <input
        className="add-task__input"
        type="text"
        placeholder="What do you need to do?"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="add-task__btn" onClick={handleAdd}>
        ADD
      </button>
    </div>
  )
}
