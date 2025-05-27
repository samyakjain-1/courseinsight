'use client'

import { BookOpen, Brain, MessageCircle, Shield, Github, Mail } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold gradient-text">UW Course Insights</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-surface-600 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/departments" className="text-surface-600 hover:text-primary-600 transition-colors">
                Departments
              </Link>
              <Link href="/about" className="text-primary-600 font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">About Course Insights</span>
            </h1>
            <p className="text-xl text-surface-600 max-w-3xl mx-auto">
              Helping UW-Madison students make informed course decisions through 
              AI-powered analysis of real student experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-surface-900 mb-6">
                Our Mission
              </h2>
              <p className="text-surface-700 text-lg leading-relaxed mb-6">
                Every semester, thousands of UW-Madison students ask the same questions: 
                "How difficult is this course?" "What should I expect?" "Is this professor good?"
              </p>
              <p className="text-surface-700 text-lg leading-relaxed mb-6">
                We believe students deserve access to real, unfiltered insights from their peers. 
                That's why we created Course Insights - to aggregate and analyze the wealth of 
                student experiences shared on Reddit's r/UWMadison community.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900">AI-Powered Analysis</h3>
                  <p className="text-surface-600 text-sm">
                    Advanced language models summarize thousands of student posts
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">15,000+</div>
                  <p className="text-surface-600 text-sm">Reddit Posts Analyzed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-2">2,500+</div>
                  <p className="text-surface-600 text-sm">Courses Covered</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <p className="text-surface-600 text-sm">Accuracy Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                  <p className="text-surface-600 text-sm">Years of Data</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-surface-900 mb-6">
              How It Works
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              Our platform uses cutting-edge AI to transform scattered Reddit discussions 
              into actionable course insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Data Collection',
                description: 'We continuously monitor r/UWMadison for course-related discussions, reviews, and student experiences.',
                icon: MessageCircle,
                color: 'bg-blue-500'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Advanced language models process and analyze thousands of posts to extract key insights and sentiment.',
                icon: Brain,
                color: 'bg-purple-500'
              },
              {
                step: '03',
                title: 'Smart Summaries',
                description: 'We generate comprehensive summaries highlighting what students love, challenges they face, and overall course sentiment.',
                icon: BookOpen,
                color: 'bg-green-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-surface-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Ethics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-surface-900">
                    Privacy & Ethics
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-surface-900 mb-2">Data Sources</h3>
                    <p className="text-surface-600">
                      All data comes from publicly available Reddit posts on r/UWMadison. 
                      We respect Reddit's API terms and community guidelines.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 mb-2">Privacy Protection</h3>
                    <p className="text-surface-600">
                      No personal information is stored or displayed. All analysis focuses 
                      on course content, not individual users.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 mb-2">Accuracy Commitment</h3>
                    <p className="text-surface-600">
                      Our AI models are continuously refined to provide accurate, balanced 
                      insights that reflect the true student experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-surface-900 mb-6">
                  Data Transparency
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600">Data Source</span>
                    <span className="font-medium text-surface-900">r/UWMadison</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600">Update Frequency</span>
                    <span className="font-medium text-surface-900">Daily</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600">Analysis Model</span>
                    <span className="font-medium text-surface-900">GPT-4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-surface-600">Data Retention</span>
                    <span className="font-medium text-surface-900">Public Posts Only</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Contribute */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-surface-900 mb-6">
              Get Involved
            </h2>
            <p className="text-surface-600 mb-8 max-w-2xl mx-auto">
              Course Insights is an open-source project created by students, for students. 
              We welcome contributions and feedback from the UW-Madison community.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://github.com/uwmadison/course-insights"
                className="flex items-center justify-center space-x-3 p-6 bg-surface-900 text-white rounded-2xl hover:bg-surface-800 transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="font-medium">View on GitHub</span>
              </a>
              <a
                href="mailto:contact@courseinsights.wisc.edu"
                className="flex items-center justify-center space-x-3 p-6 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="font-medium">Contact Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-semibold">UW Course Insights</span>
          </div>
          <p className="text-surface-400 mb-4">
            Powered by Reddit data and AI-driven insights
          </p>
          <p className="text-surface-500 text-sm">
            © 2024 UW Course Insights. Data sourced from r/UWMadison
          </p>
        </div>
      </footer>
    </div>
  )
} 