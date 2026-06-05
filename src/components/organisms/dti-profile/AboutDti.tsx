'use client'

import React from 'react'

import Image from 'next/image'

import { getTextStrokeStyle } from '@/lib/textStroke'

import cloudIcon from '@/assets/images/dti-profile/awan1.svg'
import cloudIcon2 from '@/assets/images/dti-profile/awan2.svg'
import Tower2 from '@/assets/images/dti-profile/tw.png'
import useWindowBreakpoint from '@/hooks/useWindowBreakpoint'

const AboutDti = () => {
  const breakpoint = useWindowBreakpoint()

  const getStrokeWidth = () => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
        return 3
      case 'md':
        return 4
      case 'lg':
        return 6
      default:
        return 6
    }
  }
  return (
    <div className="relative flex min-h-[780px] w-screen justify-between !overflow-x-hidden !overflow-y-visible pl-24">
      <div className="pointer-events-none absolute -top-0 -left-[20%] z-0 -scale-x-100 transform">
        <div className="relative">
          <Image
            src={cloudIcon}
            alt="Cloud decoration"
            width={600}
            height={150}
            className="h-auto w-full object-contain opacity-90"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute top-36 left-[25%] z-0 -scale-x-100 transform">
        <div className="relative">
          <Image
            src={cloudIcon2}
            alt="Cloud decoration"
            width={600}
            height={150}
            className="h-auto w-full object-contain opacity-90"
          />
        </div>
      </div>
      <div className="left w-1/2">
        <h1
          style={getTextStrokeStyle({ color: '#fff', width: getStrokeWidth() })}
          className="font-rubikone text-blue-cs-30 relative mt-36 w-auto text-4xl md:text-6xl"
        >
          Who We Are
        </h1>

        <p className="mt-32 text-white">
          Sebagai pusat keunggulan inovasi di ITS, <b>Departemen Teknologi Informasi (DTI)</b> memadukan{' '}
          <b>infrastruktur jaringan cerdas, integrasi sistem,</b> dan <b>keamanan siber</b>. Fokus utama kami adalah
          membangun fondasi teknologi yang tangguh dan terukur untuk menjawab tantangan era digital.
        </p>
        <p className="mt-10 text-white">
          Dari mengorkestrasi tata kelola sistem informasi hingga membangun pertahanan dari ancaman siber, mahasiswa DTI
          dibentuk menjadi <b>arsitek teknologi masa depan</b> yang mampu <b>memastikan</b> setiap ekosistem digital{' '}
          <b>beroperasi secara efisien dan aman.</b>
        </p>
      </div>
      <div className="right relative w-1/2">
        <Image
          src={Tower2}
          alt="tower 2"
          width={800}
          height={1000}
          className="absolute -right-16 ml-auto h-auto origin-top scale-140 transform"
          priority
        />
      </div>
    </div>
  )
}

export default AboutDti
