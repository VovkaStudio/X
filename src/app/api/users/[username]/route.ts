import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params

    console.log('Fetching user with username:', username)

    // Получаем всех пользователей и ищем по username
    // Username формируется из email (часть до @)
    console.log('Starting fetch to DummyJSON...')
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 секунд timeout
    
    const response = await fetch(
      'https://dummyjson.com/users?limit=45', // Уменьшили лимит для быстрой загрузки
      {
        next: { revalidate: 3600 },
        signal: controller.signal
      }
    ).finally(() => clearTimeout(timeoutId))
    
    console.log('DummyJSON response received, status:', response.status)

    if (!response.ok) {
      console.error('Failed to fetch users from DummyJSON:', response.status)
      throw new Error('Failed to fetch users')
    }

    const data = await response.json()
    
    if (!data.users || !Array.isArray(data.users)) {
      console.error('Invalid data structure:', data)
      return NextResponse.json(
        { error: 'Invalid response from API' },
        { status: 500 }
      )
    }
    
    console.log('Total users fetched:', data.users.length)
    
    // Ищем пользователя по username (часть email до @)
    // Также поддерживаем поиск по username из API, если он есть
    const user = data.users.find((u: any) => {
      if (!u.email) return false
      const emailUsername = u.email.split('@')[0]
      // Проверяем и по email username, и по полю username из API
      return emailUsername === username || u.username === username
    })

    console.log('User found:', user ? 'Yes' : 'No')

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
