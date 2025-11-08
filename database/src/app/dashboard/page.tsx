import { getUserData } from "@/lib/action/serverAction";
interface User {
  id: number;
  name: string;
  email: string;
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">ID:</span> {user.id}
        </p>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const users = await getUserData();

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No user found. Please sign in first.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Dashboard</h2>
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
