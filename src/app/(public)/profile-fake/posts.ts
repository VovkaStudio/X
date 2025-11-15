type Post = {
    id: string
    content: string
    createdAt: string
    stats: { replies: number; reposts: number; likes: number; views: string }
  }
  
   export const MOCK_POSTS: Post[] = [
    {
      id: '1',
      content:
        "Запускаю pet-проект на Next.js 15 + App Router. SSG/ISR/CSR — всё в одном!",
      createdAt: '2h',
      stats: { replies: 12, reposts: 7, likes: 145, views: '12.3K' },
    },
    {
      id: '2',
      content:
        'Tailwind спасает время: компоненты собираются за минуты, а не часы.',
      createdAt: 'yesterday',
      stats: { replies: 5, reposts: 3, likes: 88, views: '4.1K' },
    },
  ]