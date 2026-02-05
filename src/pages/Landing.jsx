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

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Don't Just Track. <span className={styles.gradientText}>Take Action.</span></h2>
                    <p className={styles.sectionSubtitle}>Most trackers are passive repositories. JobTracker is your proactive career assistant.</p>
                </div>

                <div className={styles.proactiveFeature}>
                    <div className={`${styles.proactiveCard} glass-card slide-up`}>
                        <div className={styles.cardIndicator}>🔥 Priority Feature</div>
                        <h3>Smart Follow-Up Reminder System</h3>
                        <p>
                            Never let a recruiter's silence be the end of your journey. Our system analyzes your application timeline
                            and prompts you to follow up at the perfect moment.
                        </p>
                        <ul className={styles.benefitList}>
                            <li>Automated reminders based on application status</li>
                            <li>Personalized follow-up note templates</li>
                            <li>Momentum tracking to prevent application aging</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.howItWorks}>
                <h2 className={styles.centeredTitle}>Your Path to Hired</h2>
                <div className={styles.stepsGrid}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>01</div>
                        <h4>Import & Track</h4>
                        <p>Add job details manually or via our browser extension in seconds.</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>02</div>
                        <h4>Optimize with AI</h4>
                        <p>Analyze your resume against the JD to ensure you clear the ATS filters.</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>03</div>
                        <h4>Nail the Interview</h4>
                        <p>Get AI-generated talking points and strategy guides for every role.</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>04</div>
                        <h4>Proactive Follow-up</h4>
                        <p>Let the system remind you exactly when to ping the recruiter.</p>
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
        </div >
    );
}

export default Landing;
