import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { adminGetSettings, adminSaveSettings } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

type Form = {
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_note: string;
  whatsapp_number: string;
};

export function AdminSettings() {
  const getSettings = useServerFn(adminGetSettings);
  const saveSettings = useServerFn(adminSaveSettings);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => getSettings(),
  });

  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    if (data && !form) {
      setForm({
        bank_account_name: data.bank_account_name,
        bank_account_number: data.bank_account_number,
        bank_name: data.bank_name,
        bank_note: data.bank_note,
        whatsapp_number: data.whatsapp_number,
      });
    }
  }, [data, form]);

  const save = useMutation({
    mutationFn: (values: Form) => saveSettings({ data: { id: data!.id, ...values } }),
    onSuccess: () => {
      toast.success("Settings saved.");
      void queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      void queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isPending || !form) return <Skeleton className="h-80 w-full max-w-lg rounded-[1rem]" />;

  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(form);
      }}
    >
      <div className="space-y-2">
        <Label>WhatsApp number</Label>
        <Input
          value={form.whatsapp_number}
          onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Bank name</Label>
        <Input value={form.bank_name} onChange={(e) => setForm({ ...form, bank_name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Account name</Label>
        <Input
          value={form.bank_account_name}
          onChange={(e) => setForm({ ...form, bank_account_name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Account number</Label>
        <Input
          value={form.bank_account_number}
          onChange={(e) => setForm({ ...form, bank_account_number: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Transfer note shown at checkout</Label>
        <Textarea
          rows={3}
          value={form.bank_note}
          onChange={(e) => setForm({ ...form, bank_note: e.target.value })}
        />
      </div>
      <Button type="submit" disabled={save.isPending}>
        {save.isPending ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
