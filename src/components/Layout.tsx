import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#141414] text-gray-100 font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
