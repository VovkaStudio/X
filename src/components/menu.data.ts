import { PAGES } from "@/config/pages.config"

export interface IMenuItem {
    href: string
    name: string
}

export const MENU = [
    {
        href: PAGES.HOME,
        name: 'Home'
    },
    {
        href: PAGES.EXPLORE,
        name: 'Explore'
    },
    {
        href: PAGES.PROFILE_FAKE,
        name: 'Profile'
    },
    {
        href: PAGES.SHOP,
        name: 'Shop'
    }
]