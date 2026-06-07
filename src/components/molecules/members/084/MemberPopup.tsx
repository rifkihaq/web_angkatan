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
        className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md"
      />

      <div className="relative z-10 max-h-[calc(100vh-9rem)] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d1b3e]/90 to-[#0a0f1e]/95 p-6 text-white shadow-[0_0_80px_-10px_rgba(99,102,241,0.4)] backdrop-blur-xl sm:max-h-[calc(100vh-10rem)] sm:p-8">

        {/* Decorative top accent glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_12px_rgba(99,102,241,0.4)]"
        >
          ✕
        </button>

        {/* Profile Image */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          {/* Gradient overlay on image bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0f1e]/80 to-transparent z-10 pointer-events-none" />
          <Image src={ProfileImage} alt="Profile Image" className="h-120 w-full object-cover object-center brightness-90 saturate-[1.1]" />
        </div>

        {/* Name & NRP */}
        <div className="pr-10">
          {/* UBAH NAMA ANDA */}
          <h2 className="bg-gradient-to-r from-white via-indigo-200 to-blue-300 bg-clip-text text-2xl font-black tracking-tight text-transparent">
            Muhammad Nadhif Pasya Ikhsan
          </h2>
          {/* UBAH NRP DAN ASAL */}
          <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-indigo-300/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400/60" />
            5027251084 — Pekanbaru
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-5 flex gap-2">
          {/* UBAH USERNAME INSTAGRAM */}
          <Instagram username="nadhifpasya_" />
          {/* UBAH USERNAME LINKEDIN */}
          <LinkedInButtonLink username="muhammad-nadhif-pasya-ikhsan-0216b0379" />
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid gap-3 text-sm font-semibold sm:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition-all duration-300 hover:border-indigo-400/25 hover:bg-indigo-500/[0.07]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {/* UBAH HOBI KAMU */}
            <p className="mb-2 text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-300/50">Hobi</p>
            <p className="text-white/85">Main game</p>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition-all duration-300 hover:border-indigo-400/25 hover:bg-indigo-500/[0.07]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {/* UBAH FUNFACT KAMU */}
            <p className="mb-2 text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-300/50">Fun Fact</p>
            <p className="text-white/85">asal pekanbaru naturalisasi ke malang</p>
          </div>
        </div>

        {/* Spotify */}
        <div className="group relative mt-3 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] p-4 transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-500/[0.05]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* UBAH LAGU FAVORIT KAMU */}
          <p className="mb-1 text-[10px] font-bold tracking-[0.15em] uppercase text-emerald-300/50">Lagu Favorit</p>
          <p className="my-2 font-semibold text-white/85">Dancing In September</p>

          {/* UBAH URL SPOTIFY KAMU DENGAN LAGU FAVORIT MU */}
          <SpotifyEmbed spotifyUrl="https://open.spotify.com/intl-id/track/3PExB0N7a56JkDdFGZ6PV8?si=cdd30bb5b62944d9" />
        </div>

        {/* Bottom accent glow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
      </div>
    </div>
  )
}

export default MemberPopup