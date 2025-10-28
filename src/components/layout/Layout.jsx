import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
