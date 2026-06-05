'use client'

import React from 'react'

import Image from 'next/image'

import { getTextStrokeStyle } from '@/lib/textStroke'

import cloudIcon from '@/assets/images/dti-profile/awan1.svg'
import cloudIcon2 from '@/assets/images/dti-profile/awan2.svg'
import Frame from '@/assets/images/dti-profile/frame-vis.png'
import useWindowBreakpoint from '@/hooks/useWindowBreakpoint'

const Vision = () => {
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
    <div className="relative min-h-[600px] w-screen !overflow-x-hidden overflow-y-visible">
      <div className="pointer-events-none absolute -top-0 -left-[10%] z-0 scale-x-100 transform">
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
      <h1
        style={getTextStrokeStyle({ color: '#fff', width: getStrokeWidth() })}
        className="font-rubikone text-blue-cs-30 relative mt-26 w-auto text-center text-4xl md:text-6xl"
      >
        Vision
      </h1>

      <div className="flex w-full items-center justify-center">
        <div className="relative w-[1100px] max-w-full">
          <Image src={Frame} alt="Frame" className="h-auto w-full" priority />

          <div className="absolute inset-0 flex items-center justify-center px-10">
            <p className="mt-4 mt-8 max-w-3xl text-center text-lg leading-relaxed font-semibold text-white">
              Menjadi pengelola program studi bidang teknologi informasi yang memiliki reputasi internasional serta
              berkontribusi pada keilmuan dan kemanusiaan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vision
