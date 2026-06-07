'use client'

import React, { useEffect } from 'react'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.jpeg'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    // PADA BAGIAN INI KAMU BOLEH MENGUBAH STYLE SESUKA HATI KAMU, TAPI JANGAN UBAH STRUKTUR DAN FUNGSI DARI KODE INI AGAR FUNGSI POPUP TETAP BERJALAN DENGAN BAIK
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-28 pb-8 sm:pt-32">
      <button
        type="button"
        aria-label="Close member detail"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        className="border-neutral-cs-10 bg-blue-cs-40 relative z-10 max-h-[calc(100vh-9rem)] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto rounded-2xl border-2 p-6 text-white shadow-xl sm:max-h-[calc(100vh-10rem)] sm:p-8"
        style={{
          background: 'linear-gradient(135deg, #ffd6e8 0%, #c8e6ff 45%, #d4f5e9 75%, #fff9c4 100%)',
          borderColor: 'rgba(255,255,255,0.8)',
          boxShadow: '0 8px 40px rgba(255,150,200,0.3), 0 2px 12px rgba(150,200,255,0.2)',
          color: '#3a3060',
        }}
      >
        {/* sparkle decorations */}
        <span className="pointer-events-none absolute top-3 left-5 select-none text-base leading-none" aria-hidden>✦</span>
        <span className="pointer-events-none absolute top-8 left-10 select-none text-[10px] leading-none" aria-hidden>✧</span>
        <span className="pointer-events-none absolute bottom-10 right-6 select-none text-base leading-none" aria-hidden>✦</span>
        <span className="pointer-events-none absolute bottom-20 right-12 select-none text-[10px] leading-none" aria-hidden>✧</span>

        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="border-neutral-cs-10 hover:bg-neutral-cs-10/10 absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border text-xl leading-none"
          style={{
            borderColor: 'rgba(150,120,200,0.4)',
            background: 'rgba(255,255,255,0.5)',
            color: '#7060a0',
          }}
        >
          x
        </button>

        <div
          className="border-neutral-cs-10/40 mb-5 overflow-hidden rounded-2xl border"
          style={{
            padding: '3px',
            background: 'linear-gradient(135deg, #ffb3d1, #b3d4ff, #b3f0d4)',
            border: 'none',
          }}
        >
          <Image src={ProfileImage} alt="Profile Image" className="h-120 w-full rounded-[14px] object-cover object-center" />
        </div>

        <div className="pr-10">
          {/* UBAH NAMA ANDA */}
          <h2 className="text-2xl font-black" style={{ color: '#5060a0', fontFamily: 'Georgia, serif' }}>Nathania Tiara Wahyudi</h2>
          {/* UBAH NRP DAN ASAL */}
          <p className="text-neutral-cs-10/70 mt-1 text-sm font-semibold" style={{ color: '#9070b0' }}>5027251089 - Jombang</p>
        </div>

        <div className="mt-5 flex gap-2">
          {/* UBAH USERNAME INSTAGRAM */}
          <Instagram username="__naathhh" />
          {/* UBAH USERNAME LINKEDIN */}
          <LinkedInButtonLink username="nthaniatiara0808" />
        </div>

        <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2">
          <div
            className="border-neutral-cs-10/40 rounded-xl border p-4"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(255,255,255,0.9)',
            }}
          >
            {/* UBAH HOBI KAMU */}
            <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase" style={{ color: '#b090c0' }}>Hobi</p>
            <p className="mt-2" style={{ color: '#5060a0' }}>nonton drakor/sitcom</p>
          </div>
          <div
            className="border-neutral-cs-10/40 rounded-xl border p-4"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(255,255,255,0.9)',
            }}
          >
            {/* UBAH FUNFACT KAMU */}
            <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase" style={{ color: '#b090c0' }}>Fun Fact</p>
            <p className="mt-2" style={{ color: '#5060a0' }}>rewatch modern family lebih dari sejuta kali, tapi ga pernah nonton ep terakhir</p>
          </div>
        </div>

        <div
          className="border-neutral-cs-10/40 mt-4 rounded-xl border p-4"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(8px)',
            borderColor: 'rgba(255,255,255,0.9)',
          }}
        >
          {/* UBAH LAGU FAVORIT KAMU */}
          <p className="text-neutral-cs-10/60 text-xs font-bold tracking-wide uppercase" style={{ color: '#b090c0' }}>Lagu Favorit</p>
          <p className="my-2 text-sm font-semibold" style={{ color: '#5060a0' }}>4 walls</p>

          {/* UBAH URL SPOTIFY KAMU DENGAN LAGU FAVORIT MU */}
          <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/2YkjXEab4USTV9uuAgC90E?si=edfac3390ebb48c6" />
        </div>
      </div>
    </div>
  )
}

export default MemberPopup