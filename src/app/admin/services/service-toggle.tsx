"use client";

import { toggleServiceStatus } from "@/app/actions/admin";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
// import { toast } from "sonner"; // If you have toast installed, otherwise console log or ignore

export function ServiceToggle({
  serviceId,
  initialActive,
}: {
  serviceId: string;
  initialActive: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleServiceStatus(serviceId);
        // toast.success("Service status updated");
      } catch (error) {
        // toast.error("Failed to update status");
        console.error(error);
      }
    });
  };

  return (
    <Switch
      checked={initialActive}
      onCheckedChange={handleToggle}
      disabled={isPending}
      aria-label="Toggle service status"
    />
  );
}
