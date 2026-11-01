import { Compass, ShieldCheck, Sparkles, Users, type LucideIcon } from "lucide-react"

import { cn } from "cn"

type Feature = {
  title: string
  description: string
  icon: LucideIcon
  iconClass: string
  featured?: boolean
}

const features: Feature[] = [
  {
    title: "Grassroots Initiatives",
    description:
      "Empower every individual to launch local cleanups, clothing drives, or food distribution events seamlessly.",
    icon: Users,
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
  {
    title: "Instant Event Signup",
    description:
      "Join verified social welfare campaigns with one tap and connect directly with field coordinators.",
    icon: Sparkles,
    iconClass:
      "bg-purple-100 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
  },
  {
    title: "Organizer Hub",
    description:
      "Full control to manage volunteer rosters, update event logistics, and monitor real-time impact metrics.",
    icon: ShieldCheck,
    iconClass:
      "bg-teal-100 text-teal-600 dark:bg-teal-400/10 dark:text-teal-400",
    featured: true,
  },
  {
    title: "Real-Time Drive Feed",
    description:
      "Smart filters highlight active and upcoming local campaigns so you never miss a chance to contribute.",
    icon: Compass,
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
  },
]

export function Features() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
            Platform Features
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Empowering Local Social Impact
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            A seamless ecosystem designed to connect dedicated volunteers with
            real-world community initiatives instantly.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={cn(
                "rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md",
                feature.featured
                  ? "border-emerald-400 shadow-sm shadow-emerald-200/60 dark:border-emerald-400/50 dark:shadow-black/20"
                  : "border-border/80"
              )}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl",
                  feature.iconClass
                )}
              >
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
