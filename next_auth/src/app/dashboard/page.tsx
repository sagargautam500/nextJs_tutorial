import { auth } from "@/auth";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  const session = auth();
  return <div>
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard page!</p>
    {/* <p>User: {session?.user?.name}</p>
    <p>Email: {session?.user?.email}</p> */}
  </div>;
}
