'use client'

import { useState } from 'react'
import { Search, BookOpen, ArrowRight, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Mock department data - you'll replace this with actual data later
const mockDepartments = [
  {
    id: 'computer-sciences',
    name: 'Computer Sciences',
    shortName: 'CS',
    courseCount: 95,
    description: 'Study algorithms, programming, software engineering, and computational theory.',
    popularCourses: ['CS540', 'CS300', 'CS252', 'CS400'],
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: '💻'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    shortName: 'MATH',
    courseCount: 78,
    description: 'Explore pure and applied mathematics from calculus to advanced topology.',
    popularCourses: ['MATH221', 'MATH222', 'MATH340', 'MATH375'],
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-700',
    icon: '🔢'
  },
  {
    id: 'economics',
    name: 'Economics',
    shortName: 'ECON',
    courseCount: 54,
    description: 'Study microeconomics, macroeconomics, and economic policy analysis.',
    popularCourses: ['ECON101', 'ECON102', 'ECON310', 'ECON441'],
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    icon: '📊'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    shortName: 'PSYCH',
    courseCount: 67,
    description: 'Understand human behavior, cognition, and mental processes.',
    popularCourses: ['PSYCH202', 'PSYCH210', 'PSYCH324', 'PSYCH435'],
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    icon: '🧠'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'CHEM',
    courseCount: 43,
    description: 'Study molecular structures, chemical reactions, and laboratory techniques.',
    popularCourses: ['CHEM103', 'CHEM104', 'CHEM343', 'CHEM345'],
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    icon: '⚗️'
  },
  {
    id: 'biology',
    name: 'Biology',
    shortName: 'BIO',
    courseCount: 61,
    description: 'Explore life sciences from molecular biology to ecosystem ecology.',
    popularCourses: ['BIO152', 'BIO153', 'BIO251', 'BIO354'],
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    icon: '🧬'
  },
  {
    id: 'physics',
    name: 'Physics',
    shortName: 'PHYSICS',
    courseCount: 39,
    description: 'Study fundamental forces, quantum mechanics, and the nature of matter.',
    popularCourses: ['PHYSICS201', 'PHYSICS202', 'PHYSICS247', 'PHYSICS341'],
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    icon: '⚛️'
  },
  {
    id: 'engineering',
    name: 'Engineering',
    shortName: 'ENGR',
    courseCount: 124,
    description: 'Apply scientific principles to design and build solutions.',
    popularCourses: ['ECE252', 'ME240', 'CIVENGR215', 'BME301'],
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-700',
    icon: '⚙️'
  }
]

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredDepartments, setFilteredDepartments] = useState(mockDepartments)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredDepartments(mockDepartments)
    } else {
      const filtered = mockDepartments.filter(dept =>
        dept.name.toLowerCase().includes(query.toLowerCase()) ||
        dept.shortName.toLowerCase().includes(query.toLowerCase()) ||
        dept.description.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredDepartments(filtered)
    }
  }

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
              <Link href="/departments" className="text-primary-600 font-medium">
                Departments
              </Link>
              <Link href="/about" className="text-surface-600 hover:text-primary-600 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Explore Departments</span>
            </h1>
            <p className="text-xl text-surface-600 mb-8 max-w-3xl mx-auto">
              Browse courses by department and discover what students really think about each program
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white shadow-lg"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {mockDepartments.length}
              </div>
              <p className="text-surface-600">Academic Departments</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">
                {mockDepartments.reduce((sum, dept) => sum + dept.courseCount, 0)}+
              </div>
              <p className="text-surface-600">Total Courses</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockDepartments.reduce((sum, dept) => sum + dept.popularCourses.length, 0)}
              </div>
              <p className="text-surface-600">Popular Courses</p>
            </div>
          </motion.div>

          {/* Departments Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDepartments.map((department, index) => (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-surface-100"
              >
                {/* Department Header */}
                <div className={`${department.lightColor} p-6 border-b border-surface-100`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{department.icon}</div>
                    <div className={`px-3 py-1 rounded-lg ${department.color} text-white text-sm font-medium`}>
                      {department.shortName}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 mb-2">
                    {department.name}
                  </h3>
                  <p className="text-surface-600 text-sm line-clamp-2">
                    {department.description}
                  </p>
                </div>

                {/* Department Stats */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-surface-500" />
                      <span className="text-surface-600 text-sm">
                        {department.courseCount} courses
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-surface-600 text-sm">Popular</span>
                    </div>
                  </div>

                  {/* Popular Courses */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-surface-700 mb-3">
                      Popular Courses
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {department.popularCourses.map((course, courseIndex) => (
                        <Link
                          key={courseIndex}
                          href={`/course/${course}`}
                          className="block"
                        >
                          <div className="px-3 py-2 bg-surface-50 rounded-lg text-center hover:bg-surface-100 transition-colors cursor-pointer">
                            <span className="text-sm font-medium text-surface-700">
                              {course}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* View All Button */}
                  <Link
                    href={`/departments/${department.id}`}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-surface-100 hover:bg-surface-200 rounded-xl transition-colors group"
                  >
                    <span className="text-surface-700 font-medium">
                      View All Courses
                    </span>
                    <ArrowRight className="h-4 w-4 text-surface-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredDepartments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <BookOpen className="h-16 w-16 text-surface-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-surface-900 mb-2">
                No departments found
              </h3>
              <p className="text-surface-600">
                Try adjusting your search query or browse all departments
              </p>
              <button
                onClick={() => handleSearch('')}
                className="mt-4 btn-secondary"
              >
                Show All Departments
              </button>
            </motion.div>
          )}
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