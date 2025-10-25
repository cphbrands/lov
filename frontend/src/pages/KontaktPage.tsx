import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '../hooks/use-toast';
import SEO from '../components/SEO';

const KontaktPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Besked sendt!",
      description: "Vi vender tilbage til dig inden for 24 timer.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEO 
        title="Kontakt Os - Christmas House"
        description="Kontakt Christmas House kundeservice. Vi er her for at hjælpe dig med spørgsmål om produkter, ordrer og mere."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F2922] to-[#1a4039] py-16">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" />
              Tilbage
            </Link>
            <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-4">Kontakt Os</h1>
            <p className="text-white/90 text-lg">Vi er her for at hjælpe dig</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2922] mb-6">
                  Send os en besked
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2922] mb-2">
                      Dit navn *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#0F2922]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      placeholder="Indtast dit fulde navn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F2922] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#0F2922]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                      placeholder="din@email.dk"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F2922] mb-2">
                      Emne *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#0F2922]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white"
                    >
                      <option value="">Vælg et emne</option>
                      <option value="order">Spørgsmål om ordre</option>
                      <option value="product">Produktspørgsmål</option>
                      <option value="return">Retur & bytte</option>
                      <option value="delivery">Levering</option>
                      <option value="other">Andet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F2922] mb-2">
                      Din besked *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-[#0F2922]/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white resize-none"
                      placeholder="Beskriv dit spørgsmål eller problem..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0F2922] to-[#1a4039] text-white px-8 py-4 rounded-sm hover:from-[#1a4039] hover:to-[#0F2922] transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Besked
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2922] mb-6">
                  Kontakt Information
                </h2>

                <div className="space-y-6 mb-12">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#0F2922]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F2922] mb-1">Email</h3>
                      <a href="mailto:info@christmashouse.dk" className="text-[#0F2922]/70 hover:text-[#D4AF37] transition-colors">
                        info@christmashouse.dk
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#0F2922]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F2922] mb-1">Telefon</h3>
                      <a href="tel:+4512345678" className="text-[#0F2922]/70 hover:text-[#D4AF37] transition-colors">
                        +45 12 34 56 78
                      </a>
                      <p className="text-sm text-[#0F2922]/60 mt-1">Man-Fre: 09:00 - 17:00</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#0F2922]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F2922] mb-1">Adresse</h3>
                      <p className="text-[#0F2922]/70">
                        Christmas House<br />
                        Julevejen 1<br />
                        1234 København K<br />
                        Danmark
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 p-6 rounded-sm border border-[#D4AF37]/30">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F2922] mb-3">
                    Svartid
                  </h3>
                  <p className="text-[#0F2922]/80 text-sm leading-relaxed">
                    Vi bestræber os på at svare på alle henvendelser inden for <strong>24 timer</strong> på hverdage. 
                    I travle perioder kan svartiden være lidt længere.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="mt-8 p-6 bg-white rounded-sm border border-[#0F2922]/10 shadow-md">
                  <h3 className="font-semibold text-[#0F2922] mb-4">Hurtige Links</h3>
                  <div className="space-y-3 text-sm">
                    <Link to="/faq" className="block text-[#0F2922]/70 hover:text-[#D4AF37] transition-colors">
                      → Ofte Stillede Spørgsmål
                    </Link>
                    <Link to="/levering" className="block text-[#0F2922]/70 hover:text-[#D4AF37] transition-colors">
                      → Levering Information
                    </Link>
                    <Link to="/retur" className="block text-[#0F2922]/70 hover:text-[#D4AF37] transition-colors">
                      → Retur & Bytte
                    </Link>
                    <Link to="/spor-din-ordre" className="block text-[#0F2922]/70 hover:text-[#D4AF37] transition-colors">
                      → Spor Din Ordre
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KontaktPage;
