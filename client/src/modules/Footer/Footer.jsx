import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to={"/copyright"} target="_blank">
        &copy;Copyright 2024
      </Link>
    </footer>
  );
}

export default Footer;
