import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Care.xyz",
  description:
    "Get in touch with Care.xyz. We are here to answer your questions and help you find the best care for your loved ones.",
  openGraph: {
    title: "Contact Care.xyz - We're Here to Help",
    description:
      "Have questions? Get in touch with our team for support regarding our caregiving services.",
    siteName: "Care.xyz",
    locale: "en_BD",
    type: "website",
    images: ["/og-contact.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Care.xyz - Customer Support",
    description:
      "Have questions? Get in touch with our team for support regarding our caregiving services.",
    images: ["/og-contact.jpg"],
    creator: "@carexyz",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <Badge className="mb-4" variant="secondary">
            Contact Us
          </Badge>
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
            Have questions about our services or need assistance? Our team is
            here to help you 24/7.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="text-primary h-5 w-5" /> Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">+880 123 456 7890</p>
                <p className="text-muted-foreground text-sm">
                  Mon-Fri, 9am-6pm
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="text-primary h-5 w-5" /> Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">support@care.xyz</p>
                <p className="text-muted-foreground text-sm">
                  We reply within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary h-5 w-5" /> Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Anywhere in Dhaka</p>
                <p className="text-muted-foreground text-sm">
                  Dhaka, Bangladesh
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
