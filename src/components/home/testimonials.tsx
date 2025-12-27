import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Working Mom",
    content:
      "The babysitter we found on Care.xyz was a lifesaver. She was professional, kind, and our kids loved her immediately.",
    rating: 5,
  },
  {
    name: "Rahim Chowdhury",
    role: "Son of elderly patient",
    content:
      "My father needed post-surgery care. The nurse we hired was incredibly skilled and compassionate. Highly recommended.",
    rating: 5,
  },
  {
    name: "Fatima Khan",
    role: "Busy Professional",
    content:
      "Booking a cleaning and care service was so easy. The transparency of the profiles gave me peace of mind.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="w-full border-t border-gray-100 bg-gray-50 py-16 md:py-24 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Families
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Hear from people who found the right care with us.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100 dark:text-blue-900/40" />
              <div className="mb-4 flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-6 leading-relaxed text-gray-600 italic dark:text-gray-300">
                &quot;{t.content}&quot;
              </p>
              <div className="mt-auto border-t border-gray-100 pt-6 dark:border-zinc-800">
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  {t.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
