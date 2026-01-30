import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const isActive = (path) => location.pathname === path;
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>JobTracker</div>

            <button className={styles.hamburger} onClick={toggleMenu}>
                <span className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ""}`}></span>
                <span className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ""}`}></span>
                <span className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ""}`}></span>
            </button>

            <div className={`${styles.navContent} ${isMenuOpen ? styles.navActive : ""}`}>
                <div className={styles.links}>
                    <Link
                        to="/dashboard"
                        className={`${styles.link} ${isActive("/dashboard") ? styles.active : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/jobs"
                        className={`${styles.link} ${isActive("/jobs") ? styles.active : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Jobs
                    </Link>

                    <Link
                        to="/resume-analyzer"
                        className={`${styles.link} ${isActive("/resume-analyzer") ? styles.active : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Resume Analyzer
                    </Link>

                    <Link
                        to="/addjob"
                        className={`${styles.link} ${isActive("/addjob") ? styles.active : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Add Job
                    </Link>
                </div>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
