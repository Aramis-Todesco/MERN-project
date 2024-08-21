import { useId, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { handleSubmit } from "../../utils/handleUser.js";
import UserInput from "../Inputs/UserInput.jsx";
import EyeIcon from "../EyeIcon/EyeIcon.jsx";
import ErrorsUserForm from "../ErrorsForms/ErrorsUserForm.jsx";
import Button from "../Button/Button.jsx";

function RegisterForm() {
  const idPrefix = useId();
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  if (redirectUrl) {
    return <Navigate to={redirectUrl} />;
  }

  return (
    <fieldset className={styles["form-wrapper"]}>
      <legend className={styles["form-title"]}>Register</legend>
      <div className={styles["form-container"]}>
        <form onSubmit={(e) => handleSubmit(e, setErrorMsg, setRedirectUrl)}>
          <div className={styles["form-parts"]}>
            <UserInput
              type="text"
              id={idPrefix + "-username"}
              placeholder="username"
              name="username"
            />

            <UserInput
              type="email"
              id={idPrefix + "-email"}
              name="email"
              placeholder="email"
            />
            <div className={styles["password-wrapper"]}>
              <UserInput
                type={showPassword ? "text" : "password"}
                id={idPrefix + "-password"}
                name="password"
                placeholder="password"
              />
              <EyeIcon
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <label htmlFor="privacy" className={styles.privacy}>
              <input
                type="radio"
                id={idPrefix + "-privacy"}
                name="privacy"
                placeholder="privacy"
              />
              <Link
                to={"/terms-conditions"}
                target="_blank"
                className={styles["privacy-text"]}
              >
                Terms and Conditions of Use
              </Link>
            </label>

            {errorMsg && errorMsg.length > 0 && (
              <div className="hidden">
                <ErrorsUserForm errorMsg={errorMsg} />
              </div>
            )}
            <Button text="Register" />

            <div className={styles["register-link"]}>
              Already registered?{" "}
              <Link className={styles.link} to={"/login"}>
                Login{" "}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </fieldset>
  );
}

export default RegisterForm;
