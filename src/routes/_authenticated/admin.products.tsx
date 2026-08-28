import { createFileRoute } from "@tanstack/react-router";
import { AdminProducts } from "@/components/admin/AdminProducts";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: AdminProducts,
});
