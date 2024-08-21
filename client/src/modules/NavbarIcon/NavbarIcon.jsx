import styles from "./NavbarIcon.module.css";
import { Link } from "react-router-dom";

function NavabarIcons({ src, to }) {
  return (
    <Link to={to}>
      <img src={src} alt="" className={styles["nav-img-link"]} />
    </Link>
  );
}

export default NavabarIcons;
