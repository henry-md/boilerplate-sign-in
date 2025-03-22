import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import { $user } from "@/store/auth";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

const Dashboard = () => {
  const user = useStore($user);

  useEffect(() => {
    if (user) {
      toast(`Welcome ${user.username}!`, {
        position: "bottom-right",
        toastId: "welcome-toast"
      });
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[100vh]">Dashboard</div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;