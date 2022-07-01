import classNames from "classnames";
import { useEffect } from "react";
import styles from "../styles/console.module.css";

const Console = ({ isConsoleOpen, setIsConsoleOpen }) => {
    useEffect(() => {
        const container = document.getElementById("nav_container");
        container.style.right = isConsoleOpen ? "10px" : "-1000px";
    }, [isConsoleOpen]);

    const DetailsCard = ({ title, value }) => {
        return (
            <div className={styles.card}>
                <p>{title}</p>
                <p>{value}</p>
            </div>
        );
    };
    return (
        <div className={styles.container} id="nav_container">
            <button onClick={() => setIsConsoleOpen(false)} className={styles.cancel}>
                close
            </button>

            <h2 className="head">INSIGHTS</h2>
            <hr />
            <div className={styles.details_container}>
                <DetailsCard title="Total Users" value={1000} />
                <DetailsCard title="Male users" value={20} />
                <DetailsCard title="Female users" value={12} />
                <DetailsCard title="Revenue generated" value={100} />

            </div>
        </div>
    );
};

export default Console;
