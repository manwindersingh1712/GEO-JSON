import { useEffect, useState } from "react";
import styles from "../styles/console.module.css";
import noDataFound from "../images/no-data.svg"

const Console = ({ isConsoleOpen, setIsConsoleOpen, user, setIsModalOpen }) => {
    const [maleUsers, setMaleUsers] = useState(0);
    const [femaleUsers, setFemaleUsers] = useState(0);
    const [paidUsers, setpaidUsers] = useState(0);
    const [totalUsersInArea, setTotalUsersInArea] = useState(0);

    const DetailsCard = ({ title, value }) => {
        return (
            <div className={styles.card}>
                <p>{title}</p>
                <p>{value}</p>
            </div>
        );
    };

    useEffect(() => {
        if (!user) return
        const maleUsers = user.filter(d => {
            return d.gender === "M"
        })
        setMaleUsers(maleUsers.length)

        const femaleUsers = user.filter(d => {
            return d.gender === "F"
        })
        setFemaleUsers(femaleUsers.length)

        const paidUsers = user.filter(d => {
            return d.is_pro_user === true
        })
        setpaidUsers(femaleUsers.length)


    }, [user])

    useEffect(() => {
        const container = document.getElementById("nav_container");
        container.style.right = isConsoleOpen ? "10px" : "-1000px";
    }, [isConsoleOpen]);


    return (
        <div className={styles.container} id="nav_container">
            <button onClick={() => setIsConsoleOpen(false)} className={styles.cancel}>
                close
            </button>

            {user ?

                <>
                    <h2 className="head">INSIGHTS</h2>
                    <hr />
                    <div className={styles.details_container}>
                        <DetailsCard title="Total Users" value={user.length} />
                        <DetailsCard title="Paid Users" value={paidUsers} />
                        <DetailsCard title="Male users" value={maleUsers} />
                        <DetailsCard title="Female users" value={femaleUsers} />

                    </div>
                </> :

                <div className={styles.no_data_container}>
                    <img src={noDataFound} alt="logo" />
                    <h2 className="head">NO DATA FOUND</h2>
                    <p>Hover over the green plots to see the insights</p>
                    <button onClick={() => setIsModalOpen(true)} className={styles.more_details} >See more details</button>
                </div>
            }
        </div>
    );
};

export default Console;
