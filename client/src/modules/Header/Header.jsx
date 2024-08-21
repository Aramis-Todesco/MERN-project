import { useContext, useState } from "react";
import UserContext from "../../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { BiSolidBookAdd } from "react-icons/bi";
import { RiLogoutBoxFill } from "react-icons/ri";
import styles from "./Header.module.css";

function Header() {
  const [redirect, setRedirect] = useState(false);
  const { isLogged } = useContext(UserContext);

  const handleMyBookshelfClick = (e) => {
    if (!isLogged) {
      e.preventDefault();
      alert("You must be logged in to access MyBookshelf.");
    } else {
      setRedirect("/books");
    }
  };

  return (
    <header>
      <section className={styles["header-wrapper"]}>
        <div className={styles["header-link"]}>
          <Link onClick={handleMyBookshelfClick} to={redirect}>
            MyBookshelf
          </Link>
        </div>
        {isLogged ? (
          <nav className={styles.navbar}>
            <div className={styles.links}>
              <Link to={"/create-book"} className={styles["left-link"]}>
                Add book
              </Link>
              <Link to="/logout" className={styles["right-link"]}>
                Logout
              </Link>
            </div>
            <div className={styles["links-img"]}>
              <div className={styles["left-img-link"]}>
                <Link to={"/create-book"}>
                  <BiSolidBookAdd />
                </Link>
              </div>
              <div className={styles["right-img-link"]}>
                <Link to={"/logout"}>
                  <RiLogoutBoxFill />
                </Link>
              </div>
            </div>
          </nav>
        ) : (
          <nav className={styles.navbar}>
            <div className={styles.links}>
              <Link to="/register" className={styles["left-link"]}>
                Register
              </Link>
              <Link to={"/login"} className={styles["right-link"]}>
                Login
              </Link>
            </div>
            <div className={styles["links-img"]}>
              <div className={styles["left-img-link"]}>
                <Link to={"/register"}>
                  <MdPersonAdd />
                </Link>
              </div>
              <div className={styles["right-img-link"]}>
                <Link to={"/login"}>
                  <IoLogIn />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </section>
    </header>
  );
}

export default Header;
