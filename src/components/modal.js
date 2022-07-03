import styles from "../styles/modal.module.css";

import tutorial from "../gifs/tutorial.gif";

const Modal = ({ setIsModalOpen }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => setIsModalOpen(false)} className={styles.cancel}>
        close
      </button>

      <div>
        <h2>KYUPID INSIGHTS</h2>
        <p>( by Locale.ai )</p>
      </div>

      <div>
        <p className={styles.desc}>
          An insight visualizer for <span className="highlight">Kyupid</span>{" "}
          users allover the world.
        </p>
      </div>

      <div className={styles.steps}>
        <div>
          <p className={styles.step_count}>STEP 1:</p>
          <p className={styles.step}>Open the console from navbar</p>
        </div>
        <div>
          <p className={styles.step_count}>STEP 2:</p>
          <p className={styles.step}>Hover over the green plots.</p>
        </div>
        <div>
          <p className={styles.step_count}>STEP 3:</p>
          <p className={styles.step}>
            Kboom!! You are now able to see the insights.
          </p>
        </div>
      </div>
      <div>
        <img src={tutorial} />
      </div>
    </div>
  );
};

export default Modal;
