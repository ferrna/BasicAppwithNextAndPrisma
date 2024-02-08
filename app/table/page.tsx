'use client'
import { unstable_noStore } from 'next/cache'
import React, { FC, Suspense } from 'react'
import { useRouter } from 'next/navigation'
interface TableProps {}
interface User {
  id: number
  name: string
  email: string
  isActive?: boolean
  registerDate?: Date
}

const TableWrapper: FC<TableProps> = ({}) => {
  unstable_noStore()
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={'loading ..'}>
        <Table />
      </Suspense>
    </div>
  )
}
async function Table() {
  unstable_noStore()
  const router = useRouter()

  const data: User[] | { error: string } = await fetch('http://localhost:3000/api/users').then((response) =>
    response.json()
  )
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Active</th>
          <th>Register Date</th>
        </tr>
      </thead>
      <tbody>
        {!data.hasOwnProperty('error') &&
          Array.isArray(data) &&
          data.map((e: User) => (
            <tr className="hover cursor-pointer forest:hover:bg-slate-500" key={e.id}>
              <th>{e.id}</th>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.isActive ? 'Yes' : 'No'}</td>
              <td>{e.registerDate?.toString() || ''}</td>
              <td>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => router.push(`/table/${e.id}?edit=true`)}
                >
                  Edit
                </button>
                <button className="btn btn-secondary mx-2" onClick={() => handleDelete(e.id)}>
                  Delete
                </button>
                <button className="btn btn-accent mx-2">Accent</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
const handleDelete = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.status == 200) {
      console.log('User deleted successfully')
    } else {
      // Handle error response
      const data = await response.json()
      console.error('Error deleting user:', data.msg)
    }
  } catch (error) {
    console.error('Error deleting user:', (error as Error).message)
  }
}

export default TableWrapper
