import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null) // Nayi file aate hi purana result hata do
    setError(null)
  }

  const handleScan = async () => {
    if (!file) {
      setError("Please select a PDF file first.")
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      // Backend ko call lagao
      const response = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze resume")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Error connecting to server. Is backend running?")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📄 Resume Scanner AI</h1>
        <p style={styles.subtitle}>Upload your resume to check your ATS Score</p>

        {/* Upload Section */}
        <div style={styles.uploadBox}>
          <input type="file" accept=".pdf" onChange={handleFileChange} style={styles.input} />
          <button 
            onClick={handleScan} 
            disabled={loading} 
            style={loading ? styles.buttonDisabled : styles.button}
          >
            {loading ? "Scanning..." : "Analyze Resume"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Results Section */}
        {result && (
          <div style={styles.resultBox}>
            <h2 style={styles.scoreTitle}>ATS Score: <span style={styles.scoreValue}>{result.score}%</span></h2>
            
            <div style={styles.grid}>
              <div style={styles.col}>
                <h3 style={{color: 'green'}}>✅ Found Skills</h3>
                <ul>
                  {result.found_skills.length > 0 ? (
                    result.found_skills.map(skill => <li key={skill}>{skill}</li>)
                  ) : <li>No skills found</li>}
                </ul>
              </div>

              <div style={styles.col}>
                <h3 style={{color: 'red'}}>❌ Missing Skills</h3>
                <ul>
                  {result.missing_skills.length > 0 ? (
                    result.missing_skills.map(skill => <li key={skill}>{skill}</li>)
                  ) : <li>Great job! No skills missing.</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// Simple CSS-in-JS Styles (Taaki alag se CSS file na banani pade)
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif' },
  card: { backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '500px', textAlign: 'center' },
  title: { color: '#333', marginBottom: '0.5rem' },
  subtitle: { color: '#666', marginBottom: '2rem' },
  uploadBox: { display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' },
  input: { padding: '10px', border: '1px solid #ddd', borderRadius: '5px' },
  button: { padding: '12px 24px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  buttonDisabled: { padding: '12px 24px', backgroundColor: '#ccc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'not-allowed' },
  error: { color: 'red', marginTop: '1rem' },
  resultBox: { marginTop: '2rem', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '1rem' },
  scoreTitle: { textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem' },
  scoreValue: { color: '#007bff' },
  grid: { display: 'flex', justifyContent: 'space-between' },
  col: { flex: 1, padding: '0 10px' }
}

export default App