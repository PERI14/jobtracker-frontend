import { useState } from "react";
import styles from "./ResumeAnalyzer.module.css";
import api from "../services/api";
import toast from "react-hot-toast";

function ResumeAnalyzer() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            toast.error("Please upload a PDF file");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            toast.error("Please upload a PDF file");
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("resume", file);

        try {
            const response = await api.post("/resume/analyze", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResult(response.data);
            toast.success("Analysis complete!");
        } catch (error) {
            console.error(error);
            // Mock data for demonstration if backend doesn't exist yet
            if (error.response?.status === 404 || error.code === "ERR_NETWORK") {
                toast.error("Backend endpoint not found. Using sample data for UI demo.");
                setResult({
                    score: 85,
                    skills: ["React", "JavaScript", "CSS", "REST APIs", "Git"],
                    suggestions: [
                        "Add more information about your Java experience",
                        "Include a summary section at the top",
                        "Ensure your contact information is clearly visible"
                    ],
                    formattingScore: 92
                });
            } else {
                toast.error("Failed to analyze resume");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.container} fade-in`}>
            <header className={styles.header}>
                <h1 className={styles.title}>Resume Analyzer</h1>
                <p className={styles.subtitle}>Upload your resume and get AI-powered insights and optimization tips.</p>
            </header>

            {!result ? (
                <div className={`${styles.uploadCard} glass-card`}>
                    <div
                        className={`${styles.dropZone} ${isDragging ? styles.dragging : ""} ${file ? styles.hasFile : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className={styles.uploadIcon}>📄</div>
                        {file ? (
                            <div className={styles.fileInfo}>
                                <span className={styles.fileName}>{file.name}</span>
                                <button className={styles.removeFile} onClick={() => setFile(null)}>Remove</button>
                            </div>
                        ) : (
                            <div className={styles.dropText}>
                                <p>Drag and drop your resume here</p>
                                <span>or</span>
                                <label className={styles.fileLabel}>
                                    Browse Files
                                    <input type="file" accept=".pdf" onChange={handleFileChange} hidden />
                                </label>
                                <p className={styles.fileHint}>Supported format: PDF</p>
                            </div>
                        )}
                    </div>

                    <button
                        className={styles.analyzeBtn}
                        onClick={handleAnalyze}
                        disabled={!file || loading}
                    >
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>
                </div>
            ) : (
                <div className={styles.resultGrid}>
                    <div className={`${styles.mainResult} glass-card`}>
                        <div className={styles.scoreCircle}>
                            <svg viewBox="0 0 36 36" className={styles.circularChart}>
                                <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className={styles.circle} style={{ strokeDasharray: `${result.score || 0}, 100` }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <text x="18" y="20.35" className={styles.percentage}>{result.score || 0}%</text>
                            </svg>
                            <span className={styles.scoreLabel}>Overall Match Score</span>
                        </div>

                        <div className={styles.skillsSection}>
                            <h3>Extracted Skills</h3>
                            <div className={styles.skillBadges}>
                                {Array.isArray(result.skills) ? result.skills.map((skill, i) => (
                                    <span key={i} className={styles.skillBadge}>{skill}</span>
                                )) : (result.misssingKeywords ? result.misssingKeywords.split(',').map((skill, i) => (
                                    <span key={i} className={styles.skillBadge}>{skill.trim()}</span>
                                )) : <p>No skills identified</p>)}
                            </div>
                        </div>

                        <button className={styles.resetBtn} onClick={() => setResult(null)}>Analyze Another</button>
                    </div>

                    <div className={`${styles.sideResult} glass-card`}>
                        <h3>Optimization Tips</h3>
                        <ul className={styles.suggestionList}>
                            {Array.isArray(result.suggestions) ? result.suggestions.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            )) : (result.recommendations ? result.recommendations.split('.').filter(Boolean).map((tip, i) => (
                                <li key={i}>{tip.trim()}</li>
                            )) : <li>No suggestions available</li>)}
                        </ul>

                        <div className={styles.formattingBox}>
                            <div className={styles.formatHeader}>
                                <span>Formatting Score</span>
                                <span>{result.formattingScore || 100}%</span>
                            </div>
                            <div className={styles.progressLine}>
                                <div className={styles.fill} style={{ width: `${result.formattingScore || 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResumeAnalyzer;
