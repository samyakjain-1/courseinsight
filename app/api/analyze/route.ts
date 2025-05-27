import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'gemini-2.0-flash')

export async function POST(request: NextRequest) {
  try {
    const { summary, courseCode, courseTitle } = await request.json()

    console.log('API received:', {
      summary: summary?.substring(0, 100) + '...',
      courseCode,
      courseTitle,
      summaryExists: !!summary,
      summaryLength: summary?.length
    })

    if (!summary || summary.trim() === '') {
      return NextResponse.json({ error: 'Summary is required' }, { status: 400 })
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: 'Google API key not configured' }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `You are an academic advisor helping students understand course experiences at UW-Madison. 

Based on the following Reddit discussion analysis for ${courseCode}: ${courseTitle}, please create a clear, helpful summary that directly addresses what students want to know about this course.

Original Analysis:
${summary}

Please provide a refined analysis that includes:

1. **Course Overview**: What is this course about and what should students expect?

2. **Student Experience**: What do students generally think about this course? (difficulty, workload, enjoyment)

3. **Key Insights**: What are the most important things students mention about taking this course?

4. **Recommendations**: Based on student feedback, what advice would you give to someone considering this course?

Write in a clear, conversational tone that's helpful for prospective students. Focus on actionable insights and be honest about both positive and challenging aspects. Keep it concise but comprehensive - aim for 3-4 well-structured paragraphs.

Do not mention that this is based on Reddit discussions or AI analysis - just present the insights as helpful information about the course experience.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const refinedSummary = response.text()

    return NextResponse.json({ 
      refinedSummary,
      success: true 
    })

  } catch (error) {
    console.error('Error analyzing course:', error)
    return NextResponse.json(
      { error: 'Failed to analyze course. Please try again.' },
      { status: 500 }
    )
  }
} 