'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, BookOpen, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import InteractiveBackground from './components/InteractiveBackground'

// Import course data
import coursesWithBlob from '../courses_with_blob.json'
import coursesDetailed from '../json/madgrades_courses_detailed.json'

// Type definitions
interface Course {
  id: string
  title: string
  subjects: string[]
  searchBlob: string | null
  aliases: string[]
}

// Transform the data into a usable format
const allCourses: Course[] = (coursesWithBlob as any[])
  .filter((course: any) => course.code && course.title) // Filter out courses without basic info
  .map((course: any) => ({
    id: course.code,
    title: course.title,
    subjects: course.subject || [],
    searchBlob: course.search_blob || null,
    aliases: course.aliases || []
  }))

// Extract unique departments
const departments = Array.from(new Set(allCourses.flatMap((course: Course) => course.subjects))).sort()

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    performSearch()
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchQuery('')
    setSelectedDepartment('')
    setFilteredCourses([])
    setHasSearched(false)
  }

  const performSearch = (query: string = searchInput) => {
    if (query.trim()) {
      setSearchQuery(query.trim())
      setHasSearched(true)
      
      let filtered = allCourses
      
      filtered = filtered.filter((course: Course) => 
        (course.searchBlob && course.searchBlob.toLowerCase().includes(query.toLowerCase())) ||
        (course.id && course.id.toLowerCase().includes(query.toLowerCase())) ||
        (course.title && course.title.toLowerCase().includes(query.toLowerCase()))
      )
      
      setFilteredCourses(filtered.slice(0, 100))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Interactive Background - Only show when not searching */}
      {!hasSearched && <InteractiveBackground />}
      
      {/* Navigation */}
      <nav className="glass-effect border-b border-white/20 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              onClick={handleClearSearch}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold gradient-text">UW Course Insights</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-surface-600 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/departments" className="text-surface-600 hover:text-primary-600 transition-colors">
                Departments
              </Link>
              <Link href="/about" className="text-surface-600 hover:text-primary-600 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Hidden when searching */}
      {!hasSearched && (
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Discover Smarter</span>
              </h1>
              <p className="text-xl text-surface-600 mb-8 max-w-3xl mx-auto">
                Search through 13,000+ UW-Madison courses with AI-powered insights from real student experiences on Reddit. 
                Find the perfect courses for your academic journey.
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
                            <div className="max-w-4xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search courses by name, code, or keywords..."
                    className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-300 focus:ring-0 focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSearch()
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Compact Search Bar - Shown when searching */}
      {hasSearched && (
        <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-surface-200 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
                        <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-300 focus:ring-0 focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSearch()
                    }
                  }}
                />
              </div>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Clear
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* Search Results */}
      {hasSearched && (
        <section className="py-6 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Results Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-surface-900 mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-surface-600">
                  Found {filteredCourses.length} courses
                </p>
              </div>

              {/* Results List */}
              {filteredCourses.length > 0 ? (
                <div className="space-y-4">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                    >
                      <Link href={`/course/${course.id}`}>
                        <div className="bg-white rounded-xl p-6 border border-surface-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <h3 className="text-lg font-semibold text-surface-900">
                                  {course.id}
                                </h3>
                                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium">
                                  {course.subjects && course.subjects.length > 0 ? course.subjects[0] : 'General'}
                                </span>
                              </div>
                              <p className="text-surface-700 mb-2">
                                {course.title}
                              </p>
                              {course.subjects && course.subjects.length > 1 && (
                                <p className="text-sm text-surface-500">
                                  Also offered in: {course.subjects.slice(1).join(', ')}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="h-5 w-5 text-surface-400 flex-shrink-0 ml-4" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-surface-900 mb-2">No courses found</h3>
                  <p className="text-surface-600 mb-4">
                    Try a different search term or department filter
                  </p>
                  <button
                    onClick={handleClearSearch}
                    className="btn-secondary"
                  >
                    Start New Search
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works Section - Only show when not searching */}
      {!hasSearched && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-surface-900 mb-4">
                How It Works
              </h2>
              <p className="text-surface-600 max-w-2xl mx-auto">
                Get real insights from fellow students through AI-powered analysis of Reddit discussions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Search Courses",
                  description: "Enter any course name, code, or keyword to find relevant UW-Madison courses",
                  icon: Search,
                  color: "bg-blue-500"
                },
                {
                  step: "02", 
                  title: "Read AI Insights",
                  description: "Get summaries of what students really think based on Reddit discussions",
                  icon: BookOpen,
                  color: "bg-purple-500"
                },
                {
                  step: "03",
                  title: "Make Informed Decisions",
                  description: "Choose courses with confidence knowing what to expect from real experiences",
                  icon: TrendingUp,
                  color: "bg-green-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
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
      )}

      {/* Popular Departments Preview - Only show when not searching */}
      {!hasSearched && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-surface-900 mb-4">
                Explore by Department
              </h2>
              <p className="text-surface-600 max-w-2xl mx-auto">
                Browse courses organized by academic departments and discover what students think about each program
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  name: "Computer Sciences",
                  shortName: "CS",
                  icon: "💻",
                  color: "bg-blue-500",
                  lightColor: "bg-blue-50",
                  textColor: "text-blue-700"
                },
                {
                  name: "Mathematics", 
                  shortName: "MATH",
                  icon: "🔢",
                  color: "bg-green-500",
                  lightColor: "bg-green-50",
                  textColor: "text-green-700"
                },
                {
                  name: "Economics",
                  shortName: "ECON", 
                  icon: "📊",
                  color: "bg-purple-500",
                  lightColor: "bg-purple-50",
                  textColor: "text-purple-700"
                },
                {
                  name: "Psychology",
                  shortName: "PSYCH",
                  icon: "🧠",
                  color: "bg-pink-500", 
                  lightColor: "bg-pink-50",
                  textColor: "text-pink-700"
                }
              ].map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100 card-hover cursor-pointer"
                >
                  <div className={`${dept.lightColor} p-4 rounded-xl mb-4`}>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{dept.icon}</div>
                      <div className={`px-2 py-1 rounded-lg ${dept.color} text-white text-xs font-medium`}>
                        {dept.shortName}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-surface-900 mb-2">
                    {dept.name}
                  </h3>
                  <p className={`text-sm ${dept.textColor}`}>
                    Explore courses →
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/departments"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                <span>View All Departments</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us - Only show when not searching */}
      {!hasSearched && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-surface-900 mb-6">
                  Why UW Course Insights?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 mb-2">Real Student Experiences</h3>
                      <p className="text-surface-600">Get insights from actual UW-Madison students who've taken the courses you're considering.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Search className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 mb-2">Comprehensive Search</h3>
                      <p className="text-surface-600">Search through thousands of courses with intelligent keyword matching and filtering.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 mb-2">AI-Powered Insights</h3>
                      <p className="text-surface-600">Advanced AI analyzes Reddit discussions to provide balanced, helpful course summaries.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">13,000+</div>
                  <p className="text-surface-600 mb-6">UW-Madison courses analyzed and searchable</p>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-surface-900 mb-4">Start exploring today</h4>
                    <p className="text-surface-600 text-sm mb-4">
                      Join thousands of students making informed course decisions
                    </p>
                    <div className="flex justify-center">
                      <div className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
                        Free to use
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 relative z-10">
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