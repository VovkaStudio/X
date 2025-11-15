'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Back from "@/components/Back"
import type { IUser } from "@/shared/types/user.interface"

export default function Profile() {
  const params = useParams<{username: string}>()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (!params.username) {
        setError('No username provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching user:', params.username)
        
        // Добавляем timeout для запроса
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 секунд timeout
        
        const response = await fetch(`/api/users/${params.username}`, {
          signal: controller.signal
        }).finally(() => clearTimeout(timeoutId))
        
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          if (response.status === 404) {
            throw new Error(errorData.error || 'User not found')
          }
          throw new Error(errorData.error || 'Failed to fetch user')
        }
        
        const data = await response.json()
        console.log('User data received:', data)
        
        if (!data || !data.id) {
          throw new Error('Invalid user data received')
        }
        
        setUser(data)
      } catch (err) {
        let errorMessage = 'Failed to load user'
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = 'Request timeout. Please try again.'
          } else {
            errorMessage = err.message
          }
        }
        setError(errorMessage)
        console.error('Error in fetchUser:', err)
        console.error('Error details:', {
          name: err instanceof Error ? err.name : 'Unknown',
          message: err instanceof Error ? err.message : String(err)
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.username])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <Back />
          <div className="text-center py-8">Loading profile...</div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <Back />
          <div className="text-center py-8 text-red-500">
            {error || 'User not found'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <Back />
        
        <div className="border border-white/10 rounded-xl p-6 bg-black text-white">
          {/* Header с аватаром */}
          <div className="flex items-start gap-6 mb-6">
            <Image
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              width={120}
              height={120}
              className="rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-white/60 text-lg mb-1">@{params.username}</p>
              <p className="text-white/80">{user.email}</p>
            </div>
          </div>

          {/* Информация */}
          <div className="space-y-4">
            <div className="border-t border-white/10 pt-4">
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <div className="space-y-2 text-white/80">
                <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="space-y-2 text-white/80">
                <p>{user.address.address}</p>
                <p>{user.address.city}, {user.address.state}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <h2 className="text-xl font-semibold mb-3">Company</h2>
              <p className="text-white/80">{user.company.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
