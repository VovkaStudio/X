'use client'

import { PAGES } from "@/config/pages.config"
import { useRouter } from "next/navigation"

export default function Back() {
    const router = useRouter()

  return (
    <button onClick={() => router.push(PAGES.HOME)}>Go to home</button>
  )
}