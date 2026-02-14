import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">Users</h1>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Email</th>
              <th className="text-left p-4 font-semibold">Role</th>
              <th className="text-left p-4 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="p-4 font-medium">{user.name || "-"}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.role === "ADMIN" ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
