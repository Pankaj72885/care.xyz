import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col gap-10">
        {/* Hero Section */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About Care.xyz
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Connecting you with compassionate, professional care services for
            your loved ones. Reliable, secure, and tailored to your needs.
          </p>
        </section>

        {/* Mission Section */}
        <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Care.xyz, we believe that everyone deserves high-quality care,
              whether for elderly parents, growing children, or family members
              with special needs. Our mission is to bridge the gap between
              families and verified care professionals through a seamless,
              trusted platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We strive to bring peace of mind to families by ensuring every
              caregiver is vetted, skilled, and compassionate.
            </p>
          </div>
          <div className="bg-muted/50 relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border">
            <Image
              src="/about-hero.jpg"
              alt="Compassionate caregiver helping elderly person"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Values Section */}
        <section className="space-y-6">
          <h2 className="text-center text-2xl font-bold">Why Choose Us?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Shield className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Every caregiver undergoes a rigorous background check and
                  skill verification process to ensure safety and quality.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Community Trusted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Built on trust and transparency. Read reviews from real
                  families and choose the best match for your needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="text-primary mb-2 h-10 w-10" />
                <CardTitle>Easy Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Our intuitive platform makes finding, booking, and paying for
                  care services simple and hassle-free.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
