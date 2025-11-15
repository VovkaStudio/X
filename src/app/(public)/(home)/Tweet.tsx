import { PAGES } from "@/config/pages.config"
import type { IUser } from "@/shared/types/user.interface"
import Image from "next/image"
import Link from "next/link"


interface Props {
    user: IUser
}

export default function Tweet({user}: Props) {
    const username = user.email.split('@')[0]
    
    return (
    <div className="border border-white/10 rounded-xl p-4 bg-black
    text-white shadow-mg">
        <div className="flex items-center gap-3 mb-2">
            <Image 
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            width={40}
            height={40}
            className="rounded-full"
            />
            <div className="flex-1">
                <Link href={PAGES.PROFILE(username)} className="font-semibold hover:underline">
                    {user.firstName} {user.lastName}
                </Link>
                <p className="text-white/60 text-sm">@{username}</p>
            </div>
        </div>
        <div className="mt-2 space-y-1">
            <p className="text-white/90">{user.company.name}</p>
            <p className="text-white/60 text-sm">{user.address.city}, {user.address.state}</p>
            <p className="text-white/60 text-sm">{user.phone}</p>
        </div>
    </div>
    )
}