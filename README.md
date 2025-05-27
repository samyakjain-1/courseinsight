# 🎓 UW-Madison Course Insights Platform

A modern, AI-powered web platform that helps UW-Madison students explore courses through real student experiences collected from Reddit.

![Course Insights Preview](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=UW+Course+Insights)

## 🌟 Features

### 🔍 Course Discovery
- **Search & Filter**: Find courses by name, code, or department
- **Department Browse**: Explore courses organized by academic departments
- **Popular Courses**: Discover trending and highly-discussed courses

### 🧠 AI-Powered Insights
- **Smart Summaries**: AI-generated course summaries from student discussions
- **Sentiment Analysis**: Understand overall student sentiment about courses
- **Key Topics**: Identify main themes and topics discussed by students

### 📊 Reddit Integration
- **Real Student Voices**: Data sourced from r/UWMadison discussions
- **Post Aggregation**: Access to original Reddit posts and comments
- **Continuous Updates**: Fresh insights from ongoing student discussions

### 🎨 Modern UI/UX
- **Clean Design**: Inspired by Google, Apple, and Netflix aesthetics
- **Responsive**: Perfect experience on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered interactions
- **Accessible**: Built with accessibility best practices

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend (Existing Python Scripts)
- **Python** - Data processing and analysis
- **Reddit API** - Data collection from r/UWMadison
- **AI/LLM** - Course summarization and analysis

### Infrastructure
- **Vercel** - Deployment and hosting
- **JSON Files** - Course and Reddit data storage

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for backend scripts)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/uw-course-insights.git
   cd uw-course-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage
│   ├── course/[courseId]/       # Course detail pages
│   ├── departments/             # Department listings
│   └── about/                   # About page
├── components/                   # Reusable React components
├── json/                        # Course and Reddit data
│   ├── madgrades_courses_detailed.json
│   ├── filtered_course_posts*.json
│   └── reddit_course_posts*.json
├── fetch/                       # Python data collection scripts
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── README.md                    # Project documentation
```

## 🎯 Key Pages

### 🏠 Homepage (`/`)
- Hero section with search functionality
- Course statistics and popular courses
- Department filter and course grid
- Modern, gradient-based design

### 📚 Course Details (`/course/[courseId]`)
- Comprehensive course information
- AI-generated summaries and insights
- Original Reddit posts and discussions
- Tabbed interface for different content types

### 🏛️ Departments (`/departments`)
- Grid of all academic departments
- Course counts and popular courses per department
- Search and filter functionality
- Department-specific navigation

### ℹ️ About (`/about`)
- Project mission and methodology
- How the AI analysis works
- Privacy and ethics information
- Contact and contribution details

## 🔗 Data Integration

### Current Data Sources
- `madgrades_courses_detailed.json` - Course metadata
- `filtered_course_posts*.json` - Processed Reddit discussions
- `reddit_course_posts*.json` - Raw Reddit data

### Integration Points
The UI is designed to work with your existing Python backend:

1. **Course Data**: Replace mock data with actual course information
2. **Reddit Posts**: Connect to your filtered Reddit post collections
3. **AI Summaries**: Integrate with your LLM-generated summaries
4. **Real-time Updates**: Add API endpoints for dynamic data loading

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main UI elements
- **Accent**: Orange/red for highlights and CTAs
- **Surface**: Gray scale for backgrounds and text
- **Semantic**: Green (success), Red (error), Yellow (warning)

### Typography
- **Font Family**: System font stack (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold, large sizes with gradient text effects
- **Body**: Clean, readable typography with proper contrast

### Components
- **Glass Effect**: Backdrop blur with subtle transparency
- **Card Hover**: Smooth scaling and shadow transitions
- **Gradient Text**: Eye-catching headers and highlights
- **Button Styles**: Primary and secondary button variants

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (automatic for Next.js)
3. Deploy with one click

### Manual Deployment
```bash
npm run build
npm start
```

## 🔮 Future Enhancements

### Data Integration
- [ ] Connect to live Reddit API
- [ ] Real-time course data updates
- [ ] User authentication and personalization
- [ ] Course comparison features

### AI Features
- [ ] Personalized course recommendations
- [ ] Difficulty prediction algorithms
- [ ] Workload estimation
- [ ] Professor sentiment analysis

### User Experience
- [ ] Saved courses and favorites
- [ ] Course planning tools
- [ ] Email notifications for new insights
- [ ] Mobile app development

## 🤝 Contributing

We welcome contributions from the UW-Madison community!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UW-Madison Community** - For sharing valuable course experiences
- **r/UWMadison** - Source of authentic student discussions
- **Open Source Community** - For the amazing tools and libraries

## 📞 Contact

- **Email**: contact@courseinsights.wisc.edu
- **GitHub**: [Course Insights Repository](https://github.com/your-username/uw-course-insights)
- **Issues**: [Report a Bug](https://github.com/your-username/uw-course-insights/issues)

---

**Built with ❤️ by UW-Madison students, for UW-Madison students** # courseinsight
