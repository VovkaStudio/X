'use client'
import Back from "@/components/Back"
import { MOCK_POSTS } from "./posts"



export default function Profile() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/50 px-4 py-3 border-b border-white/10 flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold leading-tight">VovkaStudio</h1>
          <p className="text-sm text-gray-400">2 posts</p>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-40" />

      {/* Avatar + actions */}
      <div className="px-4 -mt-12 flex items-end justify-between">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-700" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full border border-white/20 text-sm hover:bg-white/10 transition">
            Edit profile
          </button>
          <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition">
            Follow
          </button>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4 mt-4 space-y-2">
        <div>
          <h2 className="text-xl font-bold">VovkaStudio</h2>
          <p className="text-gray-400">@volodyamba1704</p>
        </div>
        <p className="text-gray-200">
          Frontend • Next.js • Tailwind • Люблю чистый код и понятный UI.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400 text-sm">
          <span>📍 Remote</span>
          <span>🔗 example.com</span>
          <span>📅 Joined May 2024</span>
        </div>
        <div className="flex gap-4 text-sm">
          <span>
            <b>512</b> <span className="text-gray-400">Following</span>
          </span>
          <span>
            <b>8,921</b> <span className="text-gray-400">Followers</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 border-b border-white/10 flex">
        {['Posts', 'Replies', 'Media', 'Likes'].map((tab) => (
          <button
            key={tab}
            className="flex-1 px-4 py-3 text-sm hover:bg-white/5 transition relative"
          >
            <span className="text-gray-300">{tab}</span>
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="divide-y divide-white/10">
        {MOCK_POSTS.map((post) => (
          <article key={post.id} className="flex gap-3 px-4 py-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <header className="flex items-center gap-2 text-sm">
                <span className="font-semibold">VovkaStudio</span>
                <span className="text-gray-400">@volodyamba1704 · {post.createdAt}</span>
              </header>
              <p className="whitespace-pre-line mt-1">{post.content}</p>
              <footer className="mt-3 flex justify-between text-gray-400 text-sm">
                <button className="hover:text-blue-400 transition">💬 {post.stats.replies}</button>
                <button className="hover:text-green-400 transition">🔁 {post.stats.reposts}</button>
                <button className="hover:text-pink-400 transition">❤️ {post.stats.likes}</button>
                <span>👁️ {post.stats.views}</span>
              </footer>
            </div>
          </article>
        ))}
      </div>
      <Back />
    </div>
  )
}