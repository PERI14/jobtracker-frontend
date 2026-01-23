import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Jobs.module.css";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const navigate = useNavigate();

    async function fetchJobs() {
        try {
            const response = await api.get("/jobs");
            setJobs(response.data.content || response.data);
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to Load Jobs");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    function handleDelete(jobId) {
        setSelectedJobId(jobId);
        setIsModalOpen(true);
    }

    async function confirmDelete() {
        if (!selectedJobId) return;

        try {
            await api.delete(`/jobs/${selectedJobId}`);
            setJobs(jobs.filter(job => job.id !== selectedJobId));
            toast.success("Job deleted successfully");
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to delete Job");
        } finally {
            setIsModalOpen(false);
            setSelectedJobId(null);
        }
    }

    function cancelDelete() {
        setIsModalOpen(false);
        setSelectedJobId(null);
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

            <ConfirmModal
                isOpen={isModalOpen}
                title="Delete Job"
                message="Are you sure you want to delete this job? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
}

export default Jobs;