'use client'

import React, { useEffect, useRef, useState} from 'react'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

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
   const photoRef = useRef<HTMLDivElement>(null)
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const [isHologram, setIsHologram] = useState(true) 

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

  useEffect(() => {
  if (!isOpen) {
    setIsHologram(true)
    return
  } 

  const wrap = photoRef.current
  const canvas = canvasRef.current
  if (!wrap || !canvas) return

  const timeout = setTimeout(() => {
    canvas.width = wrap.offsetWidth
    canvas.height = wrap.offsetHeight

    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height 
    const dur = 1750
    let start: number | null = null
    let animId: number

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, W, H)

    function draw(ts: number) {
      if (!start) start = ts
      const elapsed = ts - start
      const p = Math.min(elapsed / dur, 1)
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p

      ctx.clearRect(0, 0, W, H)

      // wipe kanan ke kiri
      if (p < 1) {
        ctx.fillStyle = '#000'
        const x = (1 - ease) * W
        ctx.fillRect(0, 0, x, H)
      }

      // hologram overlay
      if (isHologram && p > 0.3) {
        const holo = Math.min((p - 0.3) / 0.7, 1)

        ctx.fillStyle = `rgba(0, 200, 255, ${0.08 * holo})`
        ctx.fillRect(0, 0, W, H)

        ctx.fillStyle = `rgba(0, 0, 0, ${0.25 * holo})`
        for (let y = 0; y < H; y += 4) {
          ctx.fillRect(0, y, W, 2)
        }

        const flicker = Math.sin(elapsed * 0.05) * Math.sin(elapsed * 0.017)
        if (flicker > 0.6) {
          ctx.fillStyle = `rgba(0, 200, 255, ${0.06 * holo})`
          ctx.fillRect(0, 0, W, H)
        }

        if (Math.random() < 0.015) {
          const gy = Math.random() * H
          const gh = Math.random() * 6 + 2
          const gx = (Math.random() - 0.5) * 12
          ctx.drawImage(canvas, 0, gy, W, gh, gx, gy, W, gh)
        }

        const vignette = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85)
        vignette.addColorStop(0, 'rgba(0,0,0,0)')
        vignette.addColorStop(1, `rgba(0, 80, 150, ${0.45 * holo})`)
        ctx.fillStyle = vignette
        ctx.fillRect(0, 0, W, H)

        const scanY = ((elapsed * 0.04) % (H + 20)) - 10
        ctx.fillStyle = `rgba(0, 220, 255, ${0.12 * holo})`
        ctx.fillRect(0, scanY, W, 3)
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, 150)

  return () => clearTimeout(timeout)
}, [isOpen, isHologram])  

  if (!isOpen) {
    return null
  }

  return (

  <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 pt-28 pb-8 sm:pt-32">
    <button
      type="button"
      aria-label="Close member detail"
      onClick={onClose}
      className="absolute inset-0 bg-black/80 backdrop-blur-md"
    />

```
<div className="relative z-10 max-h-[calc(100vh-9rem)] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto rounded-2xl border-2 border-yellow-400 bg-black p-6 text-white shadow-xl sm:max-h-[calc(100vh-10rem)] sm:p-8">
  <button
    type="button"
    aria-label="Close member detail"
    onClick={onClose}
    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
  >
    ×
  </button>

  {/* STAR WARS HEADER */}
  <div className="mb-6 text-center">
    <p className="animate-pulse text-xs tracking-[0.4em] text-blue-300">
      A LONG TIME AGO IN A GALAXY FAR, FAR AWAY...
    </p>

   
    <p className="mt-2 text-xs tracking-[0.3em] text-yellow-500">
      GALACTIC DATABASE
    </p>

    <div className="mx-auto mt-3 h-[2px] w-28 bg-yellow-400" />
  </div>

  {/* FOTO */}
  <div
  ref={photoRef}
  className="group mb-5 overflow-hidden rounded-2xl border border-yellow-400/30 relative bg-black"
>
  <Image
    src={ProfileImage}
    alt="Profile Image"
    className="h-120 w-full object-cover object-center transition-all duration-700 hover:scale-105 hover:brightness-110"
  />
  <canvas
    ref={canvasRef}
    className="absolute inset-0 pointer-events-none z-10"
    style={{ width: '100%', height: '100%' }}
  />
</div>

{/* TOGGLE HOLOGRAM */}
<div className="mb-5 flex justify-center">
  <button
    type="button"
    onClick={() => setIsHologram(prev => !prev)}
    className="rounded-full border border-yellow-400/50 px-4 py-1.5 text-xs tracking-widest text-yellow-400 hover:bg-yellow-400/10 transition-colors"
  >
    {isHologram ? 'HOLOGRAM' : 'NORMAL'}
  </button>
</div>

  {/* IDENTITAS */}
  <div className="pr-10">
    <h2 className="text-3xl font-black uppercase tracking-[0.12em] text-yellow-400">
      A.Algifari Rantiga Isdar
    </h2>

    <p className="mt-1 text-sm font-semibold text-gray-300">
      UNIT #5027251112 • JAKARTA SYSTEM
    </p>
  </div>

  {/* SOCIAL */}
  <div className="mt-5 flex gap-2">
    <Instagram username="alghifarirantiga" />
    <LinkedInButtonLink username="algifari-rantiga-6906b1379" />
  </div>

  {/* INFO */}
  <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2">
    <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
      <p className="text-xs uppercase tracking-widest text-yellow-400">
        Hobi
      </p>

      <p className="mt-2">
        Ngoding (ngobrol ama dinding)
      </p>
    </div>

    <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
      <p className="text-xs uppercase tracking-widest text-yellow-400">
        Fun fact
      </p>

      <p className="mt-2">
        Motor dimalingin 2 tahun berturut turut
      </p>
    </div>
  </div>

  {/* MUSIC */}
  <div className="mt-4 rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4">
  <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">
    Cantina Track
  </p>

  <p className="my-2 text-sm font-semibold">
    Sebelah mata
  </p>

  <div className="overflow-hidden rounded-xl border border-yellow-400/20">
<SpotifyEmbed spotifyUrl="https://open.spotify.com/embed/track/3M0RfjqAJZ1f6qXJkP1Uej?t=160" />  </div>
</div>

  {/* FOOTER */}
  <div className="mt-6 border-t border-yellow-400/20 pt-4 text-center">
    <p className="italic text-yellow-400">
      This is the way.
    </p>

    <p className="mt-2 text-xs tracking-[0.3em] text-gray-500">
      IMPERIAL PERSONNEL RECORD
    </p>
  </div>
</div>
```

  </div>
)


  return createPortal(
    // PADA BAGIAN INI KAMU BOLEH MENGUBAH STYLE SESUKA HATI KAMU, TAPI JANGAN UBAH STRUKTUR DAN FUNGSI DARI KODE INI AGAR FUNGSI POPUP TETAP BERJALAN DENGAN BAIK
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4">
      <button
        type="button"
        aria-label="Close member detail"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="border-neutral-cs-10 bg-blue-cs-40 relative z-10 max-h-[100dvh] w-full max-w-[720px] animate-[member-popup-show_200ms_ease-out] overflow-y-auto rounded-2xl border-2 p-6 text-white shadow-xl sm:p-8">
        <button
          type="button"
          aria-label="Close member detail"
          onClick={onClose}
          className="border-neutral-cs-10 hover:bg-neutral-cs-10/10 absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border text-xl leading-none"
        >
          x
        </button>

        <div className="border-neutral-cs-10/40 mb-5 overflow-hidden rounded-2xl border">
          <Image src={ProfileImage} alt="Profile Image" className="h-120 w-full object-cover object-center" />
        </div>

        <div className="pr-10">
          {/* UBAH NAMA ANDA */}
          <h2 className="text-2xl font-black">A.Algifari Rantiga Isdar</h2>
          {/* UBAH NRP DAN ASAL */}
          <p className="text-neutral-cs-10/70 mt-1 text-sm font-semibold">5027251112 - Jakarta</p>
        </div>

        <div className="mt-5 flex gap-2">
          {/* UBAH USERNAME INSTAGRAM */}
          <Instagram username="alghifarirantiga" />
          {/* UBAH USERNAME LINKEDIN */}
          <LinkedInButtonLink username="algifari rantiga" />
        </div>

        <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2">
          <div className="border-neutral-cs-10/40 rounded-xl border p-4">
            {/* UBAH HOBI KAMU */}
            <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase">Hobi</p>
            <p className="mt-2">Ngoding</p>
          </div>
          <div className="border-neutral-cs-10/40 rounded-xl border p-4">
            {/* UBAH FUNFACT KAMU */}
            <p className="text-neutral-cs-10/60 text-xs tracking-wide uppercase">Fun Fact</p>
            <p className="mt-2">Motor dimalingin di kos</p>
          </div>
        </div>

        <div className="border-neutral-cs-10/40 mt-4 rounded-xl border p-4">
          {/* UBAH LAGU FAVORIT KAMU */}
          <p className="text-neutral-cs-10/60 text-xs font-bold tracking-wide uppercase">Lagu Favorit</p>
          <p className="my-2 text-sm font-semibold">Esok kan masih ada</p>

          {/* UBAH URL SPOTIFY KAMU DENGAN LAGU FAVORIT MU */}
          <SpotifyEmbed spotifyUrl="https://open.spotify.com/intl-id/track/4OnjSIwHvgpvUIP37y18zF" />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default MemberPopup
