import { Outlet } from "react-router-dom";
import { Navbar } from "./importStore";
import useAuth from "./hooks/useAuth";
import useSkillStore from "./store/skillStore";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

function App() {
  const { user } = useAuthStore();
  const { loading } = useAuth();
  const { spinner, fetchSkills } = useSkillStore();

  useEffect(() => {
    if (user?.uid) {
      fetchSkills(user.uid);
    }
  }, [user, fetchSkills]);

  if (loading || spinner) {
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
