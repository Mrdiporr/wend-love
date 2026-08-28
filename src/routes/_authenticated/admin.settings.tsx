import { createFileRoute } from "@tanstack/react-router";
import { AdminSettings } from "@/components/admin/AdminSettings";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: AdminSettings,
});
