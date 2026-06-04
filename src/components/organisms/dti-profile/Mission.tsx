'use client'

import React, { useState, useCallback } from 'react'

import Image from 'next/image'

import { getTextStrokeStyle } from '@/lib/textStroke'

import Frame from '@/assets/images/dti-profile/frame-mis.png'
import useWindowBreakpoint from '@/hooks/useWindowBreakpoint'

// Mission data array with different content
const missions = [
  {
    id: 1,
    title: 'Mission 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
  },
  {
    id: 2,
    title: 'Mission 2',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.'
  },
  {
    id: 3,
    title: 'Mission 3',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.'
  },
  {
    id: 4,
    title: 'Mission 4',
    content:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.'
  },
  {
    id: 5,
    title: 'Mission 5',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.'
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
    <div className="min-h-[600px] w-screen !overflow-x-hidden overflow-y-visible">
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
            <p className="animate-in fade-in max-w-3xl text-center text-lg leading-relaxed text-white transition-all duration-300">
              {currentMission.content}
            </p>
          </div>

          {/* Navigation Buttons - positioned exactly on frame edges */}
          <button
            onClick={handlePrev}
            aria-label="Previous mission"
            className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-5xl font-light text-white transition-all select-none hover:scale-110 hover:text-gray-300 active:scale-95 md:left-4 md:text-6xl lg:left-24"
          >
            ‹
          </button>

          <button
            onClick={handleNext}
            aria-label="Next mission"
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-5xl font-light text-white transition-all select-none hover:scale-110 hover:text-gray-300 active:scale-95 md:right-4 md:text-6xl lg:right-24"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default Mission
