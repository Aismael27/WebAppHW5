import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "asc" }
  })
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { text } = await request.json()
  if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 })
  const todo = await prisma.todo.create({
    data: { text }
  })
  return NextResponse.json(todo)
}