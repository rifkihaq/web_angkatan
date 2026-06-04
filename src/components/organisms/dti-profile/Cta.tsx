'use client'

import React from 'react'

import Image from 'next/image'

import { getTextStrokeStyle } from '@/lib/textStroke'

import Frame from '@/assets/images/dti-profile/ara7.jpg'
import Bg from '@/assets/images/dti-profile/cta.png'
import useWindowBreakpoint from '@/hooks/useWindowBreakpoint'

const Cta = () => {
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
    <div className="relative min-h-[750px] w-screen !overflow-x-hidden overflow-y-visible px-24">
      {/* Gunakan img biasa dulu untuk testing */}
      <img src={Bg.src} alt="Background" className="absolute inset-0 h-full w-full object-cover" />

      <div className="relative z-10">
        <h1
          style={getTextStrokeStyle({ color: '#fff', width: getStrokeWidth() })}
          className="font-rubikone text-blue-cs-30 relative mt-26 w-auto text-right text-4xl md:text-6xl"
        >
          Proven Result
        </h1>
      </div>

      <div className="card-con relative z-10 flex w-full flex-wrap justify-between gap-4 px-4 pt-36 md:flex-nowrap md:gap-6">
        {/* Card 1 */}
        <div
          className="card w-full overflow-hidden p-4 md:w-[33%]"
          style={{
            borderRadius: '17px',
            border: '2px solid #FFF',
            background: 'linear-gradient(180deg, #0D294F 12.02%, #1B3C6A 50.96%, #4071B3 100%)'
          }}
        >
          <div className="relative w-full">
            <div className="relative aspect-4/3 w-full">
              <Image
                src={Frame}
                alt="Video thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Phil Label - placed below image */}
            <div
              className="mt-3 w-full"
              style={{
                borderRadius: '16px',
                border: '1px solid #FFFCF2',
                background: 'linear-gradient(180deg, #4888C8 0%, #9DBDBA 56.73%, #FEFAA9 100%)'
              }}
            >
              <div className="px-4 py-2 text-center">
                <p className="text-sm font-semibold text-white md:text-base">Premium Content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="card w-full overflow-hidden p-4 md:w-[33%]"
          style={{
            borderRadius: '17px',
            border: '2px solid #FFF',
            background: 'linear-gradient(180deg, #0D294F 12.02%, #1B3C6A 50.96%, #4071B3 100%)'
          }}
        >
          <div className="relative w-full">
            <div className="relative aspect-video w-full">
              <Image
                src={Frame}
                alt="Video thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Phil Label - placed below image */}
            <div
              className="mt-3 w-full"
              style={{
                borderRadius: '16px',
                border: '1px solid #FFFCF2',
                background: 'linear-gradient(180deg, #4888C8 0%, #9DBDBA 56.73%, #FEFAA9 100%)'
              }}
            >
              <div className="px-4 py-2 text-center">
                <p className="text-sm font-semibold text-white md:text-base">Featured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="card w-full overflow-hidden p-4 md:w-[33%]"
          style={{
            borderRadius: '17px',
            border: '2px solid #FFF',
            background: 'linear-gradient(180deg, #0D294F 12.02%, #1B3C6A 50.96%, #4071B3 100%)'
          }}
        >
          <div className="relative w-full">
            <div className="relative aspect-video w-full">
              <Image
                src={Frame}
                alt="Video thumbnail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Phil Label - placed below image */}
            <div
              className="mt-3 w-full"
              style={{
                borderRadius: '16px',
                border: '1px solid #FFFCF2',
                background: 'linear-gradient(180deg, #4888C8 0%, #9DBDBA 56.73%, #FEFAA9 100%)'
              }}
            >
              <div className="px-4 py-2 text-center">
                <p className="text-sm font-semibold text-white md:text-base">New Release</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cta
