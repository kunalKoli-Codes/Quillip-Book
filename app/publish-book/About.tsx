export default function About() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Publish with Quillip Publications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
          <p className="animate-slide-in-left">
           We believe every author deserves the chance to share their ideas and creativity with the world. We provide complete book publishing solutions for writers, academicians and researchers covering everything from editing and formatting to design, ISBN and global distribution.
          </p>

          <p className="animate-slide-in-right animation-delay-200">
            Whether you’re publishing your first book or expanding your academic work, our team ensures a smooth and professional publishing experience. We focus on quality, transparency and personal support at every step, turning your manuscript into a book that truly represents your vision.
          </p>
        </div>
      </div>
    </section>
  );
}
