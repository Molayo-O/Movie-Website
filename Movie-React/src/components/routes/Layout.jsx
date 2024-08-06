import Nav from "../Nav";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
