import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Form.module.css";
import toast from "react-hot-toast";

function EditJobs() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("APPLIED");
    const [priority, setPriority] = useState("MEDIUM");
    const [category, setCategory] = useState("Full-time");
    const [source, setSource] = useState("");
    const [salary, setSalary] = useState("");
    const [appliedDate, setAppliedDate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobById() {
            try {
                const response = await api.get(`/jobs/${id}`);
                const job = response.data;

                setCompany(job.company);
                setRole(job.role);
                setStatus(job.status);
                setPriority(job.priority || "MEDIUM");
                setCategory(job.category || "Full-time");
                setSource(job.source || "");
                setSalary(job.salary || "");
                setAppliedDate(job.appliedDate || "");
            }
            catch (error) {
                console.error(error);
                toast.error("Failed to load job");
                navigate("/jobs");
            } finally {
                setLoading(false);
            }
        }

        fetchJobById();
    }, [id, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await api.put(`/jobs/${id}`, {
                company,
                role,
                status,
                priority,
                category,
                source,
                salary,
                appliedDate,
            });

            toast.success("Job updated successfully");
            navigate("/jobs");
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to update job");
        }
    }

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading application details...</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={`${styles.card} glass-card fade-in`}>
                <h2 className={styles.title}>Edit Application</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label className={styles.label}>Company Name</label>
                            <input
                                className={styles.input}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label}>Role</label>
                            <input
                                className={styles.input}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label className={styles.label}>Status</label>
                            <select
                                className={styles.select}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="APPLIED">Applied</option>
                                <option value="INTERVIEWING">Interviewing</option>
                                <option value="OFFER">Offer Received</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label}>Priority</label>
                            <select
                                className={styles.select}
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label className={styles.label}>Category</label>
                            <select
                                className={styles.select}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label}>Source</label>
                            <input
                                className={styles.input}
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label className={styles.label}>Annual Salary ($)</label>
                            <input
                                type="number"
                                className={styles.input}
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label}>Applied Date</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={appliedDate}
                                onChange={(e) => setAppliedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.button}>Update Application</button>
                    <button type="button" className={styles.backLink} onClick={() => navigate("/jobs")}>
                        Cancel and Go Back
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditJobs;