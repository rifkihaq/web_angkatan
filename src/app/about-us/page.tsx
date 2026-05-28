import { defineMetadata, getMetadataBase } from '@/lib/metadata'

import AboutUs from '@/components/organisms/about-us/AboutUs'
import ColorPallete from '@/components/organisms/about-us/ColorPallete'
import Hero from '@/components/organisms/about-us/Hero'
import LogoPhilosophy from '@/components/organisms/about-us/LogoPhilosophy'
import Mission from '@/components/organisms/about-us/Mission'
import Vision from '@/components/organisms/about-us/Vision'

export const metadata = defineMetadata({
  title: 'Tentang Kami - Evastra',
  description:
    'Pelajari lebih lanjut tentang Evastra, teknologi informasi ITS 2025. Temukan visi, misi, dan filosofi kami.',
  openGraph: {
    type: 'website',
    title: 'Tentang Kami - Evastra',
    description:
      'Pelajari lebih lanjut tentang Evastra, teknologi informasi ITS 2025. Temukan visi, misi, dan filosofi kami.',
    url: new URL('/about-us', getMetadataBase()).toString(),
    images: {
      url: new URL('/assets/images/metadata/og.webp', getMetadataBase()).toString(),
      width: 1200,
      height: 630,
      type: 'image/webp',
      alt: 'Tentang Kami - Evastra'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami - Evastra',
    description:
      'Pelajari lebih lanjut tentang Evastra, teknologi informasi ITS 2025. Temukan visi, misi, dan filosofi kami.',
    images: {
      url: new URL('/assets/images/metadata/og.webp ', getMetadataBase()).toString(),
      width: 1200,
      height: 630,
      type: 'image/webp',
      alt: 'Tentang Kami - Evastra'
    }
  }
})

const page = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <LogoPhilosophy />
      <ColorPallete />
      <Vision />
      <Mission />
    </>
  )
}

export default page
