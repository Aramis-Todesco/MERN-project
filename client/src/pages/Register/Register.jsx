import RegisterForm from "../../modules/RegisterForm/RegisterForm";
import styles from "./Register.module.css";

function Register() {
  return (
    <main className="form-main">
      <section className={styles["form-container"]}>
        <RegisterForm />
      </section>
    </main>
  );
}

export default Register;
