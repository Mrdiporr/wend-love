import { createFileRoute } from "@tanstack/react-router";
import { AdminOrders } from "@/components/admin/AdminOrders";

export const Route = createFileRoute("/_authenticated/admin/payments")({
  component: () => <AdminOrders paymentsOnly />,
});
