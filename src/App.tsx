import { useState } from 'react'
import './App.css'
import { analyzeResume } from './services/llm/Service'

function App() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    // Clear previous errors
    setError('')

    // Validation
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please enter your resume text and job description')
      return;
    }

    try {
      setIsAnalyzing(true)
      //call the analyzeResume function service, Pass the state Variables as parameters
      const result = await analyzeResume(resumeText, jobDescription)
      setAnalysisResult(result); //store the result
      console.log('Analysis complete!');
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
    finally {
      setIsAnalyzing(false);
    }
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
      
      {analysisResult && (
        <div className="analysis-result">
          <h2>Analysis Result</h2>
          <pre>{analysisResult}</pre>
        </div>
      )}
    </div>
  );
}

export default App
