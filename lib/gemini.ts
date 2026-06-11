import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function analyzeWithGemini(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (err: any) {
    console.error('Gemini error:', err.message)
    return 'AI analysis unavailable at the moment.'
  }
}

export async function analyzeJSON<T>(prompt: string, fallback: T): Promise<T> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(
      prompt + '\n\nRespond ONLY with valid JSON. No markdown, no explanation.'
    )
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean) as T
  } catch {
    return fallback
  }
}

export async function streamAnalysis(
  prompt: string,
  onChunk: (text: string) => void
): Promise<void> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContentStream(prompt)
    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) onChunk(text)
    }
  } catch (err: any) {
    onChunk('AI analysis unavailable.')
  }
  }
