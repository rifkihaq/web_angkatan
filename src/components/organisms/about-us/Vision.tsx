import Image from 'next/image'

import Star from '@/components/atoms/icon/Star'
import cloudIcon from '@/assets/images/icon/cloud.svg'

const Vision = () => {
  return (
    <section className="text-center py-16 px-4 relative w-full flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-rubikone text-white mb-8 z-10 relative">
        Our Vision
      </h2>
      
      <p className="max-w-4xl mx-auto text-white text-base md:text-xl leading-relaxed z-10 relative">
        Mewujudkan Teknologi Informasi ITS angkatan 2025 sebagai{' '}
        <span className="text-yellow-cs-20 font-bold">ruang</span> untuk{' '}
        <span className="text-yellow-cs-20 font-bold">berkembang bersama</span> melalui{' '}
        <span className="text-yellow-cs-20 font-bold">kolaborasi</span> serta penguatan{' '}
        <span className="text-yellow-cs-20 font-bold">karakter</span> dan{' '}
        <span className="text-yellow-cs-20 font-bold">kompetensi</span> guna memberikan{' '}
        <span className="text-yellow-cs-20 font-bold">dampak positif</span>
      </p>

      {/* Cloud & Star Decoration Positioned between Vision and Mission */}
      <div className="absolute -bottom-[30%] right-0 translate-x-[15%] md:translate-x-[0%] pointer-events-none z-0">
        <div className="relative">
          <Image 
            src={cloudIcon} 
            alt="Cloud decoration" 
            width={400} 
            height={150} 
            className="w-[280px] md:w-[400px] h-auto object-contain opacity-90"
          />
          <div className="absolute right-[10%] top-[5%] transform -translate-y-1/2">
            <Star className="w-12 h-12 md:w-20 md:h-20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Vision
