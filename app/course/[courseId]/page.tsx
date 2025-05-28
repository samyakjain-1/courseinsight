'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, BookOpen, Users, Clock, TrendingUp, MessageCircle, ExternalLink, ChevronDown, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Course interface matching our data structure
interface Course {
  code: string
  title: string
  subject: string[]
  search_blob?: string
  aliases?: string[]
}

interface CourseSummary {
  summary: string
  source_urls: string[]
}

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAllUrls, setShowAllUrls] = useState(false)
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [courseSummary, setCourseSummary] = useState<CourseSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [refinedSummary, setRefinedSummary] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        // Load course data
        const coursesResponse = await fetch('/courses_with_blob.json')
        const coursesData = await coursesResponse.json()
        
        // Find the course by code
        const course = coursesData.find((c: Course) => c.code === params.courseId)
        
        if (course) {
          setCourseData(course)
          
          // Load course summaries from multiple files
          try {
            const summaryFiles = [
              '/summarize/course_summaries_1.json',
              '/summarize/course_summaries_2.json',
              '/summarize/course_summaries_3.json',
              '/summarize/course_summaries_4.json',
              '/summarize/course_summaries_5.json'
            ]
            
            let foundSummary = null
            
            // Try to find the course summary in any of the files
            for (const file of summaryFiles) {
              try {
                const summariesResponse = await fetch(file)
            const summariesData = await summariesResponse.json()
            
            if (summariesData[params.courseId]) {
                  foundSummary = summariesData[params.courseId]
                  console.log(`Found summary for ${params.courseId} in ${file}`)
                  break
                }
              } catch (error) {
                console.log(`Could not load ${file}:`, error)
              }
            }
            
            if (foundSummary) {
              setCourseSummary(foundSummary)
            }
          } catch (error) {
            console.log('Course summaries not available:', error)
          }
        }
      } catch (error) {
        console.error('Error loading course data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCourseData()
  }, [params.courseId])

  const handleStartAnalysis = async () => {
    if (!courseSummary) return
    
    console.log('Starting analysis with:', {
      summary: courseSummary.summary,
      courseCode: courseData?.code,
      courseTitle: courseData?.title,
      summaryLength: courseSummary.summary?.length
    })
    
    setAnalyzing(true)
    setAnalysisError(null)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: courseSummary.summary,
          courseCode: courseData?.code,
          courseTitle: courseData?.title
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setRefinedSummary(data.refinedSummary)
      } else {
        setAnalysisError(data.error || 'Analysis failed')
      }
    } catch (error) {
      console.error('Error starting analysis:', error)
      setAnalysisError('Failed to start analysis. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-surface-600">Loading course information...</p>
        </div>
      </div>
    )
  }
  
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

  const displayedUrls = showAllUrls ? courseSummary?.source_urls || [] : (courseSummary?.source_urls || []).slice(0, 5)

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
                  {courseData.code}: {courseData.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {courseData.subject.map((subject: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
                {courseData.aliases && courseData.aliases.length > 0 && (
                  <div className="text-sm text-surface-600 mb-4">
                    <span className="font-medium">Also known as:</span> {courseData.aliases.join(', ')}
                  </div>
                )}
              </div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <div className="bg-primary-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary-700 mb-1">
                    {courseSummary ? '📊' : '❓'}
                  </div>
                  <div className="text-sm text-primary-600">
                    {courseSummary ? 'Analysis Available' : 'No Analysis Yet'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <MessageCircle className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">
                  {courseSummary ? courseSummary.source_urls.length : 0}
                </div>
                <div className="text-xs text-surface-600">Reddit Posts</div>
              </div>
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">
                  {courseSummary ? 'Analyzed' : 'Pending'}
                </div>
                <div className="text-xs text-surface-600">Data Status</div>
              </div>
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <Clock className="h-6 w-6 text-accent-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">
                  {courseSummary ? 'AI-Generated' : 'N/A'}
                </div>
                <div className="text-xs text-surface-600">Summary Type</div>
              </div>
              <div className="text-center p-3 bg-surface-50 rounded-xl">
                <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-surface-900">Community</div>
                <div className="text-xs text-surface-600">Source</div>
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
                { id: 'sources', label: 'Reddit Sources' },
                { id: 'insights', label: 'Course Info' }
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
                  {courseSummary ? (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-surface-900">
                            Student Experience Analysis
                          </h3>
                          {!refinedSummary && (
                            <button
                              onClick={handleStartAnalysis}
                              disabled={analyzing}
                              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {analyzing ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  <span>Analyzing...</span>
                                </>
                              ) : (
                                <>
                                  <TrendingUp className="h-4 w-4" />
                                  <span>Start AI Analysis</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {analysisError && (
                          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                            <div className="flex">
                              <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-red-800 font-medium">Analysis Error</p>
                                <p className="text-red-700 text-sm">{analysisError}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {refinedSummary ? (
                          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                            <div className="flex items-start">
                              <TrendingUp className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                              <div>
                                <p className="text-green-800 font-medium mb-2">
                                  Enhanced Student Insights
                                </p>
                                <p className="text-green-700 text-sm">
                                  AI-refined analysis based on {courseSummary.source_urls.length} student discussions
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                            <div className="flex items-start">
                              <BookOpen className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                              <div>
                                <p className="text-blue-800 font-medium mb-2">
                                  Raw Discussion Analysis
                                </p>
                                <p className="text-blue-700 text-sm">
                                  Based on {courseSummary.source_urls.length} Reddit posts from r/UWMadison
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="prose max-w-none">
                          <div className="text-surface-700 leading-relaxed whitespace-pre-line">
                            {refinedSummary || courseSummary.summary}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <AlertCircle className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-surface-900 mb-2">
                        No Analysis Available Yet
                      </h3>
                      <p className="text-surface-600 mb-4">
                        We haven't analyzed Reddit discussions for {courseData.code} yet.
                      </p>
                      <p className="text-surface-500 text-sm">
                        Check back later as we continue to process course discussions!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'sources' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-surface-900 mb-6">
                    Reddit Discussion Sources
                  </h3>
                  
                  {courseSummary && courseSummary.source_urls.length > 0 ? (
                    <>
                      {displayedUrls.map((url, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-surface-50 rounded-xl p-6 hover:bg-surface-100 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-surface-900 mb-2">
                                Reddit Discussion #{index + 1}
                              </h4>
                              <p className="text-surface-600 text-sm mb-3">
                                r/UWMadison • Source for AI analysis
                              </p>
                              <a 
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                View Original Post
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {!showAllUrls && courseSummary.source_urls.length > 5 && (
                        <button
                          onClick={() => setShowAllUrls(true)}
                          className="w-full flex items-center justify-center space-x-2 py-4 text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          <span>Show {courseSummary.source_urls.length - 5} More Sources</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-surface-900 mb-2">
                        No Reddit Sources Available
                      </h3>
                      <p className="text-surface-600">
                        We haven't found Reddit discussions for {courseData.code} yet.
                      </p>
                    </div>
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
                    Course Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-primary-800 mb-3">
                        Course Details
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-primary-700">
                            <strong>Course Code:</strong> {courseData.code}
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-primary-700">
                            <strong>Title:</strong> {courseData.title}
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-primary-700">
                            <strong>Departments:</strong> {courseData.subject.join(', ')}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">
                        Data Insights
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-green-700">
                            Reddit Posts Analyzed: {courseSummary?.source_urls.length || 0}
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-green-700">
                            Analysis Status: {courseSummary ? 'Complete' : 'Pending'}
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-green-700">
                            Data Source: r/UWMadison Community
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-surface-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-surface-900 mb-4">
                      About This Analysis
                    </h4>
                    <p className="text-surface-700 mb-4">
                      Our AI analysis is generated from authentic student discussions on the r/UWMadison subreddit. 
                      This provides real insights into student experiences, challenges, and recommendations for this course.
                    </p>
                    <p className="text-surface-600 text-sm">
                      {courseSummary 
                        ? `Last updated: Based on ${courseSummary.source_urls.length} Reddit discussions`
                        : 'This course analysis is not yet available. We are continuously processing new discussions.'
                      }
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