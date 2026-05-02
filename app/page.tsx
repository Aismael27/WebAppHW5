import prisma from '@/lib/prisma'
import TodoApp from './components/TodoApp'

// This is a SERVER component — fetches todos from the DB before rendering
export default async function Page() {
  const initialTodos = await prisma.todo.findMany({
    orderBy: { createdAt: 'asc' },
  })

  return <TodoApp initialTodos={initialTodos} />
}
