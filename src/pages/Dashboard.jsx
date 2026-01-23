import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        async function fetchSummary() {
            try {
                const response = await api.get("/dashboard/summary");
                setSummary(response.data);
            }
            catch (error) {
                console.error(error);
                alert("Failed to load dashboard data");
            }
        }
        fetchSummary();
    }, []);

    if (!summary) {
        return (
            <div className={styles.container}>
                <p>Loading summary...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.subtitle}>Welcome back! Here's an overview of your job applications.</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{summary.totalApplications}</span>
                    <span className={styles.statLabel}>Total Applications</span>
                </div>
                {/* Add more derived stats if available */}
            </div>

            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Status Breakdown</h3>
                    <div className={styles.statusList}>
                        {Object.entries(summary.statusCount).map(([status, count]) => (
                            <div key={status} className={styles.statusItem}>
                                <span className={styles.statusName}>{status}</span>
                                <span className={styles.statusCount}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Top Sources</h3>
                    <div className={styles.statusList}>
                        {Object.entries(summary.sourceCount).map(([source, count]) => (
                            <div key={source} className={styles.statusItem}>
                                <span className={styles.statusName}>{source || "Unknown"}</span>
                                <span className={styles.statusCount}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
