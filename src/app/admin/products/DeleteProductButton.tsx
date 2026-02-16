"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "./actions";

interface DeleteProductButtonProps {
  id: string;
}

export function DeleteProductButton({ id }: DeleteProductButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      startTransition(async () => {
        await deleteProduct(id);
        router.refresh();
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
      onClick={handleDelete}
      disabled={isPending}
      isLoading={isPending}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}
