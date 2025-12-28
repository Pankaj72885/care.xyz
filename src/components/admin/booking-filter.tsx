"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus } from "@prisma/client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function BookingFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [service, setService] = useState(searchParams.get("service") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [status, setStatus] = useState<string>(
    searchParams.get("status") || "ALL"
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (service) params.set("service", service);
    if (location) params.set("location", location);
    if (date) params.set("date", date);
    if (status && status !== "ALL") params.set("status", status);

    router.push(`/admin/bookings?${params.toString()}`);
  };

  const handleReset = () => {
    setService("");
    setLocation("");
    setDate("");
    setStatus("ALL");
    router.push("/admin/bookings");
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">Service</label>
        <Input
          placeholder="Service title..."
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input
          placeholder="District, City..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex-1 space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="w-full space-y-2 sm:w-[150px]">
        <label className="text-sm font-medium">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            {Object.values(BookingStatus).map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSearch} size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleReset} size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
