'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { BookOpen, Users, Award, Globe, FileText, CheckCircle, Mail, Send, BookMarked } from 'lucide-react';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
  
    if (loading)
      return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100">
          <Loader2 className="w-10 h-10 animate-spin text-pink-600" />
        </div>
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center animate-bounce-slow shadow-2xl">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Chapter Publication
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
              Empowering scholars, researchers, and professionals to share their expertise through collaborative academic publishing
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-sky-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-20 animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100 hover:shadow-blue-200/50 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Chapter Publication</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Chapter publication is an integral part of academic and professional publishing, offering scholars, researchers and professionals a platform to contribute their expertise to collaborative works. We specialize in facilitating the publication of individual chapters as part of edited books, creating opportunities for experts to share their knowledge while being part of a larger, impactful project.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mt-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <BookMarked className="w-6 h-6 text-blue-600" />
                What is Chapter Publication?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Chapter publication allows contributors to focus on a specific topic within their area of expertise, presenting in-depth research, insights, or case studies. These chapters are compiled with contributions from other experts to create comprehensive, multi-authored volumes that provide a wide-ranging perspective on a subject.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Researchers</h4>
                  <p className="text-sm text-gray-600">Looking to disseminate their findings</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-all">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-3">
                    <Award className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professionals</h4>
                  <p className="text-sm text-gray-600">Aiming to share insights or practical experiences</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-all">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-3">
                    <BookOpen className="w-6 h-6 text-sky-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Academics</h4>
                  <p className="text-sm text-gray-600">Contributing to scholarly discourse in their field</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Publish a Chapter?</h2>
            <p className="text-xl text-gray-600">Publishing a chapter in an edited book offers numerous benefits</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: 'Focused Expertise', desc: 'You can explore a niche topic in detail without the need to author a full book', color: 'blue' },
              { icon: Globe, title: 'Global Visibility', desc: 'Your work becomes part of a professionally curated volume with international reach', color: 'cyan' },
              { icon: Users, title: 'Collaborative Impact', desc: 'Contributing alongside other experts enhances the credibility and value of the book', color: 'sky' },
              { icon: Award, title: 'Academic Recognition', desc: 'Chapter contributions are widely recognized and respected in academic and professional circles', color: 'blue' },
              { icon: CheckCircle, title: 'Efficient Process', desc: 'Publishing a chapter typically involves less time commitment than a full book', color: 'cyan' },
              { icon: BookOpen, title: 'Professional Growth', desc: 'Making it a practical option for busy professionals and researchers', color: 'sky' },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-100 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

       

        <section className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Who Can Contribute?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We welcome contributions from a diverse range of professionals, researchers, academics and subject matter experts. Whether you're an established scholar or an emerging researcher, chapter publication is a valuable way to showcase your expertise.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-blue-600" />
                How to Get Involved
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Submit Your Proposal', desc: 'Share your chapter idea or abstract with us' },
                  { step: '2', title: 'Collaborate with the Editor', desc: 'Work closely with the book\'s editor to align your chapter with the overall theme' },
                  { step: '3', title: 'Finalize Your Work', desc: 'Submit your chapter for review, revisions and final approval' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 animate-slide-in-left" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        

        <section className="mb-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <Mail className="w-7 h-7" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Become an Editor of Edited Book</h2>
              </div>
              <p className="text-xl text-blue-100">
                Are you interested in publishing your own edited book as the chief editor?
              </p>
            </div>

            <div className="p-8 md:p-12 bg-white rounded-2xl shadow-lg">
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        We're excited to support you in this endeavor! If you're an assistant professor with a Ph.D., you're eligible to move forward—let us take care of the rest.
      </p>

      {/* Toggle Button */}
      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-3"
        >
          Submit Application
          <Send className="w-5 h-5" />
        </button>
      )}

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Title of the Edited Book *</label>
              <input
                id='title'
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Your Name *</label>
              <input
                id='name'
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Scope of the Edited Book *</label>
            <textarea
              id='scope'
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 resize-none"
              placeholder="Describe the scope and objectives of your edited book"
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700" htmlFor='email'>Email *</label>
              <input
                id='email'
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                placeholder="your.email@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                id='phone'
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Current Institutional Affiliation *</label>
            <input
              id='affiliation'
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              placeholder="University/Institution Name"
              value={formData.affiliation}
              onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
            />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Required Documents
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Your resume</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>A color photo</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Consent Form</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> Please send your details to <a href="mailto:info@quillip.com" className="text-blue-600 font-semibold hover:underline">info@quillip.com</a> if you're interested.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            Submit Application
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
          </div>
        </section>
      </div>
<div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 flex flex-col items-center py-12 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Subjects
      </motion.h1>

      <motion.p
        className="text-slate-600 mb-10 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Click a subject to explore its chapters 📚
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Card
              onClick={() => router.push(`/publish-chapter/${encodeURIComponent(subject)}`)}
              className="p-6 text-center cursor-pointer backdrop-blur-md bg-white/70 border border-white/40 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl"
            >
              <h3 className="text-lg md:text-xl font-semibold text-pink-700 tracking-wide">
                {subject}
              </h3>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {subjects.length === 0 && (
        <motion.p
          className="text-slate-500 text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No subjects found.
        </motion.p>
      )}
    </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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

        @keyframes slide-up-delay {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up-delay 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
      `}</style>
      
    </div>
  );
}

export default App;
