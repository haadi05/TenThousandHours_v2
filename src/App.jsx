import { Outlet } from "react-router-dom";
import { Navbar } from "./importStore";
import useAuth from "./hooks/useAuth";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
