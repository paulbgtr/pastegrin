import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateAccount } from "../routesComponents/settings/UpdateAccount";
import { User } from "@/types/User";
import { DeleteAccount } from "@/routesComponents/settings/DeleteAccount";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const [user, setUser] = useState<User>();

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

  if (!user) return null;

  return (
    <div className="grid max-w-5xl mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="space-y-5">
        <UpdateAccount user={user} />
        <Separator />
        <DeleteAccount userId={user.id} />
      </section>
    </div>
  );
};

export default Settings;
