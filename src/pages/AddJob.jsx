import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import toast from "react-hot-toast";

function AddJob() {
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("APPLIED");
    const [priority, setPriority] = useState("MEDIUM");
    const [category, setCategory] = useState("Full-time");
    const [source, setSource] = useState("");
    const [salary, setSalary] = useState("");
    const [appliedDate, setAppliedDate] = useState("");
    const [followUpDate, setFollowUpDate] = useState("");
    const [followUpNotes, setFollowUpNotes] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!company || !role || !status || !salary || !appliedDate) {
            toast.error("All required fields must be filled");
            return;
        }
        try {
            await api.post("/jobs", {
                company,
                role,
                status,
                priority,
                category,
                source,
                salary,
                appliedDate,
                followUpDate: followUpDate || null,
                followUpNotes
            });
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
            <div className={`${styles.card} glass-card fade-in`}>
                <h2 className={styles.title}>Track New Job</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
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
                                placeholder="e.g. LinkedIn"
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
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label className={styles.label}>Follow-up Date (Optional)</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                            />
                        </div>

                        <div className={styles.group}>
                            <label className={styles.label}>Follow-up Notes</label>
                            <input
                                className={styles.input}
                                placeholder="e.g. Follow up with HR if no response"
                                value={followUpNotes}
                                onChange={(e) => setFollowUpNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.button}>Add Job Application</button>
                    <button type="cancel" className={styles.backLink} onClick={() => navigate("/jobs")}>
                        Cancel and Go Back
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJob;