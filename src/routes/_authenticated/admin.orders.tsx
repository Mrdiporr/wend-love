import { createFileRoute } from "@tanstack/react-router";
import { AdminOrders } from "@/components/admin/AdminOrders";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: () => <AdminOrders />,
});
