import { useState, useId, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import styles from "./LoginForm.module.css";
import UserInput from "../Inputs/UserInput.jsx";
import { handleLogin } from "../../utils/handleUser.js";
import Button from "../Button/Button.jsx";
import EyeIcon from "../EyeIcon/EyeIcon.jsx";
import ErrorsUserForm from "../ErrorsForms/ErrorsUserForm.jsx";

function LoginForm() {
  const idPrefix = useId();
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { setIsLogged } = useContext(UserContext);

  if (redirectUrl) {
    return <Navigate to={redirectUrl} />;
  }

  return (
    <fieldset className={styles["form-wrapper"]}>
      <legend className={styles["form-title"]}>Login</legend>
      <div className={styles["form-container"]}>
        <form
          onSubmit={(e) =>
            handleLogin(e, setIsLogged, setErrorMsg, setRedirectUrl)
          }
        >
          <div className={styles["form-parts"]}>
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
            {errorMsg && errorMsg.length > 0 && (
              <div className="hidden">
                <ErrorsUserForm errorMsg={errorMsg} />
              </div>
            )}

            <Button text="Login" />
            <div className={styles["login-link"]}>
              Do not have an account yet?{" "}
              <Link className={styles.link} to={"/register"}>
                Register{" "}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </fieldset>
  );
}

export default LoginForm;
