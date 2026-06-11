import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">用户设置</h2>
      <SettingsForm />
    </main>
  );
}
