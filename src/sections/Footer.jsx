const Footer = () => {
  return (
    <footer className='c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5'>
      <div className='text-white-500 flex gap-2'>
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className='flex gap-3'>
        <a href='https://github.com/alfansatoruu' target='_blank' rel='noreferrer'>
          <div className='social-icon'>
            <img
              src='assets/github.svg'
              alt='github icon'
              className='w-1/2 h-1/2'
            />
          </div>
        </a>
        {/* <a
          href='https://twitter.com/jonatandb'
          target='_blank'
          rel='noreferrer'
        >
          <div className='social-icon'>
            <img
              src='assets/twitter.svg'
              alt='twitter icon'
              className='w-1/2 h-1/2'
            />
          </div>
        </a> */}
        {/* <a
          href='https://www.linkedin.com/in/jonatandb/'
          target='_blank'
          rel='noreferrer'
        >
          <div className='social-icon'>
            <img
              src='assets/linkedin.svg'
              alt='linkedin icon'
              className='w-1/2 h-1/2'
            />
          </div>
        </a> */}
      </div>

      <p className='text-white-500'>
        &copy; 2025 - Alvan. All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer
