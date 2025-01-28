import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous error messages
    setError('');
    setSuccess(false);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Nama harus diisi');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Format email tidak valid');
      return false;
    }
    
    if (form.message.trim().length < 10) {
      setError('Pesan minimal 10 karakter');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await emailjs.send(
        'service_2gfv57d', // Service ID
        'template_n44fqg7', // Template ID
        {
          from_name: `${form.name} - Portfolio Contact`,
          to_name: 'Alvan',
          from_email: form.email,
          to_email: 'hellb2254@gmail.com',
          message: form.message,
          reply_to: form.email, // Add reply-to field for better email threading
        },
        'UCKKih5IQspVduNdt' // Public Key
      );

      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setError('Gagal mengirim pesan. Silakan coba lagi nanti.');
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="assets/terminal.png"
          alt="terminal background"
          className="absolute inset-0 min-h-screen object-cover w-full"
        />
        
        <div className="contact-container relative z-10 bg-black/80 p-8 rounded-lg backdrop-blur-sm max-w-2xl w-full mx-4">
          <h3 className="head-text text-3xl font-bold mb-4">Mari Berbincang</h3>
          <p className="text-lg text-gray-300 mb-8">
            Apakah Anda ingin membangun website baru, meningkatkan platform yang ada,
            atau mewujudkan project unik, saya siap membantu Anda.
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded mb-4">
              Pesan berhasil terkirim! Kami akan menghubungi Anda secepatnya.
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6"
          >
            <label className="block">
              <span className="text-gray-200 mb-1 block">Nama Lengkap</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-blue-500 text-white"
                placeholder="Masukkan nama lengkap"
                disabled={loading}
              />
            </label>

            <label className="block">
              <span className="text-gray-200 mb-1 block">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-blue-500 text-white"
                placeholder="contoh@email.com"
                disabled={loading}
              />
            </label>

            <label className="block">
              <span className="text-gray-200 mb-1 block">Pesan</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-blue-500 text-white resize-none"
                placeholder="Tulis pesan Anda di sini..."
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                  Mengirim...
                </>
              ) : (
                <>
                  Kirim Pesan
                  <img
                    src="assets/arrow-up.png"
                    alt="arrow"
                    className="w-4 h-4 transform rotate-45"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;