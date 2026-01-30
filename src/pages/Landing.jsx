import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.heroOverlay}></div>

            <section className={styles.hero}>
                <div className={`${styles.heroContent} fade-in`}>
                    <div className={styles.badge}>Next Generation Job Tracking</div>
                    <h1 className={styles.title}>
                        Elevate Your <span className={styles.gradientText}>Career Path</span> With Intelligence
                    </h1>
                    <p className={styles.description}>
                        Track applications, analyze resumes with AI, and land your dream job faster.
                        The most premium job tracking experience for serious professionals.
                    </p>
                    <div className={styles.ctaGroup}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => navigate("/register")}
                        >
                            Start Tracking Free
                        </button>
                        <button
                            className={styles.secondaryBtn}
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                <div className={`${styles.heroVisual} slide-up`}>
                    <div className={styles.mockupContainer}>
                        <div className={`${styles.mockupCard} glass-card`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.skeletonLine}></div>
                                <div className={styles.skeletonGrid}>
                                    <div className={styles.skeletonBlock}></div>
                                    <div className={styles.skeletonBlock}></div>
                                </div>
                                <div className={styles.skeletonList}>
                                    <div className={styles.skeletonItem}></div>
                                    <div className={styles.skeletonItem}></div>
                                    <div className={styles.skeletonItem}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.statsFloating} glass-card`}>
                            <div className={styles.statLine}>85% Match</div>
                            <div className={styles.statProgress}></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.featureGrid}>
                    <div className={`${styles.featureCard} glass-card`}>
                        <div className={styles.icon}>📊</div>
                        <h3>Smart Analytics</h3>
                        <p>Track your success rate and source performance with real-time data visualizations.</p>
                    </div>
                    <div className={`${styles.featureCard} glass-card`}>
                        <div className={styles.icon}>📄</div>
                        <h3>AI Resume Analysis</h3>
                        <p>Instantly scan your resume against job descriptions to optimize for ATS systems.</p>
                    </div>
                    <div className={`${styles.featureCard} glass-card`}>
                        <div className={styles.icon}>⚡</div>
                        <h3>Premium Workflow</h3>
                        <p>Organize your hunt with priorities, categories, and a seamless interface built for speed.</p>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; 2026 JobTracker. Designed for tomorrow's talent.</p>
            </footer>
        </div>
    );
}

export default Landing;
