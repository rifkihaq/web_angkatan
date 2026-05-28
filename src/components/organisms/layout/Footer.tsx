import Image from 'next/image'

import Ig from '@/components/atoms/icon/Ig'
import LogoIcon from '@/components/atoms/icon/LogoIcon'
import Star from '@/components/atoms/icon/Star'

import FooterImage from '@/assets/images/layout/footer.webp'
import { getTextStrokeStyle } from '@/lib/textStroke'

const Footer = () => {
  return (
    <footer className="bg-blue-cs-40 relative w-full overflow-hidden text-white">
      <Image
        src={FooterImage}
        alt="Footer"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
        height={200}
        width={400}
      />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-5 py-10 text-center sm:px-8 sm:py-12 md:gap-8 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-14 lg:text-left">
        <LogoIcon width={72} height={78} className="h-auto w-[72px] sm:w-[84px] lg:w-[100px]" />
        <div className="relative flex flex-col items-center gap-4 lg:items-end">
          <h2
            className="font-rubikone text-blue-cs-30 relative text-2xl sm:text-3xl lg:text-4xl"
            style={getTextStrokeStyle({ color: '#fffddd', width: 2 })}
          >
            A Space to Grow Together
            <Star className="absolute -top-1 -right-3 sm:-top-2 sm:-right-4" width={20} height={20} />
          </h2>
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold sm:text-base lg:justify-end">
            <a
              href="https://www.instagram.com/it2025_its/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label="Instagram IT 2025 ITS"
            >
              <Ig width={26} />
            </a>
            <span>© ITS Information Technology - est. 2025</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
