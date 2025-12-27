import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { ServiceToggle } from "./service-toggle";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bookings: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Link href="/admin/services/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Service
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Base Rate</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  No services found.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell>BDT {service.baseRate}</TableCell>
                  <TableCell>{service._count.bookings}</TableCell>
                  <TableCell>
                    <ServiceToggle
                      serviceId={service.id}
                      initialActive={service.active}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/services/${service.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/services/${service.id}/delete`}>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
