import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-full overflow-hidden bg-white py-12 md:py-20 lg:py-24 xl:py-32 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
              <ShieldCheck className="mr-2 h-4 w-4" />
              #1 Trusted Care Platform in Bangladesh
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Professional Care <br className="hidden lg:inline" />
              <span className="text-primary">At Your Doorstep</span>
            </h1>
            <p className="max-w-[600px] text-lg leading-relaxed text-gray-500 md:text-xl dark:text-gray-400">
              Find trusted caregivers for elderly parents, babies, and patients.
              Verified professionals, secure booking, and compassionate service.
            </p>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-lg shadow-lg shadow-blue-500/20"
              >
                <Link href="/services">Find a Caregiver</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-12 px-8 text-lg"
              >
                <Link href="/about">How it Works</Link>
              </Button>
            </div>

            <div className="grid w-full max-w-md grid-cols-2 gap-4 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-white bg-gray-100 shadow-2xl lg:aspect-4/3 dark:border-zinc-800 dark:bg-zinc-800">
              <Image
                src="/hero.jpg"
                alt="Care.xyz - Professional Caregiving Services"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="animate-bounce-slow absolute -bottom-6 -left-6 hidden items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-xl md:bottom-10 md:-left-12 md:flex dark:border-zinc-800 dark:bg-zinc-900">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Caregivers
                </p>
                <p className="text-lg font-bold">500+ Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
