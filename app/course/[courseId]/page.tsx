'use client'

import { useState } from 'react'
import { ArrowLeft, BookOpen, Users, Clock, TrendingUp, MessageCircle, ExternalLink, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Mock data - you'll replace this with actual data later
const mockCourseData = {
  'CS540': {
    id: 'CS540',
    title: 'Introduction to Artificial Intelligence',
    subjects: ['Computer Sciences'],
    description: 'An introduction to the theory and practice of artificial intelligence. Topics include search, knowledge representation, inference, planning, and machine learning.',
    credits: 3,
    prerequisites: ['CS300', 'MATH240'],
    summary: {
      overall: 'Students generally find CS540 challenging but rewarding. The course covers fundamental AI concepts with hands-on programming assignments. Professor enthusiasm varies, but the material is consistently engaging.',
      difficulty: 'Hard',
      workload: 'Heavy',
      sentiment: 'Positive',
      keyTopics: ['Search algorithms', 'Machine learning', 'Logic and inference', 'Planning'],
      commonComplaints: ['Heavy workload', 'Difficult exams', 'Time-consuming assignments'],
      commonPraises: ['Interesting material', 'Practical applications', 'Good preparation for advanced courses']
    },
    stats: {
      totalPosts: 156,
      averageRating: 4.2,
      enrollmentTrend: 'Increasing'
    }
  }
}

const mockRedditPosts = [
  {
    id: 1,
    title: 'CS540 with Professor Johnson - Worth Taking?',
    excerpt: 'Thinking about taking CS540 next semester. How difficult is it really? I heard the assignments are pretty time-consuming...',
    author: 'u/badger_student',
    upvotes: 23,
    comments: 15,
    date: '2 days ago',
    sentiment: 'neutral'
  },
  {
    id: 2,
    title: 'Just finished CS540 - AMA',
    excerpt: 'Finally done with AI! Happy to answer any questions about the course, assignments, or what to expect...',
    author: 'u/cs_grad_2024',
    upvotes: 67,
    comments: 34,
    date: '1 week ago',
    sentiment: 'positive'
  },
  {
    id: 3,
    title: 'CS540 Assignment 3 is killing me',
    excerpt: 'Anyone else struggling with the neural network assignment? The documentation is confusing and office hours are always packed...',
    author: 'u/stressed_junior',
    upvotes: 41,
    comments: 22,
    date: '2 weeks ago',
    sentiment: 'negative'
  }
]

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAllPosts, setShowAllPosts] = useState(false)
  
  const courseData = mockCourseData[params.courseId as keyof typeof mockCourseData]
  
  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Course Not Found</h1>
          <p className="text-surface-600 mb-4">The course {params.courseId} doesn't exist in our database.</p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const displayedPosts = showAllPosts ? mockRedditPosts : mockRedditPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2 text-surface-600 hover:text-primary-600 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                  <span className="text-lg font-semibold gradient-text">Course Details</span>
                </div>
              </div>
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <BookOpen className="h-6 w-6 text-primary-600" />
                <span className="text-lg font-bold gradient-text">UW Course Insights</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Course Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-surface-900 mb-2">
                  {courseData.id}: {courseData.title}
                </h1>
                <p className="text-surface-600 mb-4">{courseData.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-surface-600">
                  <span>Credits: {courseData.credits}</span>
                  <span>Department: {courseData.subjects[0]}</span>
                  {courseData.prerequisites.length > 0 && (
                    <span>Prerequisites: {courseData.prerequisites.join(', ')}</span>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary-700 mb-1">
                    {courseData.stats.averageRating}
                  </div>
                  <div className="text-sm text-primary-600">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <MessageCircle className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">{courseData.stats.totalPosts}</div>
                <div className="text-xs text-surface-600">Reddit Posts</div>
              </div>
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">{courseData.stats.enrollmentTrend}</div>
                <div className="text-xs text-surface-600">Popularity</div>
              </div>
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <Clock className="h-6 w-6 text-accent-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">{courseData.summary.workload}</div>
                <div className="text-xs text-surface-600">Workload</div>
              </div>
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">{courseData.summary.difficulty}</div>
                <div className="text-xs text-surface-600">Difficulty</div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex border-b border-surface-200">
              {[
                { id: 'overview', label: 'AI Summary' },
                { id: 'posts', label: 'Reddit Posts' },
                { id: 'insights', label: 'Key Insights' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                      : 'text-surface-600 hover:text-surface-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-surface-900 mb-4">
                      What Students Are Saying
                    </h3>
                    <p className="text-surface-700 leading-relaxed mb-6">
                      {courseData.summary.overall}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">
                        What Students Love
                      </h4>
                      <ul className="space-y-2">
                        {courseData.summary.commonPraises.map((praise, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-green-700">{praise}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-amber-800 mb-3">
                        Common Challenges
                      </h4>
                      <ul className="space-y-2">
                        {courseData.summary.commonComplaints.map((complaint, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-amber-700">{complaint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'posts' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-surface-900 mb-6">
                    Recent Reddit Discussions
                  </h3>
                  
                  {displayedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-surface-50 rounded-xl p-6 hover:bg-surface-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-medium text-surface-900 flex-1">
                          {post.title}
                        </h4>
                        <ExternalLink className="h-5 w-5 text-surface-400 ml-2 flex-shrink-0" />
                      </div>
                      
                      <p className="text-surface-700 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-surface-600">
                        <div className="flex items-center space-x-4">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{post.upvotes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </span>
                          <span className={`px-2 py-1 rounded-md text-xs ${
                            post.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                            post.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                            'bg-surface-200 text-surface-700'
                          }`}>
                            {post.sentiment}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {!showAllPosts && mockRedditPosts.length > 3 && (
                    <button
                      onClick={() => setShowAllPosts(true)}
                      className="w-full flex items-center justify-center space-x-2 py-4 text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span>Show More Posts</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-surface-900 mb-6">
                    Key Course Topics
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {courseData.summary.keyTopics.map((topic, index) => (
                      <div key={index} className="bg-primary-50 rounded-xl p-4">
                        <span className="text-primary-700 font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-surface-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-surface-900 mb-4">
                      Overall Sentiment Analysis
                    </h4>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`px-4 py-2 rounded-lg font-medium ${
                        courseData.summary.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                        courseData.summary.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {courseData.summary.sentiment}
                      </div>
                      <span className="text-surface-600">
                        Based on {courseData.stats.totalPosts} Reddit posts
                      </span>
                    </div>
                    <p className="text-surface-700">
                      This analysis is generated from student discussions on r/UWMadison and provides 
                      insights into the general student experience with this course.
                    </p>
                  </div>
                </motion.div>
              )}
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