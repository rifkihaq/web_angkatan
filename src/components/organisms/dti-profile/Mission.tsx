'use client'

import React, { useState, useCallback } from 'react'

import Image from 'next/image'

import { getTextStrokeStyle } from '@/lib/textStroke'

import cloudIcon from '@/assets/images/dti-profile/awan1.svg'
import cloudIcon2 from '@/assets/images/dti-profile/awan2.svg'
import Frame from '@/assets/images/dti-profile/frame-mis.png'
import useWindowBreakpoint from '@/hooks/useWindowBreakpoint'

// Mission data array with different content
const missions = [
  {
    id: 1,
    title: 'Mission 1',
    content:
      'Menyelenggarakan pendidikan dan pengajaran Teknologi Informasi dengan menggunakan kurikulum yang adaptif, berorientasi ke masa depan dan didukung Sumber Daya Manusia yang berkualitas serta fasilitas yang memadai.'
  },
  {
    id: 2,
    title: 'Mission 2',
    content:
      'Melaksanakan penelitian yang bermutu di bidang Cybersecurity, System Integration dan Cloud Computing Services, serta Internet of Things for Smart City.'
  },
  {
    id: 3,
    title: 'Mission 3',
    content: 'Menjalin kemitraan dengan instansi dalam maupun luar negeri.'
  },
  {
    id: 4,
    title: 'Mission 4',
    content:
      'Menyelenggarakan pengabdian kepada masyarakat berupa pelatihan, penyuluhan, penerapan hasil penelitian untuk pengembangan potensi dan pemberdayaan masyarakat daerah.'
  }
]

const Mission = () => {
  const breakpoint = useWindowBreakpoint()
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // Handle next with infinite loop
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % missions.length)
  }, [])

  // Handle previous with infinite loop
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + missions.length) % missions.length)
  }, [])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  const currentMission = missions[currentIndex]

  return (
    <div className="relative min-h-[670px] w-screen !overflow-x-hidden overflow-y-visible pb-28">
      <div className="pointer-events-none absolute -top-0 -right-[10%] z-0 -scale-x-100 transform">
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
      <h1
        style={getTextStrokeStyle({ color: '#fff', width: getStrokeWidth() })}
        className="font-rubikone text-blue-cs-30 relative mt-26 w-auto text-center text-4xl md:text-6xl"
      >
        Mission
      </h1>

      <div className="relative flex w-full items-center justify-center py-8">
        <div className="relative w-[1200px] max-w-full">
          <Image src={Frame} alt="Frame" className="h-auto w-full" priority />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-10">
            <p className="animate-in fade-in mt-8 max-w-3xl text-center text-lg leading-relaxed font-semibold text-white transition-all duration-300">
              {currentMission.content}
            </p>
          </div>
          <button
            onClick={handlePrev}
            aria-label="Previous mission"
            className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-3xl font-light text-white transition-all select-none hover:scale-110 hover:text-gray-300 active:scale-95 md:left-4 md:text-6xl lg:left-24"
          >
            ‹
          </button>

          <button
            onClick={handleNext}
            aria-label="Next mission"
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-3xl font-light text-white transition-all select-none hover:scale-110 hover:text-gray-300 active:scale-95 md:right-4 md:text-6xl lg:right-24"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default Mission
