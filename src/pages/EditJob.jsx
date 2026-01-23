import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "./Form.module.css";

function EditJobs() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("APPLIED");
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
                setSource(job.source);
                setSalary(job.salary);
                setAppliedDate(job.appliedDate);
            }
            catch (error) {
                console.error(error);
                alert("Failed to load job");
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
                source,
                salary,
                appliedDate,
            });

            alert("Job updated successfully");
            navigate("/jobs");
        }
        catch (error) {
            console.error(error);
            alert("Failed to update job");
        }
    }

    if (loading) {
        return <div className={styles.page}>Loading job details...</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Edit Application</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
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

                    <div className={styles.group}>
                        <label className={styles.label}>Status</label>
                        <select
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="APPLIED">Applied</option>
                            <option value="INTERVIEW">Interviewing</option>
                            <option value="OFFERED">Offer Received</option>
                            <option value="REJECTED">Rejected</option>
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