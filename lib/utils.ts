import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function constructMetadata({
    title = "WhispersToMishika",
    description = "This website is a simple expression of my love for my dearest Mishika, that perfectly highlights the special moments and deep connection we used to share.",
    image = "/thumbnail.png",
    icons = "/favicon.ico",
    noIndex = false
}: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image
                }
            ]
        },
        icons,
        metadataBase: new URL('https://whisperstodiya.vercel.app/', 'https://whisperstomishika.vercel.app/'),
        themeColor: '#FFF',
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    }
}