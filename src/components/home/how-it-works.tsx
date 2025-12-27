import { CalendarClock, HeartHandshake, Search, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Browse Services",
    description:
      "Explore our verified profiles for elderly, child, and nursing care.",
  },
  {
    icon: UserCheck,
    title: "2. Choose a Caregiver",
    description:
      "View detailed profiles, reviews, and ratings to find your perfect match.",
  },
  {
    icon: CalendarClock,
    title: "3. Schedule & Book",
    description:
      "Select your preferred dates and times. Flexible booking options available.",
  },
  {
    icon: HeartHandshake,
    title: "4. Receive Care",
    description:
      "Our professional arrives at your doorstep to provide compassionate care.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-white py-16 md:py-24 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
            How Care.xyz Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Simple steps to get the care you need.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="text-primary mb-4 rounded-full bg-blue-100 p-4 dark:bg-blue-900/30">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="leading-relaxed text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
