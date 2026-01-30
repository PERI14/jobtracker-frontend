import { useEffect, useState, useMemo } from "react";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
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

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.role.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "All" || job.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [jobs, searchTerm, statusFilter]);

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
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading your applications...</p>
            </div>
        );
    }

    return (
        <div className={`${styles.container} fade-in`}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h2 className={styles.title}>My Applications</h2>
                    <p className={styles.subtitle}>Track and manage your job search journey</p>
                </div>
                <button className={styles.addButton} onClick={() => navigate("/addjob")}>
                    <span className={styles.plusIcon}>+</span> Add New Job
                </button>
            </header>

            <div className={styles.filtersWrapper}>
                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search by company or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.statusFilter}>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {filteredJobs.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📂</div>
                    <p>{jobs.length === 0 ? "No jobs added yet. Start by adding your first application!" : "No jobs found matching your criteria."}</p>
                    {jobs.length === 0 && (
                        <button className={styles.emptyAddBtn} onClick={() => navigate("/addjob")}>
                            Create Initial Entry
                        </button>
                    )}
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredJobs.map((job) => (
                        <div key={job.id} className={`${styles.card} glass-card`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.companyInfo}>
                                    <strong className={styles.company}>{job.company}</strong>
                                    <span className={styles.role}>{job.role}</span>
                                </div>
                                <div className={styles.priorityDot} title={`Priority: ${job.priority || 'Medium'}`}
                                    style={{ backgroundColor: `var(--prio-${(job.priority || 'medium').toLowerCase()})` }}></div>
                            </div>

                            <div className={styles.cardDetails}>
                                <span className={`${styles.badge} ${styles[`status-${job.status.toLowerCase()}`]}`}>
                                    {job.status}
                                </span>
                                {job.category && (
                                    <span className={styles.categoryBadge}>{job.category}</span>
                                )}
                                {job.salary && <span className={styles.salary}>💰 ${job.salary}</span>}
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.sourceInfo}>
                                    {job.source && <span className={styles.source}>📍 {job.source}</span>}
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
