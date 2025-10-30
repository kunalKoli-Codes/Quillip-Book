import { Target, Headphones, Globe2, Settings, Heart } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Expertise and Experience',
    description: 'With years of experience in the publishing industry, we know what it takes to create a successful and impactful book. Our skilled team ensures top-tier editing, design and marketing solutions.'
  },
  {
    icon: Headphones,
    title: 'End-to-End Support',
    description: 'From the moment you submit your manuscript to the day your book reaches readers, we\'re with you at every stage, offering professional guidance and seamless support.'
  },
  {
    icon: Globe2,
    title: 'Global Reach',
    description: 'We have extensive distribution networks, ensuring your book or eBook is readily available in major online and offline stores, academic institutions and libraries.'
  },
  {
    icon: Settings,
    title: 'Tailored Services',
    description: 'Whether it\'s a novel, a thesis, a research compilation or a technical manual, our flexible publishing plans cater to your specific goals, genre and budget.'
  },
  {
    icon: Heart,
    title: 'Author-Centric Approach',
    description: 'We understand that your book is your passion. That\'s why we involve you in creative decisions, keeping you informed and empowered throughout the publishing process.'
  }
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Scripown Publications?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We understand that each author's aspirations and requirements are unique, and we strive to offer services that accommodate all kinds of literary works.
          </p>
        </div>

        <div className="space-y-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-x-2 border-l-4 border-transparent hover:border-cyan-500 animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
