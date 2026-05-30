'use client'
import React, { useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getTextStrokeStyle } from '@/lib/textStroke'

import NotFoundCard from '@/assets/images/layout/notfound.svg'

import Home from '../atoms/icon/Home'

const NotFoud = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section
      id="not-found"
      className="bg-blue-cs-40 text-neutral-cs-10 relative flex min-h-screen w-full items-center justify-center overflow-hidden py-36 md:py-16"
    >
      {/* 1. LAYER VIDEO: Tanpa z-index (Otomatis paling bawah) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/videos/starrynight.mp4" type="video/mp4" />
      </video>

      {/* 2. LAYER OVERLAY: Tanpa z-index (Otomatis di atas video berdasarkan DOM) */}
      <div className="from-blue-cs-30/20 to-blue-cs-40 absolute inset-0 bg-gradient-to-b" aria-hidden="true" />

      <div className="relative z-10 w-213">
        <Image src={NotFoundCard} className="" alt="Not Found" width={850} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1
            className="font-rubikone text-blue-cs-30 text-9xl font-bold"
            style={getTextStrokeStyle({ color: '#fff', width: 15 })}
          >
            404
          </h1>
          <p className="mt-6 w-1/2 text-center font-semibold text-white">
            Maaf, sepertinya halaman yang anda cari tidak ada, silahkan kembali ke beranda
          </p>
          <Link href={'/'}>
            <button className="bg-blue-cs-30 mt-8 flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] focus:outline-none">
              <span>
                <Home width={20} height={20} />
              </span>
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoud
