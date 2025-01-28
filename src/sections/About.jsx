import Globe from 'react-globe.gl'
import { useRef, useState } from 'react'
import Button from '../components/Button'

const About = () => {
  const globeMethods = useRef()
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('jonatandb@gmail.com')
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  const handleNavigate = () => {
    window.location.href = '#contact'
  }

  return (
    <section className='c-space my-20' id='about'>
      <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
        <div className='col-span-1 xl:row-span-3'>
          <div className='grid-container'>
            <img
              src='assets/grid1.png'
              alt='grid-1'
              className='w-full sm:h-[276px] h-fit object-contain'
            />

            <div>
              <p className='grid-headtext'>Hi, I&apos;m Alvan!</p>
              <p className='grid-subtext'>
                Dengan pengalaman 2/5 tahun, saya telah mengasah keterampilan saya dalam pengembangan frontend dan backend, dengan fokus pada situs web 3D animasi.
              </p>
            </div>
          </div>
        </div>
        <div className='xl:col-span-2 xl:row-span-3'>
          <div className='grid-container'>
            <img
              src='assets/grid3.png'
              alt='grid-3'
              className='w-full sm:h-[266px] h-fit object-contain'
            />

            <div>
              <p className='grid-headtext'>My Passion for Coding</p>
              <p className='grid-subtext'>
                Saya suka memecahkan masalah dan membangun sesuatu melalui kode. Pemrograman bukan hanya profesi saya, tetapi juga hasrat saya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
