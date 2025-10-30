import { FileText, Edit3, Palette, Shield, BookOpen, Globe, TrendingUp, DollarSign } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'Manuscript Assessment',
    description: 'We begin by reviewing your manuscript, offering constructive feedback and advising on improvements to ensure it\'s polished and publication-ready.',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Edit3,
    title: 'Book Editing & Proofreading',
    description: 'Our expert editors refine your manuscript, ensuring it is clear, concise and error-free. This includes copyediting for stylistic consistency and thorough proofreading to eliminate errors.',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    icon: Palette,
    title: 'Book Design & Layout',
    description: 'We craft attractive, marketable book designs, including custom covers and interior layouts that enhance readability and aesthetics.',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    icon: Shield,
    title: 'ISBN & Copyright Registration',
    description: 'We handle legalities to ensure your work is officially recognized and protected. This includes acquiring ISBNs and securing copyright protection under international guidelines.',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: BookOpen,
    title: 'Print & Digital Publishing',
    description: 'Flexible formats, including paperback and eBook production, allow you to reach readers who prefer print editions or digital downloads.',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    icon: Globe,
    title: 'Global Distribution',
    description: 'Your book is distributed through major platforms, bookstores and libraries worldwide, ensuring maximum visibility and accessibility.',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    icon: TrendingUp,
    title: 'Marketing & Promotion Support',
    description: 'We provide tailored strategies such as online advertising, social media campaigns and press releases to help your book achieve a strong market presence.',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: DollarSign,
    title: 'Author Royalties',
    description: 'Enjoy competitive royalty rates and transparent financial terms, allowing you to benefit directly from the success of your published work.',
    gradient: 'from-blue-500 to-teal-600'
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Publishing Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our comprehensive suite of services ensures that each phase of your publishing journey is managed with expertise and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${service.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
