import { getCurrentUser } from "@/app/actions/user";
import { SettingsForm } from "@/components/settings/settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-muted-foreground text-sm">
            Please log in to manage your account settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
      </div>

      <SettingsForm
        user={{
          name: user.name,
          email: user.email,
          role: user.role,
          nid: user.nid,
          contact: user.contact,
          division: user.division,
          district: user.district,
          upazila: user.upazila,
          address: user.address,
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account security and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Additional settings and account management features will be
            available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
