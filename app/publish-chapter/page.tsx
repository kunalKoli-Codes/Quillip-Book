'use client';
import { useState } from 'react';
import {
  BookOpen,
  Users,
  Award,
  Globe,
  FileText,
  CheckCircle,
  Mail,
  Send,
  BookMarked,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
function App() {
  const [submitting, setSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    scope: '',
    name: '',
    email: '',
    phone: '',
    affiliation: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('publish_book').insert([{
        title: formData.title,
        scope: formData.scope,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        affiliation: formData.affiliation,
        status: 'new',
      }]);

      if (error) throw error;

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        title: '',
        scope: '',
        name: '',
        email: '',
        phone: '',
        affiliation: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };
const [subjects, setSubjects] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      fetchSubjects();
    }, []);
  
    const fetchSubjects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('book_chapter').select('subject');
  
      if (!error && data) {
        const uniqueSubjects = Array.from(new Set(data.map((item) => item.subject)));
        setSubjects(uniqueSubjects);
      }
      setLoading(false);
    };

  return (
    <div className="min-h-screen bg-white">
      <header className="h-[50vh] min-h-[500px] relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10"></div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm font-medium">Professional Academic Publishing</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
            Publish Your
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-gradient">
              Research Chapter
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-blue-50 max-w-2xl mb-8 animate-fade-in-up-delay leading-relaxed">
            Join scholars worldwide in sharing expertise through collaborative academic publishing
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
            <button
              onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Browse Subjects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-500/20 backdrop-blur-md text-white rounded-full font-semibold border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              Become an Editor
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
          </svg>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-6 -mt-32 relative z-10 mb-16">
            {[
              { icon: Target, title: 'Focused Research', desc: 'Share your niche expertise', color: 'blue' },
              { icon: TrendingUp, title: 'Global Reach', desc: 'International visibility', color: 'cyan' },
              { icon: Clock, title: 'Fast Process', desc: 'Quick publication timeline', color: 'indigo' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-500 to-blue-600' : item.color === 'cyan' ? 'from-cyan-500 to-cyan-600' : 'from-indigo-500 to-indigo-600'} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <BookMarked className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-semibold">What is Chapter Publication?</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Contribute Your Expertise to Scholarly Volumes
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Chapter publication allows you to present in-depth research on a specific topic within your area of expertise. Your work joins contributions from other experts to create comprehensive, multi-authored volumes.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Users, text: 'Researchers sharing findings' },
                  { icon: Award, text: 'Professionals sharing insights' },
                  { icon: BookOpen, text: 'Academics contributing to discourse' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
                <img
                  src="https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Academic Books"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Publish With Us?</h2>
              <p className="text-xl text-gray-600">Benefits of chapter publication</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FileText, title: 'Focused Expertise', desc: 'Explore niche topics in detail without authoring a full book', gradient: 'from-blue-500 to-blue-600' },
                { icon: Globe, title: 'Global Visibility', desc: 'Your work reaches international audiences with professional curation', gradient: 'from-cyan-500 to-cyan-600' },
                { icon: Users, title: 'Collaborative Impact', desc: 'Contributing alongside experts enhances credibility and value', gradient: 'from-indigo-500 to-indigo-600' },
                { icon: Award, title: 'Academic Recognition', desc: 'Widely recognized and respected in academic circles', gradient: 'from-blue-500 to-cyan-500' },
                { icon: CheckCircle, title: 'Efficient Process', desc: 'Less time commitment than publishing a full book', gradient: 'from-cyan-500 to-indigo-500' },
                { icon: TrendingUp, title: 'Professional Growth', desc: 'Practical option for busy professionals and researchers', gradient: 'from-indigo-500 to-blue-500' }
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-20">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">How to Get Started</h2>
                <p className="text-gray-600">Simple three-step process</p>
              </div>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Submit Your Proposal', desc: 'Share your chapter idea or abstract with our team' },
                  { step: '02', title: 'Collaborate with Editor', desc: 'Work with the book editor to align with overall theme' },
                  { step: '03', title: 'Finalize & Publish', desc: 'Submit for review, revisions, and final approval' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-slide-in-left" style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section id="contact" className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Editorial Opportunity</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Become an Editor</h2>
                  <p className="text-blue-50 text-lg">Interested in publishing your own edited book as chief editor?</p>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-blue-100">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Eligibility:</strong> Assistant professors with Ph.D. are welcome to apply. We'll handle the rest of the process professionally.
                    </p>
                  </div>

                  {!isFormOpen ? (
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <span>Start Your Application</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Book Title *</label>
                          <input
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            placeholder="Enter book title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                          <input
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            placeholder="Dr. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Book Scope *</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                          placeholder="Describe the scope and objectives"
                          value={formData.scope}
                          onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            placeholder="email@university.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                          <input
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Institution *</label>
                        <input
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          placeholder="University/Institution Name"
                          value={formData.affiliation}
                          onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                        />
                      </div>

                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          Required Documents
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700 mb-4">
                          {['Your resume/CV', 'A color photograph', 'Signed consent form'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-600">
                          Send documents to <a href="mailto:info@quillip.com" className="text-blue-600 font-semibold hover:underline">info@quillip.com</a>
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? 'Submitting...' : 'Submit Application'}
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section id="subjects" className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-semibold">Available Subjects</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Research Areas</h2>
              <p className="text-xl text-gray-600">Click a subject to view available chapters</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, i, index) => (
                <button
                onClick={() => router.push(`/publish-chapter/${encodeURIComponent(subject)}`)}
                  key={subject}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-left animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{subject}</h3>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span className="text-sm" >Explore chapters</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </section>
      </main>

      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up-delay-2 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up-delay 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up-delay-2 0.8s ease-out 0.4s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
