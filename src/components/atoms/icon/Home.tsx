import Image, { type ImageProps } from 'next/image'

import HomeIcon from '@/assets/images/icon/home.svg'

type HomeProps = Omit<ImageProps, 'src' | 'alt'> & {
  alt?: string
}

const Home = ({ alt = 'Evastra Logo', ...props }: HomeProps) => {
  return <Image src={HomeIcon} alt={alt} width={8} height={8} {...props} />
}

export default Home
