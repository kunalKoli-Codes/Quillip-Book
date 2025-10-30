import { Check } from 'lucide-react';

const physicalBooks = [
  {
    size: 'A5',
    pages: 'Up to 100',
    priceINR: '₹7,000',
    priceUSD: '$100',
    copies: '5',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    size: 'A5',
    pages: 'Up to 200',
    priceINR: '₹8,000',
    priceUSD: '$125',
    copies: '5',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    size: 'A5',
    pages: 'Up to 300',
    priceINR: '₹9,000',
    priceUSD: '$150',
    copies: '5',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    size: 'A4',
    pages: 'Up to 100',
    priceINR: '₹9,000',
    priceUSD: '$130',
    copies: '4',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    size: 'A4',
    pages: 'Up to 200',
    priceINR: '₹11,000',
    priceUSD: '$160',
    copies: '4',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    size: 'A4',
    pages: 'Up to 300',
    priceINR: '₹13,000',
    priceUSD: '$190',
    copies: '4',
    gradient: 'from-teal-500 to-cyan-600'
  }
];

const eBooks = [
  {
    pages: 'Up to 100',
    priceINR: '₹5,000',
    priceUSD: '$60',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    pages: 'Up to 200',
    priceINR: '₹6,000',
    priceUSD: '$70',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    pages: 'Up to 300',
    priceINR: '₹7,000',
    priceUSD: '$80',
    gradient: 'from-teal-500 to-cyan-600'
  }
];

const inclusions = [
  'eBook formatting',
  'Cover design',
  'ISBN registration',
  'Publication certificate',
  'DOI registration',
  'Acceptance letter'
];

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Book Publication Fee
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Competitive pricing options for both physical and digital publications, with comprehensive inclusions for every author.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Physical Book Publishing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {physicalBooks.map((book, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:border-cyan-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-block bg-gradient-to-r ${book.gradient} text-white px-4 py-1 rounded-full text-sm font-semibold mb-4`}>
                  {book.size} Size
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">{book.pages} Pages</h4>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-slate-900">{book.priceINR}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-2xl font-semibold text-slate-600">{book.priceUSD}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-slate-700">
                    <Check className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{book.copies} hard copies</span>
                  </li>
                  {inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <Check className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            eBook Publishing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {eBooks.map((ebook, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className={`inline-block bg-gradient-to-r ${ebook.gradient} text-white px-4 py-1 rounded-full text-sm font-semibold mb-4`}>
                    Digital
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">{ebook.pages} Pages</h4>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-white">{ebook.priceINR}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-2xl font-semibold text-slate-300">{ebook.priceUSD}</span>
                  </div>
                  <ul className="space-y-3">
                    {['eBook formatting', 'Cover design', 'ISBN registration', 'Publication certificate'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse"></div>
            <h4 className="text-2xl font-bold text-slate-900">Publication Time</h4>
          </div>
          <p className="text-lg text-slate-700">
            Our average publication timeframe is approximately <span className="font-bold text-cyan-600">15 days</span> from the date of manuscript submission, allowing for thorough editing, design and quality checks.
          </p>
        </div>
      </div>
    </section>
  );
}
