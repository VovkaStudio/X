import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.GNEWS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // GNews API endpoint для получения топ-новостей
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=ru&max=10`,
      {
        next: { revalidate: 3600 } // Кешируем на 1 час
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

