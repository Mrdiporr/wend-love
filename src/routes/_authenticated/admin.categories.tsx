import { createFileRoute } from "@tanstack/react-router";
import { AdminCategories } from "@/components/admin/AdminCategories";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: AdminCategories,
});
