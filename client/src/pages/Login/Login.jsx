import LoginForm from "../../modules/LoginForm/LoginForm";
import styles from "./Login.module.css";

function Login() {
  return (
    <main className="form-main">
      <section className={styles["form-container"]}>
        <LoginForm />
      </section>
    </main>
  );
}

export default Login;
