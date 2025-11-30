import { useState } from 'react'
import './App.css'

function App() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    // Clear previous errors
    setError('')

    // Validation
    if (!resumeText.trim()) {
      setError('Please enter your resume text')
      return
    }

    if (!jobDescription.trim()) {
      setError('Please enter the job description')
      return
    }

    // Simulate analysis (replace with actual API call later)
    setIsAnalyzing(true)
    console.log('Analyzing resume...')
    console.log('Resume:', resumeText)
    console.log('Job Description:', jobDescription)

    // Simulate API delay
    setTimeout(() => {
      setIsAnalyzing(false)
      console.log('Analysis complete!')
      // TODO: Display results
    }, 2000)
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value)
    if (error) setError('') // Clear error when user starts typing
  }

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value)
    if (error) setError('') // Clear error when user starts typing
  }

  return (
    <div className="app-container">
      <div className="textareas-container">
        <div className="resume-textarea">
          <label htmlFor="resume-input">
            <span className="label-text">Resume</span>
            <span className="char-count">{resumeText.length} characters</span>
          </label>
          <textarea
            id="resume-input"
            value={resumeText}
            onChange={handleResumeChange}
            placeholder="Paste your resume text here..."
            rows={10}
            aria-label="Resume text input"
            aria-describedby="resume-description"
          />
          <p id="resume-description" className="input-description">
            Paste your resume text here and let our AI analyze it for you
          </p>
        </div>

        <div className="job-description">
          <label htmlFor="job-input">
            <span className="label-text">Job Description</span>
            <span className="char-count">{jobDescription.length} characters</span>
          </label>
          <textarea
            id="job-input"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste the job description here..."
            rows={10}
            aria-label="Job description text input"
            aria-describedby="job-description-text"
          />
          <p id="job-description-text" className="input-description">
            Enter the job description you want to match against
          </p>
        </div>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <div className="analyze-button">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          aria-busy={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>
    </div>
  )
}

export default App
