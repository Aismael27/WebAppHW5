import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { completed } = await request.json()

  const todo = await prisma.todo.update({
    where: { id },
    data: { completed },
  })

  return NextResponse.json(todo)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    console.log("DELETE HIT:", id)

    const result = await prisma.todo.delete({
      where: { id },
    })

    console.log("DELETE SUCCESS:", result)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("DELETE ERROR:", err)

    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    )
  }
}