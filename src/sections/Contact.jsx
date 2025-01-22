import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef()

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const [loading, setLoading] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.send(
        'service_a3a16rs',
        'template_6x8vumk',
        {
          from_name: form.name + ' (From: ThreeJS 3D Portfolio)',
          to_name: 'Jonatandb',
          from_email: form.email,
          to_email: 'jonatandb@gmail.com',
          message: form.message,
        },
        'inLQYkCaAWoFLWU9m',
      )
      alert(
        "Your message has been sent. I'll get back to you as soon as possible.",
      )
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.log(error)
      alert('Oops! Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='c-space my-20' id='contact'>
      <div className='relative min-h-screen flex items-center justify-center flex-col'>
        <img
          src='assets/terminal.png'
          alt='terminal background'
          className='absolute inset-0 min-h-screen'
        />
        <div className='contact-container'>
          <h3 className='head-text'>Let&apos;s talk</h3>
          <p className='text-lg text-white-600 mt-3'>
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I’m here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col space-y-7'
          >
            <label className='space-y-3'>
              <span className='field-label'>Full Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                required
                className='field-input'
                placeholder='John Doe'
                onChange={handleChange}
              />
            </label>

            <label className='space-y-3'>
              <span className='field-label'>Email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                required
                className='field-input'
                placeholder='JohnDoe@gmail.com'
                onChange={handleChange}
              />
            </label>

            <label className='space-y-3'>
              <span className='field-label'>Your message</span>
              <textarea
                name='message'
                value={form.message}
                required
                row='5'
                className='field-input'
                placeholder="Hi, I'm interested in your work..."
                onChange={handleChange}
              />
            </label>

            <button className='field-btn' type='submit' disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img
                src='assets/arrow-up.png'
                alt='arrow up'
                className='field-btn_arrow'
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
