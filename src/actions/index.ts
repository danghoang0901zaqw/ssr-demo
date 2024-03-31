'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateUserAction = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    revalidateTag("students")
    return await res.json()
}

export const handleUpdateUserAction = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    revalidateTag("students")
    return await res.json()
}

export const handleDeleteUserAction = async (data: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${data.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    revalidateTag("students")
    return await res.json()
}