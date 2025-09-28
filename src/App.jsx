import { Outlet } from "react-router-dom";
import { Navbar } from "./importStore";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
