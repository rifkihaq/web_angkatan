import { defineMetadata, getMetadataBase } from '@/lib/metadata'

import AboutDti from '@/components/organisms/dti-profile/AboutDti'
import Cta from '@/components/organisms/dti-profile/Cta'
import Hero from '@/components/organisms/dti-profile/Hero'
import Mission from '@/components/organisms/dti-profile/Mission'
import Vision from '@/components/organisms/dti-profile/Vision'

export const metadata = defineMetadata({
  title: 'DTI Profile - Evastra',
  description:
    'Lihat profil DTI (Departemen Teknologi Informasi). Departemen Teknologi Informasi ITS adalah salah satu departemen di dalam Fakultas Teknologi Elektro dan Informatika Cerdas yang fokus pada bidang teknologi informasi, termasuk pengembangan perangkat lunak, keamanan siber, dan inovasi teknologi.',
  openGraph: {
    type: 'website',
    title: 'DTI Profile - Evastra',
    description:
      'Lihat profil DTI (Departemen Teknologi Informasi). Departemen Teknologi Informasi ITS adalah salah satu departemen di dalam Fakultas Teknologi Elektro dan Informatika Cerdas yang fokus pada bidang teknologi informasi, termasuk pengembangan perangkat lunak, keamanan siber, dan inovasi teknologi.',
    url: new URL('/dti-profile', getMetadataBase()).toString(),
    images: {
      url: new URL('/assets/images/metadata/dti-profile.webp', getMetadataBase()).toString(),
      width: 1200,
      height: 630,
      type: 'image/webp',
      alt: 'DTI Profile - Evastra'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DTI Profile - Evastra',
    description:
      'Lihat profil DTI (Departemen Teknologi Informasi). Departemen Teknologi Informasi ITS adalah salah satu departemen di dalam Fakultas Teknologi Elektro dan Informatika Cerdas yang fokus pada bidang teknologi informasi, termasuk pengembangan perangkat lunak, keamanan siber, dan inovasi teknologi.',
    images: {
      url: new URL('/assets/images/metadata/dti-profile.webp', getMetadataBase()).toString(),
      width: 1200,
      height: 630,
      type: 'image/webp',
      alt: 'DTI Profile - Evastra'
    }
  }
})

const DTIProfile = () => {
  return (
    <>
      <Hero />
      <div className="bg-[linear-gradient(180deg,#0B1E38_0%,#0F274F_30%,#122D5F_50%,#173679_70%,#1A3E87_85%,#1F4DA8_100%)]">
        <AboutDti />
        <Vision />
        <Mission />
      </div>

      <Cta />
    </>
  )
}

export default DTIProfile
