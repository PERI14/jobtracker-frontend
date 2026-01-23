import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Jobs.module.css";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    async function fetchJobs() {
        try {
            const response = await api.get("/jobs");
            setJobs(response.data.content || response.data);
        }
        catch (error) {
            console.error(error);
            alert("Failed to Load Jobs");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    async function handleDelete(jobId) {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            await api.delete(`/jobs/${jobId}`);
            setJobs(jobs.filter(job => job.id !== jobId));
        }
        catch (error) {
            console.error(error);
            alert("Failed to delete Job");
        }
    }

    if (loading) {
        return <div className={styles.container}>Loading Jobs....</div>
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>My Applications</h2>
                <button className={styles.addButton} onClick={() => navigate("/addjob")}>
                    + Add New Job
                </button>
            </header>

            {jobs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No jobs added yet. Start by adding your first application!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {Array.isArray(jobs) && jobs.map((job) => (
                        <div key={job.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <strong className={styles.company}>{job.company}</strong>
                                <span className={styles.role}>{job.role}</span>
                            </div>

                            <div className={styles.cardDetails}>
                                <span className={`${styles.badge} ${styles[`status-${job.status.toLowerCase()}`]}`}>
                                    {job.status}
                                </span>
                                {job.salary && <span className={styles.salary}>${job.salary}</span>}
                            </div>

                            <div className={styles.cardActions}>
                                <button className={styles.editBtn} onClick={() => navigate(`/edit-job/${job.id}`)}>
                                    Edit
                                </button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(job.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Jobs;