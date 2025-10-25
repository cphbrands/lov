import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, RotateCcw, Shield, Calendar, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const ReturPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title="Retur & Reklamation - Christmas House"
        description="Information om returnering, bytte og reklamation af varer fra Christmas House."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F2922] to-[#1a4039] py-16">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" />
              Tilbage
            </Link>
            <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-4">Retur & Reklamation</h1>
            <p className="text-white/90 text-lg">Nemt og trygt at returnere dine varer</p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Return Policy Highlight */}
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 p-8 rounded-sm border border-[#D4AF37]/30 mb-16">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2922] mb-3">
                    14 Dages Returret
                  </h2>
                  <p className="text-[#0F2922]/80 leading-relaxed mb-3">
                    Vi tilbyder <strong>14 dages returret</strong> på alle ordrer. Du kan returnere uåbnede varer inden for 14 dage for fuld refundering.
                  </p>
                  <div className="bg-white/50 p-4 rounded-sm border border-[#D4AF37]/20 mt-4">
                    <p className="text-sm text-[#0F2922]/80">
                      <strong className="text-[#D4AF37]">✨ Udvidet retur for julegaver:</strong> Gælder kun for julegaver købt i julesæsonen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Steps */}
            <div className="bg-white p-8 rounded-sm border border-[#0F2922]/10 shadow-md mb-16">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F2922] mb-8">
                Sådan Returnerer Du
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F2922] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F2922] mb-2">Kontakt Os</h3>
                    <p className="text-[#0F2922]/70">
                      Send en email til vores kundeservice med dit ordrenummer og begrundelse for returnering.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F2922] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F2922] mb-2">Modtag Returlabel</h3>
                    <p className="text-[#0F2922]/70">
                      Du modtager et gratis returlabel via email inden for 24 timer.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F2922] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F2922] mb-2">Pak og Send</h3>
                    <p className="text-[#0F2922]/70">
                      Pak varen sikkert i original emballage og print returlabelen. Aflever pakken på nærmeste pakkeshop.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F2922] text-white flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F2922] mb-2">Modtag Refundering</h3>
                    <p className="text-[#0F2922]/70">
                      Når vi har modtaget og godkendt din retur, refunderer vi beløbet inden for 5-7 hverdage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Conditions */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-sm border border-[#0F2922]/10 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F2922]">
                    Betingelser
                  </h3>
                </div>
                <ul className="space-y-3 text-[#0F2922]/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>Varen skal være ubrugt og i original emballage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>Returret gælder i 14 dage fra modtagelse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>Gratis returnering på alle ordrer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>Fuld refundering ved godkendt retur</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-sm border border-[#0F2922]/10 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F2922]">
                    Reklamation
                  </h3>
                </div>
                <p className="text-[#0F2922]/80 text-sm mb-4 leading-relaxed">
                  Har du modtaget en defekt vare eller oplever problemer? Vi tilbyder 2 års reklamationsret på alle produkter.
                </p>
                <Link
                  to="/kontakt"
                  className="inline-block text-[#D4AF37] hover:text-[#0F2922] transition-colors font-medium text-sm"
                >
                  Kontakt kundeservice →
                </Link>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center bg-gradient-to-br from-[#0F2922]/5 to-[#D4AF37]/5 p-8 rounded-sm border border-[#0F2922]/10">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2922] mb-3">
                Har du spørgsmål om retur?
              </h2>
              <p className="text-[#0F2922]/70 mb-6">
                Vores kundeservice team er klar til at hjælpe
              </p>
              <Link
                to="/kontakt"
                className="inline-block bg-gradient-to-r from-[#0F2922] to-[#1a4039] text-white px-8 py-3 rounded-sm hover:from-[#1a4039] hover:to-[#0F2922] transition-all duration-300 font-medium"
              >
                Kontakt Os
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturPage;
