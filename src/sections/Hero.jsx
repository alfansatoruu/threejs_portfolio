import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import HackerRoom from '../components/HackerRoom'
import { Suspense } from 'react'
import CanvasLoader from '../components/CanvasLoader'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants'
import Target from '../components/Target'
import ReactLogo from '../components/ReactLogo'
// import Cube from '../components/Cube'
// import Rings from '../components/Rings'
import HeroCamera from '../components/HeroCamera'
import Button from '../components/Button'
// import { Leva, useControls } from 'leva'
import './kumpulan-data-email.css';


const Hero = () => {
  // const controls = useControls('HackerRoom', {
  //   scale: {
  //     value: 1,
  //     min: 0,
  //     max: 10,
  //   },
  //   rotationX: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationY: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationZ: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionX: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionY: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionZ: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  // })
  const isSmall = useMediaQuery({ maxWidth: 440 })
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1440 })

  const sizes = calculateSizes(isSmall, isMobile, isTablet)
  return (
    <section className='relative min-h-screen w-full flex flex-col'>
      {/* Background with responsive sizing */}
      <div className="background absolute inset-0 z-0">
        <img 
          src="/assets/bg-pertama.jpg" 
          alt="background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header text with responsive margins and font sizes */}
      <div className='relative z-10 w-full mx-auto flex flex-col gap-3
        mt-20 sm:mt-28 md:mt-32 lg:mt-36'>
        <p className='text-center font-generalsans text-white
          text-xl sm:text-2xl md:text-3xl font-medium'>
          Hi, I&apos;m Alvan <span className='waving-hand'>👋🏻</span>
        </p>
      </div>

      {/* 3D Canvas with responsive positioning */}
      <div className='absolute inset-0 w-full h-full
        sm:h-[calc(100%-100px)] md:h-[calc(100%-120px)]'>
        <Canvas className='w-full h-full'>
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera 
              makeDefault 
              position={[0, 0, isSmall ? 25 : isMobile ? 22 : 20]} 
            />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                position={sizes.deskPosition}
                rotation={[0, -Math.PI, 0]}
                scale={sizes.deskScale}
              />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
            </group>

            <ambientLight intensity={isMobile ? 1.2 : 1} />
            <directionalLight 
              position={[3, 3, 3]} 
              intensity={isMobile ? 0.6 : 0.5} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Button with responsive positioning and width */}
      <div className='absolute z-10 bottom-7 left-0 right-0 
        px-4 sm:px-0 w-full flex justify-center'>
        <a href='#contact' className='w-full sm:w-auto'>
          <Button
            name="Let's work together"
            isBeam
            containerClass='w-full sm:w-auto sm:min-w-[384px] md:min-w-96'
          />
        </a>
      </div>
    </section>
  )
}

export default Hero