import type { Metadata } from "next"
import ProfileFake from "./ProfileFake"

export const metadata: Metadata = {
  title: 'Profile'
}

export default function page() {

  return (
    <ProfileFake />
  )
}
