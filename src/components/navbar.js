import styles from "../styles/navbar.module.css";
import logo from "../images/logo.svg"

const Navbar = () => {

    return (
        <div className={styles.container}>
            <div className={styles.logo_container}>
                <a href="https://www.locale.ai/">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <button >Open Console</button>
        </div>
    );
};

export default Navbar;
