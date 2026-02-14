"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function MarkAsReadButton({ messageId }: { messageId: string }) {
  const router = useRouter();

  async function handleMarkRead() {
    await fetch(`/api/admin/messages/${messageId}`, { method: "PATCH" });
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleMarkRead}
      className="mt-2"
    >
      Mark as Read
    </Button>
  );
}
