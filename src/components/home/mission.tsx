import { Clock, HandHeart, ShieldCheck } from "lucide-react";

export function Mission() {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32 dark:bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose Care.xyz?
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Our mission is to provide accessible, reliable, and professional
              caregiving services to every household in Bangladesh. We believe
              in dignity, safety, and compassion.
            </p>
          </div>
          <div className="grid gap-4 md:gap-8">
            <div className="bg-background flex flex-col space-y-2 rounded-lg border p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-primary h-6 w-6" />
                <h3 className="text-xl font-bold">Verified Professionals</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Every caregiver undergoes strict background checks and skill
                assessments.
              </p>
            </div>
            <div className="bg-background flex flex-col space-y-2 rounded-lg border p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <HandHeart className="text-primary h-6 w-6" />
                <h3 className="text-xl font-bold">Compassionate Care</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                We treat your family like our own, with respect and empathy.
              </p>
            </div>
            <div className="bg-background flex flex-col space-y-2 rounded-lg border p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="text-primary h-6 w-6" />
                <h3 className="text-xl font-bold">Flexible Booking</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Book for an hour, a day, or a month. We adapt to your schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
