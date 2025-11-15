'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface NewsArticle {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
  }
}

export default function Explore() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/gnews')
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const data = await response.json()
        setNews(data.articles || [])
      } catch (err) {
        setError('Failed to load news. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Explore {!!tag && `by #${tag}`}
        </h1>
        <div className="text-center py-8">Loading news...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Explore {!!tag && `by #${tag}`}
        </h1>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Explore {!!tag && `by #${tag}`}
      </h1>
      
      <div className="space-y-6">
        {news.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => window.open(article.url, '_blank')}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-48 h-48 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-3">{article.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{article.source.name}</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}