import { FileUp, CheckCircle, Palette, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: FileUp,
    title: 'Submit Your Manuscript',
    description: 'Send us your draft for an initial evaluation. Our team will provide feedback and discuss potential publishing pathways.',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: CheckCircle,
    title: 'Choose Your Publishing Plan',
    description: 'Select from our range of comprehensive packages or request a customized plan to suit your specific goals.',
    gradient: 'from-blue-500 to-teal-600'
  },
  {
    icon: Palette,
    title: 'Finalize Editing & Design',
    description: 'Work closely with our editors and designers to refine your content and create an appealing cover and interior layout.',
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    icon: Rocket,
    title: 'Publish & Distribute',
    description: 'After final approval, we\'ll publish your book and make it available worldwide via various online and offline channels.',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Promote Your Book',
    description: 'Leverage our marketing expertise to reach your target audience through social media campaigns, press releases and more.',
    gradient: 'from-blue-500 to-teal-600'
  }
];

export default function Process() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How to Get Started?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We've streamlined our publishing process so you can focus on what matters most—writing!
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-teal-500 transform -translate-x-1/2"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative mb-12 animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`md:flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200">
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`bg-gradient-to-br ${step.gradient} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className={`inline-block bg-gradient-to-r ${step.gradient} text-white px-4 py-1 rounded-full text-sm font-bold`}>
                          Step {index + 1}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>

                <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-4 h-4 bg-gradient-to-br ${step.gradient} rounded-full border-4 border-white shadow-lg`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
