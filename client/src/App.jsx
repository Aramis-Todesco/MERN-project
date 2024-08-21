import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./modules/Footer/Footer.jsx";
import Header from "./modules/Header/Header.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { BooksProvider } from "./context/BookContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <BooksProvider>
          <Header />
          <Outlet />
          <Footer />
        </BooksProvider>
      </UserProvider>
    </>
  );
}

export default App;
