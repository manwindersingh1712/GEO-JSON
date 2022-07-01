import classNames from "classnames";
import { useEffect } from "react";
import styles from "../styles/console.module.css";

const Console = ({ isConsoleOpen, setIsConsoleOpen }) => {
    useEffect(() => {
        const container = document.getElementById("nav_container");
        container.style.right = isConsoleOpen ? "24px" : "-1000px";
    }, [isConsoleOpen]);

    return (
        <div className={styles.container} id="nav_container">
            <button onClick={() => setIsConsoleOpen(false)} className={styles.cancel} >close</button>
        </div>
    );
};

export default Console;
