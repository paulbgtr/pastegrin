import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateAccount } from "../routesComponents/settings/UpdateAccount";
import { User } from "@/types/User";

const Settings = () => {
  const [user, setUser] = useState<User>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) navigate("/signin");

      const response = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        navigate("/signin");
        return;
      }

      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div className="grid max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">Settings</h1>
      {user && <UpdateAccount user={user} />}
    </div>
  );
};

export default Settings;
