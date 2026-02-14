import { prisma } from "@/lib/db";
import { MarkAsReadButton } from "@/components/admin/MarkAsReadButton";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold font-display mb-8">Contact Messages</h1>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left p-4 font-semibold">From</th>
              <th className="text-left p-4 font-semibold">Subject</th>
              <th className="text-left p-4 font-semibold">Date</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className={`border-b border-gray-100 dark:border-gray-800 ${
                  !msg.read ? "bg-rose-50/30 dark:bg-rose-950/10" : ""
                }`}
              >
                <td className="p-4">
                  <p className="font-medium">{msg.name}</p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </td>
                <td className="p-4">
                  <p className="line-clamp-1">{msg.subject || "—"}</p>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(msg.createdAt).toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      msg.read ? "bg-gray-100 text-gray-600" : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {msg.read ? "Read" : "New"}
                  </span>
                </td>
                <td className="p-4">
                  <details className="group">
                    <summary className="cursor-pointer text-rose-500 font-medium hover:underline">
                      View
                    </summary>
                    <div className="mt-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm whitespace-pre-wrap">
                      {msg.message}
                    </div>
                    {!msg.read && (
                      <MarkAsReadButton messageId={msg.id} />
                    )}
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No contact messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
