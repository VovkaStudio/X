'use client'

import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import TweetForm from "./TweetForm";
import type { IUser } from "@/shared/types/user.interface";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/users')
        
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        
        const data = await response.json()
        setUsers(data.users || [])
      } catch (err) {
        setError('Failed to load users. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6">Home</h1>
          <TweetForm />
          <div className="text-center py-8">Loading users...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6">Home</h1>
          <TweetForm />
          <div className="text-center py-8 text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Home</h1>
        <TweetForm />
        <div className="space-y-3">
          {users.map(user => 
            <Tweet 
              key={user.id}
              user={user} 
            /> 
          )}
        </div>
      </div>
    </div>
  );
}