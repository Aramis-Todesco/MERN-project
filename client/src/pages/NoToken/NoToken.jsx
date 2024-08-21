import { Link } from "react-router-dom";
import styles from "./NoToken.module.css";

function NoToken() {
  return (
    <main className="form-main">
      <section className={styles["no-token-wrapper"]}>
        <div className={styles["no-token-container"]}>
          <p>Non sei più loggato</p>
          <Link to={"/login"} className={styles["login-btn"]}>
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NoToken;
