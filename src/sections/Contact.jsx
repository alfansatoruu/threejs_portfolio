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
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Cek apakah semua field terisi
    if (!form.name || !form.email || !form.message) {
      setError('Semua field harus diisi');
      setLoading(false);
      return;
    }

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      current_date: new Date().toLocaleString() // Tambahkan ini jika ingin timestamp
  };

    try {
      const result = await emailjs.send(
        'service_2gfv57d',     // Service ID dari EmailJS
        'template_n44fqg7',    // Template ID dari EmailJS
        templateParams,        // Parameter sesuai template baru
        'UCKKih5IQspVduNdt'   // Public Key dari EmailJS
      );

      if (result.status === 200) {
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        alert('Pesan berhasil terkirim!');
      }

    } catch (error) {
      console.error('EmailJS Error:', error);
      setError(
        error.text || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
      );
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
          <h3 className="head-text text-3xl font-bold mb-4 text-white">Mari Berbincang</h3>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded mb-4">
              Pesan berhasil terkirim!
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <label className="block">
              <span className="text-gray-200 mb-1 block">Nama</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded focus:outline-none focus:border-blue-500 text-white"
                placeholder="Masukkan nama Anda"
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