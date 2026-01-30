import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "./Dashboard.module.css";
import toast from "react-hot-toast";

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
                toast.error("Failed to load dashboard data");
            }
        }
        fetchSummary();
    }, []);

    if (!summary) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading summary...</p>
            </div>
        );
    }

    const maxCount = Math.max(...Object.values(summary.statusCount), 1);

    return (
        <div className={`${styles.container} fade-in`}>
            <header className={styles.header}>
                <h1 className={styles.title}>Welcome back!</h1>
                <p className={styles.subtitle}>Here's what's happening with your job applications.</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} glass-card`}>
                    <div className={styles.statIcon} style={{ background: 'var(--primary-bg)' }}>📊</div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{summary.totalApplications}</span>
                        <span className={styles.statLabel}>Total Apps</span>
                    </div>
                </div>

                <div className={`${styles.statCard} glass-card`}>
                    <div className={styles.statIcon} style={{ background: 'var(--success-bg)' }}>✅</div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{summary.statusCount['Offer'] || 0}</span>
                        <span className={styles.statLabel}>Offers</span>
                    </div>
                </div>

                <div className={`${styles.statCard} glass-card`}>
                    <div className={styles.statIcon} style={{ background: 'var(--info-bg)' }}>🤝</div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{summary.statusCount['Interviewing'] || 0}</span>
                        <span className={styles.statLabel}>Interviews</span>
                    </div>
                </div>
            </div>

            <div className={styles.chartsGrid}>
                <div className={`${styles.chartCard} glass-card`}>
                    <h3 className={styles.chartTitle}>Application Status</h3>
                    <div className={styles.statusList}>
                        {Object.entries(summary.statusCount).map(([status, count]) => (
                            <div key={status} className={styles.statusRow}>
                                <div className={styles.statusInfo}>
                                    <span className={styles.statusName}>{status}</span>
                                    <span className={styles.statusCount}>{count}</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{
                                            width: `${(count / summary.totalApplications) * 100}%`,
                                            backgroundColor: status.toLowerCase() === 'accepted' || status.toLowerCase() === 'offer' ? 'var(--success)' :
                                                status.toLowerCase() === 'rejected' ? 'var(--danger)' :
                                                    status.toLowerCase() === 'interviewing' ? 'var(--info)' : 'var(--primary)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.chartCard} glass-card`}>
                    <h3 className={styles.chartTitle}>Top Sources</h3>
                    <div className={styles.sourceList}>
                        {Object.entries(summary.sourceCount).map(([source, count], index) => (
                            <div key={source} className={styles.sourceItem}>
                                <div className={styles.sourceRank}>{index + 1}</div>
                                <span className={styles.sourceName}>{source || "Unknown"}</span>
                                <span className={styles.sourceCountBadge}>{count} apps</span>
                            </div>
                        ))}
                        {Object.keys(summary.sourceCount).length === 0 && (
                            <p className={styles.emptyText}>No source data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

