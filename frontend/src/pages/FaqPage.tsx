import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SEO from '../components/SEO';

const FaqPage = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Hvordan bestiller jeg?',
      answer: 'Du kan bestille ved at tilføje produkter til din kurv og derefter gennemføre betalingen ved checkout. Vi accepterer alle større kreditkort og betalingsmetoder.'
    },
    {
      question: 'Hvor lang tid tager leveringen?',
      answer: 'Vi tilbyder gratis levering på 2-5 hverdage til hele Danmark. Du modtager tracking information via email når din ordre er afsendt.'
    },
    {
      question: 'Kan jeg returnere mine varer?',
      answer: 'Ja, vi har 14 dages returret på alle ordrer. Du kan returnere uåbnede varer inden for 14 dage for fuld refundering. Udvidet returret gælder kun for julegaver købt i julesæsonen.'
    },
    {
      question: 'Er mine personlige oplysninger sikre?',
      answer: 'Ja, vi bruger SSL-kryptering og følger alle GDPR-retningslinjer for at beskytte dine personlige oplysninger.'
    },
    {
      question: 'Hvordan kan jeg kontakte jer?',
      answer: 'Du kan kontakte os via vores kontaktformular, email eller live chat. Vi svarer normalt inden for 24 timer.'
    },
    {
      question: 'Tilbyder I gavekort?',
      answer: 'Ja, vi tilbyder gavekort i forskellige værdier. Kontakt os for mere information.'
    }
  ];

  return (
    <>
      <SEO 
        title="Ofte Stillede Spørgsmål - Christmas House"
        description="Find svar på ofte stillede spørgsmål om bestilling, levering, returnering og mere."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0F2922] to-[#1a4039] py-16">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
              <ChevronLeft className="w-5 h-5" />
              Tilbage
            </Link>
            <h1 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-4">Ofte Stillede Spørgsmål</h1>
            <p className="text-white/90 text-lg">Find hurtigt svar på dine spørgsmål</p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-sm border border-[#0F2922]/10 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#faf8f5] transition-colors"
                  >
                    <span className="font-['Playfair_Display'] text-xl font-semibold text-[#0F2922] pr-8">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 text-[#0F2922]/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center p-8 bg-gradient-to-br from-[#0F2922]/5 to-[#D4AF37]/5 rounded-sm border border-[#0F2922]/10">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F2922] mb-3">
                Kunne du ikke finde svar?
              </h2>
              <p className="text-[#0F2922]/70 mb-6">
                Vores kundeservice team er klar til at hjælpe dig
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

export default FaqPage;
