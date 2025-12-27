import { ServiceForm } from "@/components/admin/service-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Service</h1>
      </div>

      <ServiceForm mode="create" />
    </div>
  );
}
