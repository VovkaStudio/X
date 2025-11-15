import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // DummyJSON API - бесплатный, без ключа
    const response = await fetch(
      'https://dummyjson.com/users?limit=45', // Измените число здесь (максимум зависит от вашего тарифа DummyJSON)
      {
        next: { revalidate: 3600 } // Кешируем на 1 час
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

