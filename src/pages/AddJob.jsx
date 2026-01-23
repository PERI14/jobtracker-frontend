import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import toast from "react-hot-toast";

function AddJob() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("APPLIED");
    const [source, setSource] = useState("");
    const [salary, setSalary] = useState("");
    const [appliedDate, setAppliedDate] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!company || !role || !status || !salary || !appliedDate) {
            toast.error("All required fields must be filled");
            return;
        }
        try {
            await api.post("/jobs", { company, role, status, source, salary, appliedDate });
            toast.success("Job added successfully");
            navigate("/jobs");
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to add job");
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Track New Job</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.group}>
                        <label className={styles.label}>Company Name</label>
                        <input
                            className={styles.input}
                            placeholder="e.g. Google"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Role</label>
                        <input
                            className={styles.input}
                            placeholder="e.g. Software Engineer"
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
                            placeholder="e.g. LinkedIn"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Annual Salary ($)</label>
                        <input
                            type="number"
                            className={styles.input}
                            placeholder="e.g. 120000"
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

                    <button type="submit" className={styles.button}>Add Job Application</button>
                    <button type="button" className={styles.backLink} onClick={() => navigate("/jobs")}>
                        Cancel and Go Back
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJob;