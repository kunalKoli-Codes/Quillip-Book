export default function About() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Scripown Publications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
          <p className="animate-slide-in-left">
            We believe that every author deserves the opportunity to share their voice and ideas with the world—free from limitations or bureaucratic hurdles. We take immense pride in offering a complete spectrum of professional book publishing services, carefully designed to meet the unique needs of authors, academicians, researchers and professionals from a wide range of fields.
          </p>

          <p className="animate-slide-in-right animation-delay-200">
            Whether you are an aspiring writer looking to publish your first work or an experienced author aiming to elevate your publication quality, our dedicated team is committed to ensuring your journey from manuscript to a professionally published book is both seamless and rewarding. By leveraging a blend of industry expertise, cutting-edge technology and an author-centric approach, we help you produce high-quality works that reflect your vision while also meeting global publishing standards.
          </p>

          <p className="animate-slide-in-left animation-delay-400">
            We understand that publishing a book is more than just printing; it's about sharing your vision, insights and creativity with the world. That's why we focus on building a lasting partnership with our authors, providing personalized guidance and support at every step of the publishing process—from rigorous editing and stunning design to strategic marketing and wide-ranging distribution. With us, your manuscript is not just another project; it is our shared mission to make your work shine on the global stage.
          </p>
        </div>
      </div>
    </section>
  );
}
