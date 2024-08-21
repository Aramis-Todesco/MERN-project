import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles["home-main"]}>
      <section className={styles["home-container"]}>
        <div className={styles["home-wrapper"]}>
          <div className={styles["home-paragraph"]}>
            <p>
              Save your favorite books and never lose track of what you&apos;ve
              read!
            </p>
          </div>
          <div>
            <Link className={styles.link} to={"/register"}>
              Let&apos;s start
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
