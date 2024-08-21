import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";

const Logout = () => {
  const { setIsLogged } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("http://localhost:5000/api/users/logout", {
          credentials: "include",
        });
        setIsLogged(false);
        navigate("/");
      } catch (error) {
        console.error("Failed to logout:", error);
        navigate("/books");
      }
    };

    logout();
  }, [navigate, setIsLogged]);

  return (
    <div>
      <h1>Error logging out</h1>
    </div>
  );
};

export default Logout;
