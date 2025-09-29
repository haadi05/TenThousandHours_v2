import useAuth from "../hooks/useAuth";
import { firebaseSignOut } from "../firebase/auth";
import { LoginForm } from "../importStore";

function Navbar() {
  const { user, loading, setUser } = useAuth();
  const handleLogout = () => {
    firebaseSignOut(() => setUser(null));
  };
  return (
    <>
      {user ? (
        <>
          <div>welcome {user.displayName}</div>
          <button onClick={handleLogout}>signOut</button>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default Navbar;
