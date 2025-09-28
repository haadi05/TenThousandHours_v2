import useAuth from "./hooks/useAuth";
import { LoginForm } from "./components/login-form";
import { firebaseSignOut } from "./firebase/auth";

function App() {
  const { user, loading, setUser } = useAuth();

  const handleLogout = () => {
    firebaseSignOut(() => setUser(null));
  };
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : user ? (
        <>
          <div>welcome {user.displayName}</div>
          <button onClick={handleLogout}>signOut</button>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
