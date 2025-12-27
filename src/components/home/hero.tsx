import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full border-b bg-gray-50 py-12 md:py-24 lg:py-32 xl:py-48 dark:bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl/none">
              Professional Care at Your Doorstep
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Trusted caregivers for elderly, baby calling, and post-operative
              support. Book verified professionals instantly in Bangladesh.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/services">Book a Service</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
