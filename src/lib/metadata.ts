import { Metadata } from 'next'

const DEFAULT_BASE_URL = 'https://evastra25.vercel.app'

export const getMetadataBase = () => {
  try {
    return new URL(process.env.BASE_URL || DEFAULT_BASE_URL)
  } catch {
    return new URL(DEFAULT_BASE_URL)
  }
}

const metadataBase = getMetadataBase()
const toAbsoluteUrl = (pathname: string) => new URL(pathname, metadataBase).toString()

export const defaultMetadata: Metadata = {
  metadataBase,
  title: 'Evastra - Teknologi Informasi ITS 2025',
  description:
    'EVASTRA merupakan nama angkatan Teknologi Informasi ITS 2025 yang merepresentasikan semangat untuk berkembang bersama, menguatkan karakter, dan meningkatkan kompetensi.',
  keywords:
    'Teknologi Informasi, ITS, 2025, EVASTRA, Angkatan, Pendidikan, it, it its, teknologi informasi its, teknologi informasi its 2025, teknologi informasi its 2025 evastra',
  authors: {
    url: metadataBase.toString(),
    name: 'Evastra - Teknologi Informasi ITS 2025'
  },
  openGraph: {
    type: 'website',
    title: 'Evastra - Teknologi Informasi ITS 2025',
    description:
      'EVASTRA merupakan nama angkatan Teknologi Informasi ITS 2025 yang merepresentasikan semangat untuk berkembang bersama, menguatkan karakter, dan meningkatkan kompetensi.',
    url: metadataBase.toString(),
    images: {
      url: toAbsoluteUrl('/assets/images/metadata/og.webp'),
      width: 1200,
      height: 630,
      type: 'image/webp',
      alt: 'Evastra - Teknologi Informasi ITS 2025'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evastra - Teknologi Informasi ITS 2025',
    description:
      'EVASTRA merupakan nama angkatan Teknologi Informasi ITS 2025 yang merepresentasikan semangat untuk berkembang bersama, menguatkan karakter, dan meningkatkan kompetensi.',
    images: {
      url: toAbsoluteUrl('/assets/images/metadata/og.webp'),
      width: 1200,
      height: 630,
      type: 'image/webp',
      alt: 'Evastra - Teknologi Informasi ITS 2025'
    }
  },
  icons: {
    icon: toAbsoluteUrl('/assets/images/favicon/android-chrome-192x192.png'),
    shortcut: toAbsoluteUrl('/assets/images/favicon/android-chrome-512x512.png'),
    apple: toAbsoluteUrl('/assets/images/favicon/apple-touch-icon.png')
  },
  robots: {
    index: true,
    follow: true
  }
}

export const defineMetadata = (metadata?: Metadata): Metadata => {
  return {
    ...defaultMetadata,
    ...metadata
  }
}
