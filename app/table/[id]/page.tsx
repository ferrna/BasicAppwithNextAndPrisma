'use client'
import React, { FC, Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { unstable_noStore } from 'next/cache'

interface UserProps {
  params: { id: string }
}

interface User {
  id: number
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
}

const UserWrapper: FC<UserProps> = ({ params }) => {
  unstable_noStore()
  const { id } = params

  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<div className="skeleton w-48 h-32"></div>}>
        <User id={id} />
      </Suspense>
      {edit && (
        <Suspense fallback={<div className="skeleton w-48 h-32"></div>}>
          <EditUser id={id} />
        </Suspense>
      )}
    </div>
  )
}

async function User(id: { id: string }) {
  const data: User = await fetch(`http://localhost:3000/api/users/${id.id}`).then((response) => response.json())
  console.log(data)
  return (
    <div className="w-48 h-32">
      {data && (
        <div className="hover cursor-pointer forest:hover:bg-slate-500" key={data.id}>
          <span>ID: {data.id}</span>
          <br />
          <span>{data.name}</span>
          <br />
          <span>{data.email}</span>
          <br />
          <span>Email Verified: {data.emailVerified?.toString() || ''}</span>
          <br />
        </div>
      )}
    </div>
  )
}
const EditUser = (id: { id: string }) => {
  const [dataState, setDataState] = useState<User>({
    id: 0,
    name: '',
    email: '',
    emailVerified: new Date(),
  })
  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id.id}`)
      .then((response) => response.json())
      .then((data) => setDataState(data))
      .then((data) => console.log(data))
  }, [])
  return (
    <div className="w-48 h-32">
      {dataState?.name && (
        <div className="hover cursor-pointer forest:hover:bg-slate-500" key={dataState.id}>
          <input name="id" value={dataState.id} disabled />
          <input
            name="name"
            value={dataState.name}
            onChange={(e) => setDataState({ ...dataState, [e.target.name]: e.target.value })}
          />
          <input
            name="email"
            value={dataState.email}
            onChange={(e) => setDataState({ ...dataState, [e.target.name]: e.target.value })}
          />
          <span>{'Email Verified: '}</span>
          {/* <input
            name="emailVerified"
            type="checkbox"
            checked={dataState.emailVerified}
            onClick={(e) => {
              setDataState({ ...dataState, emailVerified: !dataState.emailVerified })
            }}
          /> */}
          <br />
          <input
            name="emailVerified"
            type="date"
            value={new Date(dataState.emailVerified?.toString().slice(0, 10) || new Date())
              .toISOString()
              .substring(0, 10)}
            onChange={(e) => setDataState({ ...dataState, [e.target.name]: e.target.value })}
          />
          <span>
            <button className="btn btn-primary" onClick={() => handleSubmit(dataState)}>
              Edit
            </button>
          </span>
        </div>
      )}
    </div>
  )
}

const handleSubmit = async (dataState: User) => {
  try {
    const response = await fetch(`/api/users/${dataState.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...dataState }),
    })

    if (response.status == 200) {
      console.log('User edited successfully')
    } else {
      // Handle error response
      const data = await response.json()
      console.error('Error editing user:', data.msg)
    }
  } catch (error) {
    console.error('Error editing user:', (error as Error).message)
  }
}

export default UserWrapper
