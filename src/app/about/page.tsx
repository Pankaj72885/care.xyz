import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
  Star,
  Users2,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Care.xyz - Professional Caregiving Services",
  description:
    "Learn about Care.xyz's mission to connect families with verified, compassionate caregivers. We provide trusted elderly care, baby sitting, and nursing services.",
  openGraph: {
    title: "About Care.xyz - Professional Caregiving Services",
    description:
      "Learn about Care.xyz's mission to connect families with verified, compassionate caregivers.",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
    images: ["/og-about.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Care.xyz - Professional Caregiving Services",
    description:
      "Learn about Care.xyz's mission to connect families with verified, compassionate caregivers.",
    images: ["/og-about.jpg"],
    creator: "@carexyz",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="secondary">
              Our Mission
            </Badge>
            <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Caring for Your Loved Ones <br className="hidden sm:inline" />
              <span className="text-primary mt-2 inline-block">
                Like Our Own
              </span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
              We are dedicated to bridging the gap between families and trusted
              care professionals. Everyone represents a story, a life, and a
              legacy worth preserving with dignity and compassion.
            </p>
          </div>
        </div>

        {/* Decorative background elements if needed */}
        <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 rounded-full opacity-30 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 border-y py-12">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 md:px-6">
          <div className="space-y-2">
            <h3 className="text-primary text-3xl font-bold md:text-4xl">
              500+
            </h3>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Verified Caregivers
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary text-3xl font-bold md:text-4xl">2k+</h3>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Families Served
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary text-3xl font-bold md:text-4xl">98%</h3>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Satisfaction Rate
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-primary text-3xl font-bold md:text-4xl">
              24/7
            </h3>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Support Available
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / Vision */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl lg:aspect-square">
              <Image
                src="/about-hero.jpg"
                alt="Caregiver holding hands with senior"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-medium">Compassion in every action.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Who We Are
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Care.xyz started with a simple question: &quot;How can we find
                  reliable care for our own parents?&quot;
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We realized that finding trustworthy help was harder than it
                  should be. That&apos;s why we built a platform that rigorously
                  vets verifies, and trains professionals so you do not have to
                  worry about safety or quality.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we are a community of thousands of families and
                  caregivers, connected by a shared value of empathy and
                  excellence.
                </p>
              </div>

              <div className="pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-1 h-5 w-5 shrink-0" />
                    <div>
                      <h4 className="font-semibold">Rigorous Vetting</h4>
                      <p className="text-muted-foreground text-sm">
                        Background & skill checks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-1 h-5 w-5 shrink-0" />
                    <div>
                      <h4 className="font-semibold">Ongoing Training</h4>
                      <p className="text-muted-foreground text-sm">
                        Continuous skill development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Core Values
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              The principles that guide every interaction on our platform.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <ShieldCheck className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your safety and security are our top priority. We verify every
                  professional so you can welcome them into your home with
                  confidence.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <Heart className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Care is more than a job; it is a calling. We choose caregivers
                  who lead with their hearts and treat your family like their
                  own.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <Star className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We set high standards for service quality. From punctuality to
                  professionalism, we expect nothing but the best.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <Users2 className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We are building a supportive ecosystem where caregivers are
                  respected and families feel supported every step of the way.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <Clock className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  When you book a service, you can count on us. We ensure timely
                  arrivals and consistent care schedules.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background flex flex-col items-center justify-center border-dashed shadow-none">
              <CardContent className="flex flex-col items-center py-8 text-center">
                <h4 className="mb-2 text-xl font-bold">Join Our Team</h4>
                <p className="text-muted-foreground mb-4 text-sm">
                  Are you a passionate care professional?
                </p>
                <Button variant="outline" asChild>
                  <Link href="/register">Register as Caregiver</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Find the Perfect Care?
          </h2>
          <p className="text-muted-foreground mt-4 mb-8 text-xl">
            Browse our verified professionals and book a service today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/services">
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
