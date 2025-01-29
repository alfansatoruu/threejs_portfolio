import { Canvas } from '@react-three/fiber'
import { workExperiences } from '../constants'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import CanvasLoader from '../components/CanvasLoader'
import Developer from '../components/Developer'

const Experience = () => {
  const [animationName, setAnimationName] = useState('idle')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <section className='c-space my-20'>
      <div className='w-full text-white-600'>
        <h3 className='head-text'>My Work Experience</h3>

        <div className='work-container' id='experience'>
          <div className='work-canvas relative w-full h-[510px] md:h-[610px]'>
            <Canvas
              camera={{
                position: [0, 0, 5],
                fov: isMobile ? 75 : 60,
                near: 0.1,
                far: 1000
              }}
            >
              <ambientLight intensity={7} />
              <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} />
              <directionalLight position={[0, 10, 0]} intensity={1} />
              <OrbitControls 
                enableZoom={false} 
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 4}
              />
              <Suspense fallback={<CanvasLoader />}>
                <group 
                  scale={isMobile ? 2 : 3} 
                  position={[0, -1, 0]}
                  rotation={[0, 0, 0]}
                >
                  <Developer
                     position-y={-0.7}
                    animationName={animationName}
                  />
                </group>
              </Suspense>
            </Canvas>
          </div>

          <div className='work-content'>
            <div className='sm:py-10 py-5 sm:px-5 px-2.5'>
              {workExperiences.map(
                ({ id, name, pos, icon, duration, title, animation }) => (
                  <div
                    key={id}
                    className='work-content_container group'
                    onClick={() => setAnimationName(animation.toLowerCase())}
                    onPointerOver={() => setAnimationName(animation.toLowerCase())}
                    onPointerOut={() => setAnimationName('idle')}
                  >
                    <div className='flex flex-col h-full justify-start items-center py-2'>
                      <div className='work-content_logo'>
                        <img src={icon} className='w-full h-full' alt='logo' />
                      </div>
                      <div className='work-content_bar'></div>
                    </div>

                    <div className='sm:p-5 px-2.5 py-5'>
                      <p className='font-bold text-white-800'>{name}</p>
                      <p className='text-sm mb-5'>
                        {pos} - {duration}
                      </p>
                      <p className='group-hover:text-white transition ease-in-out duration-500'>
                        {title}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience