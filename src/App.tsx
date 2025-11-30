import { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log('File selected:', file.name);
    // TODO: Parse the PDF file
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Resume Analyzer</h1>
        <p className="app-subtitle">Upload your resume and get instant feedback</p>
      </header>

      <main className="app-content">
        <FileUpload onFileSelect={handleFileSelect} />

        {selectedFile && (
          <div className="card fade-in">
            <h3>File Ready for Analysis</h3>
            <p>File: {selectedFile.name}</p>
            <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
