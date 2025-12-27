import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Your account details and personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <p className="text-muted-foreground text-sm">{session.user.name}</p>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Email</label>
            <p className="text-muted-foreground text-sm">
              {session.user.email}
            </p>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Role</label>
            <p className="text-muted-foreground text-sm capitalize">
              {session.user.role}
            </p>
          </div>
        </CardContent>
      </Card>

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
