import { Metadata } from "../interfaces"

export async function getPageMetadata(pageName:string){
    const getMetadata: Response = await fetch(
        `https://cms.msvs.ch/api/content/item/pageMeta?filter=%7Bpage%3A%22${pageName}%22%7D&populate=1`,
        {
            headers: {
                'api-key': `${process.env.CMS}`,
            },
        }
    )
    const metadata:Metadata = await getMetadata.json()

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            images: [
                {
                    url: metadata.image ? `${process.env.NEXT_PUBLIC_STORAGE}${metadata.image.path}` : "/placeholder.png",
                }
            ],
            locale: 'de_CH',
            type: 'website',
        },
        icons: {
            icon: '/logo.gif',
            shortcut: '/logo.gif',
            apple: '/logo.gif',
            other: {
                rel: 'apple-touch-icon-precomposed',
                url: '/logo.gif',
            },
        },
    }
}