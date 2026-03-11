'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/data';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { GlowingButton } from '@/components/ui/GlowingButton';

export function Contact() {
  const contactLinks = [
    {
      name: 'Email',
      value: portfolioData.social.email || 'akashtripathiak04@gmail.com',
      icon: Mail,
      href: `mailto:${portfolioData.social.email || 'akashtripathiak04@gmail.com'}`,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
    {
      name: 'LinkedIn',
      value: 'Akash Tripathi',
      icon: Linkedin,
      href: portfolioData.social.linkedin,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      name: 'GitHub',
      value: 'akashtripathi12',
      icon: Github,
      href: portfolioData.social.github,
      color: 'text-gray-300',
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/20',
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-gray-500 tracking-[0.25em] font-semibold uppercase text-xs mb-4"
          >
            What&apos;s Next?
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
          >
            Let&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_24px_rgba(167,139,250,0.4)]">
              Connect
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all group"
                >
                  <div className={`p-4 rounded-xl ${link.bg} ${link.border} border transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
                    <Icon size={24} className={link.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-1 tracking-wider uppercase">{link.name}</h3>
                    <p className="text-white font-medium">{link.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div 
              className="relative rounded-3xl p-px transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), transparent 60%, rgba(255,255,255,0.05))" }}
            >
              <div className="rounded-3xl bg-[#080404] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
                
                <form 
                  className="space-y-6" 
                  action="https://formspree.io/f/xwvrvjbo" 
                  method="POST"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      required
                      placeholder="Project Inquiry"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={5}
                      placeholder="Hi Akash, I'd like to talk about..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all resize-none"
                    />
                  </div>

                  <GlowingButton type="submit" className="w-full gap-2 text-lg">
                    Send Message
                    <Send size={18} className="ml-2" />
                  </GlowingButton>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
