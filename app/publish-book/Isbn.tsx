import { BookMarked, Globe, Library, Award } from 'lucide-react';

const benefits = [
  {
    icon: Globe,
    title: 'Global Recognition',
    description: 'Your book becomes easily identifiable, allowing readers, libraries, and retailers to find it effortlessly across the world.',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Library,
    title: 'Easy Distribution',
    description: 'An ISBN is essential for listing your book on major platforms, online stores, and library networks—expanding your reach and accessibility.',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    icon: Award,
    title: 'Professional Value',
    description: 'It adds credibility to your work, showing that your book meets publishing standards and is officially recognized in the literary marketplace.',
    gradient: 'from-teal-500 to-cyan-600'
  }
];

export default function ISBN() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
            <BookMarked className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-semibold">Industry Standard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What is an ISBN?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-12 animate-slide-in-up">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            An <span className="font-bold text-cyan-400">International Standard Book Number (ISBN)</span> is a unique identification number assigned to each published book. It helps distinguish your book in the global publishing world, making it easier to track, list, and sell through bookstores, libraries and online platforms.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            Having an ISBN gives your book official recognition and ensures it can be easily discovered by readers and distributors worldwide.
          </p>
        </div>

        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Why is an ISBN Important?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-br ${benefit.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8 animate-fade-in">
          <p className="text-lg text-slate-300 leading-relaxed text-center">
            At <span className="font-bold text-cyan-400">Scripown Publications</span>, we ensure every book we publish is equipped with its own ISBN for individual recognition, helping your work stand out in a crowded marketplace.
          </p>
        </div>
      </div>
    </section>
  );
}
