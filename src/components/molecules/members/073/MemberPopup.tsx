'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import Image from 'next/image'

import Instagram from '@/components/atoms/button/InstagramButtonLink'
import LinkedInButtonLink from '@/components/atoms/button/LinkedInButtonLink'
import SpotifyEmbed from '@/components/molecules/SpotifyEmbed'

import ProfileImage from './image.jpeg'

type MemberPopupProps = {
  isOpen: boolean
  onClose: () => void
}

type Stage = 'envelope-front' | 'envelope-flip' | 'envelope-open' | 'poem' | 'profile'

// Floating emoji component — floats WITHOUT covering text
const FloatingEmoji = ({
  emoji,
  count = 6,
  style,
}: {
  emoji: string
  count?: number
  style?: React.CSSProperties
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0, ...style }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: `${8 + (i * 13) % 84}%`,
            top: `-2rem`,
            fontSize: '1.2rem',
            opacity: 0.55,
            animation: `floatDown ${4 + (i * 1.3) % 5}s linear ${(i * 0.9) % 4}s infinite`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}

// Falling leaves for poem box
const FallingLeaves = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: `${5 + (i * 9) % 90}%`,
            top: `-1.5rem`,
            fontSize: `${0.9 + (i % 3) * 0.3}rem`,
            opacity: 0.4,
            animation: `leafFall ${5 + (i * 0.7) % 4}s ease-in ${(i * 0.6) % 5}s infinite`,
          }}
        >
          🍂
        </span>
      ))}
    </div>
  )
}

const poemTitle = 'Bak arum manis, cukup dinikmati tanpa perlu pengungkapan manis'
const poemBody = `B.J. Habibie sebut cintanya, gula jawa.
Rangga sebut wanita istimewanya, cinta.
Lantas harus ku sebut apa dirimu?

Ini tentangnya,
Yang entah persis dari kapan hinggap di kepala.
Menyusuri ruang dunia,
Melukis cerita.

Ini tentang perasaanku,
Yang tiba² menggebu.
Tak tahu arah dan menentu.
Tapi... aku hanya seorang gadis, diam termangu.
Tak mungkin memulai gerak laku.

Jika bisa ku sebutkan perasaanku,
Entah berapa kata terlontar dari mulut atau pena ku.
Tapi ku pilih satu,
"Rindu".

Benar² tak terduga bagaimana Tuhan memperkenalkanmu padaku.
Sama hal nya dengan maling jemuran di siang bolong, hadirmu benar² tidak terduga tak tertolong.
Bak jam pasir, perkenalanmu benar² dibuat mendesir.
Seperti lilin, hati ku pun terpilin.

Bagaimana aku tak rindu?
Sedang wajahmu sendu,
Manis senyummu,
Indah semua tentangmu,
di mata ku.
Wahai Tuan yang tak pernah tau.`

const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/track/3AAAGS7iM1ekDywqdYMJG2?si=pDg9SaHgTNqdlLN-AmweuQ'

// Tiny autoplay iframe helper — hidden, just for audio
const HiddenSpotifyPlayer = ({ play }: { play: boolean }) => {
  if (!play) return null
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/3AAAGS7iM1ekDywqdYMJG2?utm_source=generator&autoplay=1`}
      width="0"
      height="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      title="bg-music"
    />
  )
}

const MemberPopup = ({ isOpen, onClose }: MemberPopupProps) => {
  const [stage, setStage] = useState<Stage>('envelope-front')
  const [isFlipping, setIsFlipping] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setStage('envelope-front')
      setIsFlipping(false)
      setIsOpening(false)
      setMusicPlaying(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleClose = () => {
    setMusicPlaying(false)
    onClose()
  }

  const handleOk = () => {
    // Flip envelope to back
    setIsFlipping(true)
    setStage('envelope-flip')
    setTimeout(() => {
      setStage('envelope-open')
      setIsOpening(true)
      // After flap opens, go to poem
      setTimeout(() => {
        setMusicPlaying(true)
        setStage('poem')
      }, 1200)
    }, 700)
  }

  if (!isOpen) return null

  return createPortal(
    <>
      {/* Hidden spotify autoplay */}
      <HiddenSpotifyPlayer play={musicPlaying} />

      <style>{`
        @keyframes floatDown {
          0%   { transform: translateY(-1.5rem) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.55; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(calc(100% + 3rem)) rotate(20deg); opacity: 0; }
        }
        @keyframes leafFall {
          0%   { transform: translateY(-1.5rem) rotate(-10deg) translateX(0); opacity: 0; }
          10%  { opacity: 0.45; }
          50%  { transform: translateY(50%) rotate(15deg) translateX(12px); }
          90%  { opacity: 0.3; }
          100% { transform: translateY(105%) rotate(-5deg) translateX(-8px); opacity: 0; }
        }
        @keyframes envelopeFlipIn {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes flapOpen {
          0%   { transform: rotateX(0deg); transform-origin: top center; }
          100% { transform: rotateX(-160deg); transform-origin: top center; }
        }
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes sunsetGlow {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50%       { transform: translateY(-8px) rotate(5deg); }
        }
        .envelope-scene {
          perspective: 800px;
        }
        .envelope-card {
          transition: transform 0.7s cubic-bezier(.4,0,.2,1);
          transform-style: preserve-3d;
        }
        .envelope-flipped {
          transform: rotateY(180deg);
        }
        .envelope-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          inset: 0;
        }
        .envelope-back {
          transform: rotateY(180deg);
        }
        .flap {
          transform-origin: top center;
          transition: transform 0.9s cubic-bezier(.4,0,.2,1);
        }
        .flap-open {
          transform: rotateX(-160deg);
        }
        .poem-box {
          background: linear-gradient(135deg, #ff9a5c 0%, #ff6b35 25%, #e85d04 50%, #d4533b 75%, #c94040 100%);
          background-size: 300% 300%;
          animation: sunsetGlow 8s ease infinite;
        }
        .profile-animate {
          animation: fadeSlideUp 0.4s ease-out both;
        }
      `}</style>

      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-8">
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute inset-0 bg-pink-200/40 backdrop-blur-sm"
        />

        {/* ────── ENVELOPE STAGE ────── */}
        {(stage === 'envelope-front' || stage === 'envelope-flip' || stage === 'envelope-open') && (
          <div className="relative z-10 flex flex-col items-center justify-center w-full" style={{ minHeight: '80vh' }}>
            <div className="envelope-scene w-72 h-52 sm:w-96 sm:h-64">
              <div className={`envelope-card relative w-full h-full ${stage !== 'envelope-front' ? 'envelope-flipped' : ''}`}>

                {/* FRONT FACE */}
                <div className="envelope-face rounded-2xl bg-white border-2 border-pink-200 shadow-2xl flex flex-col items-center justify-center gap-4 p-6">
                  {/* Envelope decorative lines */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10">
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[6rem] border-l-transparent border-t-[3rem] border-t-pink-300 sm:border-l-[8rem] sm:border-t-[4rem]" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-r-[6rem] border-r-transparent border-t-[3rem] border-t-pink-300 sm:border-r-[8rem] sm:border-t-[4rem]" />
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[6rem] border-l-transparent border-b-[3rem] border-b-pink-200 sm:border-l-[8rem] sm:border-b-[4rem]" />
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[6rem] border-r-transparent border-b-[3rem] border-b-pink-200 sm:border-r-[8rem] sm:border-b-[4rem]" />
                  </div>
                  <p className="text-center text-[#b06080] font-semibold text-sm sm:text-base leading-relaxed px-2 relative z-10">
                    sebelum kenalan, baca puisi masterpiece ku dulu yaa 🌸
                  </p>
                  <button
                    onClick={handleOk}
                    className="relative z-10 mt-1 px-8 py-2 rounded-full bg-pink-400 text-white font-bold text-sm shadow-lg hover:bg-pink-500 active:scale-95 transition-all"
                  >
                    ok ✉️
                  </button>
                </div>

                {/* BACK FACE */}
                <div className="envelope-face envelope-back rounded-2xl bg-[#fde8f0] border-2 border-pink-200 shadow-2xl overflow-hidden flex flex-col">
                  {/* Envelope body */}
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* diagonal lines texture */}
                    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="diag" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="10" x2="10" y2="0" stroke="#b06080" strokeWidth="1"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#diag)"/>
                    </svg>
                    {/* Letter inside peeking */}
                    <div className="w-3/4 h-2/3 bg-white/70 rounded-lg shadow-inner flex items-center justify-center">
                      <span className="text-2xl">📜</span>
                    </div>
                  </div>
                  {/* Envelope flap (top triangle) */}
                  <div
                    className={`flap absolute top-0 left-0 right-0 z-10 ${stage === 'envelope-open' ? 'flap-open' : ''}`}
                    style={{ height: '50%', transformOrigin: 'top center' }}
                  >
                    {/* Triangle flap shape */}
                    <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                      <polygon points="0,0 100,0 50,50" fill="#fad4e5" stroke="#f8b4d0" strokeWidth="0.5"/>
                    </svg>
                    {/* Maple leaf seal */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl sm:text-2xl">
                      🍁
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="relative z-10 mt-4 text-xs text-pink-400 opacity-60 italic">
              {stage === 'envelope-front' ? 'ada surat untukmu~' : stage === 'envelope-flip' ? 'membalik amplop...' : 'membuka amplop...'}
            </p>
          </div>
        )}

        {/* ────── POEM STAGE ────── */}
        {stage === 'poem' && (
          <div
            className="relative z-10 w-full max-w-[680px] rounded-2xl shadow-2xl overflow-hidden animate-[fadeSlideUp_0.5s_ease-out]"
            style={{ animation: 'fadeSlideUp 0.5s ease-out both' }}
          >
            <div className="poem-box relative p-6 sm:p-8">
              {/* Falling leaves — behind content, z-0 */}
              <FallingLeaves />

              {/* Content — z-10 so leaves go behind */}
              <div className="relative z-10">
                {/* Poem title */}
                <h2
                  className="text-xl sm:text-2xl font-black leading-snug mb-5"
                  style={{
                    color: '#fff8ee',
                    textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                    fontFamily: '"Georgia", "Times New Roman", serif',
                  }}
                >
                  {poemTitle}
                </h2>

                {/* Poem body */}
                <div
                  className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                  style={{
                    color: '#ffffff',
                    fontFamily: '"Georgia", "Times New Roman", serif',
                    textShadow: '0 1px 6px rgba(0,0,0,0.25)',
                  }}
                >
                  {poemBody}
                </div>

                {/* Footer: spotify hint + next button */}
                <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-orange-100 italic opacity-80">
                    🎵 Akad - Payung Teduh sedang mengalun~
                  </p>
                  <button
                    onClick={() => setStage('profile')}
                    className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/35 text-white font-bold text-sm border border-white/40 backdrop-blur-sm transition-all active:scale-95"
                  >
                    next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────── PROFILE STAGE ────── */}
        {stage === 'profile' && (
          <div
            className="relative z-10 max-h-[calc(100vh-4rem)] w-full max-w-[720px] overflow-y-auto rounded-2xl border-2 border-pink-200 bg-[#fde8f0] p-6 text-[#7c3a5a] shadow-2xl ring-1 ring-pink-100 sm:p-8 profile-animate"
          >
            {/* Hidden spotify still playing */}
            <HiddenSpotifyPlayer play={musicPlaying} />

            {/* Close button — stops music */}
            <button
              type="button"
              aria-label="Close member detail"
              onClick={handleClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-pink-300 bg-pink-200 hover:bg-pink-300 text-[#b06080] text-lg transition-colors z-20"
            >
              ✕
            </button>

            {/* Profile photo */}
            <div className="mb-5 overflow-hidden rounded-2xl border border-pink-200">
              <Image
                src={ProfileImage}
                alt="Profile Image"
                className="h-120 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="pr-10">
              <h2 className="text-3xl font-black text-[#f4a7c3]">Nabila Nafisatus Zuhro</h2>
              <p className="mt-1 text-sm font-semibold text-[#e8a0bc]">5027251073 - Nganjuk</p>
            </div>

            <div className="mt-5 flex gap-2">
              <Instagram username="nabilanafisa__" />
              <LinkedInButtonLink username="nabila-nafisatus-zuhro-6466aa388" />
            </div>

            <div className="mt-6 grid gap-4 text-sm font-semibold sm:grid-cols-2">
              {/* Hobi card — floating 📜 and 𝄞 */}
              <div className="relative rounded-xl border border-pink-200 bg-[#fad4e5] p-4 overflow-hidden">
                <FloatingEmoji emoji="📜" count={3} style={{ opacity: 1 }} />
                <FloatingEmoji emoji="𝄞" count={3} style={{ opacity: 1 }} />
                <div className="relative z-10">
                  <p className="text-[#c478a0] text-xs tracking-widest uppercase">Hobi</p>
                  <p className="mt-2 text-[#7c3a5a]">Bikin puisi, nggambar, dengerin lagu Yowis Ben</p>
                </div>
              </div>

              {/* Fun Fact card — floating ᶻ 𝘇 𐰁 */}
              <div className="relative rounded-xl border border-pink-200 bg-[#f9cfe2] p-4 hover:border-pink-300 hover:bg-[#f7c4db] transition-colors overflow-hidden">
                <FloatingEmoji emoji="ᶻ" count={2} />
                <FloatingEmoji emoji="𝘇" count={2} />
                <FloatingEmoji emoji="𐰁" count={2} />
                <div className="relative z-10">
                  <p className="text-[#c478a0] text-xs tracking-widest uppercase">Fun Fact</p>
                  <p className="mt-2 text-[#7c3a5a]">Suka ngelindur dari kecil</p>
                </div>
              </div>
            </div>

            {/* Lagu Favorit */}
            <div className="mt-4 rounded-xl border border-pink-200 bg-[#fad4e5] p-4 hover:border-pink-300 hover:bg-[#f7c4db] transition-colors">
              <p className="text-[#c478a0] text-xs font-bold tracking-widest uppercase">Lagu Favorit</p>
              <p className="my-2 text-sm font-semibold text-[#7c3a5a]">
                Akad - Payung Teduh, tapi sebenernya banyakk lagu fav dari Yowis Ben, Sheila On 7, Hivi, hmm lagu R&B, pop, jawa, hipdut, bollywood
              </p>
              <SpotifyEmbed spotifyUrl={SPOTIFY_EMBED_URL} />
            </div>
          </div>
        )}
      </div>
    </>,
    document.body
  )
}

export default MemberPopup
