'use client'

import React, { useEffect } from 'react'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.png'

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
    className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
  />
  <div className="border-blue-cs-40/40 bg-gradient-to-b from-blue-cs-40 to-blue-cs-30 relative z-10 max-h-[calc(100vh-9rem)] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto rounded-3xl border-2 p-6 text-white shadow-2xl sm:max-h-[calc(100vh-10rem)] sm:p-8 before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-t before:from-blue-cs-40/20 before:to-transparent">
    <button
      type="button"
      aria-label="Close member detail"
      onClick={onClose}
      className="border-white/30 hover:border-white/60 hover:bg-white/10 absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border-2 text-xl leading-none font-bold transition-all duration-200 hover:scale-110"
    >
      ✕
    </button>

        <div className="border-neutral-cs-10/40 mb-5 overflow-hidden rounded-2xl border">
          <Image src={ProfileImage} alt="Profile Image" className="h-120 w-full object-cover object-center" />
        </div>

        <div className="pr-10">
          {/* UBAH NAMA ANDA */}
          <h2 className="text-2xl font-black">M.Faris Roisul Azhar</h2>
          {/* UBAH NRP DAN ASAL */}
          <p className="text-neutral-cs-10/70 mt-1 text-sm font-semibold">5027251048 - Kediri</p>
        </div>

        <div className="mt-5 flex gap-2">
          {/* UBAH USERNAME INSTAGRAM */}
          <Instagram username="muhammadfarisazhar" />
          {/* UBAH USERNAME LINKEDIN */}
          <LinkedInButtonLink username="M.Faris Roisul Azhar" />
        </div>

        <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2">
          <div className="border-neutral-cs-10/40 rounded-xl border p-4">
            {/* UBAH HOBI KAMU */}
            <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase">Hobi</p>
            <p className="mt-2">Berenang</p>
          </div>
          <div className="border-neutral-cs-10/40 rounded-xl border p-4">
            {/* UBAH FUNFACT KAMU */}
            <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase">Fun Fact</p>
            <p className="mt-2">Bisa mandi sehari 4 kali</p>
          </div>
        </div>

        <div className="border-neutral-cs-10/40 mt-4 rounded-xl border p-4">
          {/* UBAH LAGU FAVORIT KAMU */}
          <p className="text-neutral-cs-10/60 text-xs font-bold tracking-wide uppercase">Sunsetz by CAS</p>
          <p className="my-2 text-sm font-semibold">Sunsetz</p>

          {/* UBAH URL SPOTIFY KAMU DENGAN LAGU FAVORIT MU */}
          <SpotifyEmbed spotifyUrl="https://open.spotify.com/track/0yuAWlxq59xT3agQ965OxE?si=xJgvh7N5TEaJkS26EnMQkw"/>
        </div>
      </div>
    </div>
  )
}

export default MemberPopup
