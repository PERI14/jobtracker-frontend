import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>JobTracker</div>

            <div className={styles.links}>
                <Link
                    to="/dashboard"
                    className={`${styles.link} ${isActive("/dashboard") ? styles.active : ""}`}
                >
                    Dashboard
                </Link>

                <Link
                    to="/jobs"
                    className={`${styles.link} ${isActive("/jobs") ? styles.active : ""}`}
                >
                    Jobs
                </Link>

                <Link
                    to="/addjob"
                    className={`${styles.link} ${isActive("/addjob") ? styles.active : ""}`}
                >
                    Add Job
                </Link>
            </div>

            <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;
