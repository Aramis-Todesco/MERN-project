import PropTypes from "prop-types";
import styles from "./ErrorsForms.module.css";

function ErrorsUserForm({ errorMsg }) {
  return (
    <>
      {Array.isArray(errorMsg) && errorMsg.length > 1 ? (
        <div className={styles["errors-container"]}>
          <ul>
            {errorMsg.map((msg, i) => (
              <li key={i} style={{ color: "red" }}>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles["error-message-container"]}>
          <p className={styles["error-message"]}>{errorMsg}</p>
        </div>
      )}
    </>
  );
}

ErrorsUserForm.propTypes = {
  errorStyle: PropTypes.string,
  errorsStyle: PropTypes.string,
  errorMsg: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

export default ErrorsUserForm;
