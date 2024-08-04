import Nav from "../Nav";
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
    </>
  );
}

export default Layout;
