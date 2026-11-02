import { Award, CirclePlus, Sparkles, TreePine, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"
import Link from "next/link"

const stats = [
  {
    value: "12,500+",
    label: "Active Volunteers",
    icon: Users,
    iconClass: "text-emerald-200",
  },
  {
    value: "45,000+",
    label: "Lives & Trees Saved",
    icon: TreePine,
    iconClass: "text-emerald-200",
  },
  {
    value: "320+",
    label: "Completed Campaigns",
    icon: Award,
    iconClass: "text-violet-300",
  },
]

export function Banner() {
  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-4xl bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-500 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-14">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Copy + CTAs */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/25">
            <Sparkles className="size-4" />
            Empowering Community Action
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Drive Social Change.
            <br />
            Transform Communities.
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/90">
            ImpactPulse connects passionate volunteers with non-profits,
            environmental drives, healthcare camps, and literacy programs across
            Bangladesh.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/upcoming-events">
            <Button className="h-11 rounded-xl bg-white px-6 text-emerald-800 hover:bg-emerald-50">
              Explore Upcoming Events
            </Button>
            </Link>
            <Link href="/create-event" >
              <Button className="h-11 rounded-xl border border-white/30 bg-white/10 px-6 text-white hover:bg-white/20">
                <CirclePlus className="size-4" data-icon="inline-start" />
                Create Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats card */}
        <div className="w-full max-w-sm shrink-0 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
          <ul className="flex flex-col gap-5">
            {stats.map((stat) => (
              <li key={stat.label} className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10",
                    stat.iconClass
                  )}
                >
                  <stat.icon className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-lg font-bold">{stat.value}</span>
                  <span className="text-sm text-white/70">{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
