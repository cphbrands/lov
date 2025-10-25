import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Package, Truck, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const LeveringPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title="Levering & Forsendelse - Christmas House"
        description="Information om levering, forsendelse og leveringstider for Christmas House."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F2922] to-[#1a4039] py-16">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" />
              Tilbage
            </Link>
            <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-4">Levering & Forsendelse</h1>
            <p className="text-white/90 text-lg">Hurtig og sikker levering til hele Danmark</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Delivery Options */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-8 rounded-sm border border-[#0F2922]/10 shadow-md">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-[#0F2922]" />
                </div>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2922] mb-4">
                  Gratis Levering
                </h2>
                <p className="text-[#0F2922]/80 mb-4 leading-relaxed">
                  Vi tilbyder gratis levering på alle ordrer til hele Danmark. Leveringstid er 2-5 hverdage fra ordreafgivelse.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF37] font-medium">
                  <Clock className="w-5 h-5" />
                  <span>2-5 hverdage</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-sm border border-[#0F2922]/10 shadow-md">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F2922]/10 to-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-[#0F2922]" />
                </div>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2922] mb-4">
                  Leveringsmetoder
                </h2>
                <ul className="space-y-3 text-[#0F2922]/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>Levering til pakkeshop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>Levering til hjemmeadresse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>Tracking på alle forsendelser</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white p-8 rounded-sm border border-[#0F2922]/10 shadow-md mb-16">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2922] mb-8 text-center">
                Sådan fungerer det
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-[#0F2922] mb-2">Bestil</h3>
                  <p className="text-sm text-[#0F2922]/70">Gennemfør din ordre online</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-[#0F2922] mb-2">Pakkes</h3>
                  <p className="text-sm text-[#0F2922]/70">Vi pakker med omhu</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-[#0F2922] mb-2">Sendes</h3>
                  <p className="text-sm text-[#0F2922]/70">Tracking info via email</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    4
                  </div>
                  <h3 className="font-semibold text-[#0F2922] mb-2">Modtag</h3>
                  <p className="text-sm text-[#0F2922]/70">På din valgte adresse</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-[#0F2922]/5 to-[#D4AF37]/5 p-8 rounded-sm border border-[#0F2922]/10">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2922] mb-6">
                Vigtig Information
              </h2>
              <ul className="space-y-4 text-[#0F2922]/80">
                <li className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>Du modtager en ordrebekræftelse via email umiddelbart efter køb</span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>Tracking information sendes når din pakke er afsendt</span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>Ved forsinkelser kontakter vi dig proaktivt</span>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>Alle pakker er forsikret under transport</span>
                </li>
              </ul>
            </div>

            {/* Track Order CTA */}
            <div className="text-center mt-12">
              <Link
                to="/spor-din-ordre"
                className="inline-block bg-gradient-to-r from-[#0F2922] to-[#1a4039] text-white px-8 py-3 rounded-sm hover:from-[#1a4039] hover:to-[#0F2922] transition-all duration-300 font-medium"
              >
                Spor Din Ordre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeveringPage;
