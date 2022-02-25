import Image from 'next/image'
import { useRouter } from 'next/router'

const myLoader = ({ src, width, quality }) => {
	const router = useRouter()
  return `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3535' : router.basePath}/${src}?w=${width}&q=${quality || 75}`
}

const ImageWithLoader = (props) => {
  return (
    <Image
      loader={myLoader}
			{...props}
    />
  )
}

export default ImageWithLoader