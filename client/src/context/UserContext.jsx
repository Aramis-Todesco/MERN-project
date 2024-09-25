import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const UserContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
});

export function UserProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    const storedIsLogged = localStorage.getItem("isLogged");
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  useEffect(() => {
    fetch(`${backendUrl}/api/users/check-auth`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogged) {
          setIsLogged(true);
          localStorage.setItem("isLogged", true);
        } else {
          setIsLogged(false);
          localStorage.setItem("isLogged", false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLogged(false);
        localStorage.setItem("isLogged", false);
      });
  }, []);

  useEffect(() => {
    // Aggiorna il valore di isLogged in localStorage quando cambia
    localStorage.setItem("isLogged", isLogged);
  }, [isLogged]);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
