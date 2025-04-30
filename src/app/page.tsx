"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import AppSidebar from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// import { useEventTotals, useEventsByHour } from "@/lib/api";
import EventBar from "@/components/EventBarChart";
import HourlyLine from "@/components/HourlyLine";
import CountryMap from "@/components/CountryMap";
// import Funnel from "@/components/Funnel";
// import Heatmap from "@/components/Heatmap";
// import Scatter from "@/components/Scatter";

const eventTotals = {
  page_view: 2134,
  click: 587,
  scroll: 902,
  signup: 31,
  purchase: 7,
};
const eventsByHour = [
  { hour: "2025-04-28T04:00:00Z", count: 83 },
  { hour: "2025-04-28T05:00:00Z", count: 91 },
  { hour: "2025-04-28T06:00:00Z", count: 77 },
  { hour: "2025-04-28T07:00:00Z", count: 69 },
  { hour: "2025-04-28T08:00:00Z", count: 112 },
  { hour: "2025-04-28T09:00:00Z", count: 138 },
  { hour: "2025-04-28T10:00:00Z", count: 166 },
  { hour: "2025-04-28T11:00:00Z", count: 192 },
  { hour: "2025-04-28T12:00:00Z", count: 178 },
  { hour: "2025-04-28T13:00:00Z", count: 154 },
  { hour: "2025-04-28T14:00:00Z", count: 121 },
  { hour: "2025-04-28T15:00:00Z", count: 97 },
];
const countriesData = [
  { country: "US", views: 8142 },
  { country: "CA", views: 1175 },
  { country: "UA", views: 932 },
];
// const funnelData = [
//   { "step": "Landing page",       "count": 5000 },
//   { "step": "Sign-up started",    "count": 1400 },
//   { "step": "Email verified",     "count":  820 },
//   { "step": "First project made", "count":  540 },
//   { "step": "Upgraded to paid",   "count":  110 }
// ];
// const heatmapData = [
// ];
// function getRandomIntInclusive(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// (function() {
//   // This generates heatmap data for the last 7 days
//   const now = new Date();
//   for (let d = 0; d < 7; d++) {
//     const day = new Date(now);
//     day.setDate(now.getDate() - d);
//     for (let h = 0; h < 24; h++) {
//       const randomNumber = getRandomIntInclusive(1, 600);
//       heatmapData.push({
//         "day": d,
//         "hour": h,
//         "count": getRandomIntInclusive(0, randomNumber)
//       });
//     }
//   }
//   // Sort by day and hour
//   heatmapData.sort((a, b) => a.day - b.day || a.hour - b.hour);

// })();

// const scatterData = [
//   { "loadMs":  400, "timeSec": 35  },
//   { "loadMs":  850, "timeSec": 12  },
//   { "loadMs": 1300, "timeSec":  7  },
//   { "loadMs":  220, "timeSec": 58  },
//   { "loadMs":  610, "timeSec": 24  },
//   { "loadMs": 1050, "timeSec": 14  },
//   { "loadMs":  330, "timeSec": 46  }
// ];

export default function Home() {
  const router = useRouter();
  // const { data: totals, isLoading: l1 } = useEventTotals();
  // const l1 = false;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/auth");
    });
    return () => unsub();
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="win-section space-y-6 animate-fade-in zoom-95">
          <h1 className="win-section-title text-primary">Dashboard</h1>
          <Card>
            <CardContent className="p-6 space-y-12">
              {/* Totals bar chart */}
              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Events in the last 24 h</CardTitle>
                  <CardDescription>
                    Quick breakdown by event type
                  </CardDescription>
                </CardHeader>
                <EventBar data={eventTotals} />
              </section>

              {/* Hourly time-series */}
              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Traffic by Hour</CardTitle>
                  <CardDescription>
                    Spikes &amp; lulls throughout the day
                  </CardDescription>
                </CardHeader>
                <HourlyLine points={eventsByHour} />
              </section>

              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Where are visitors coming from?</CardTitle>
                  <CardDescription>
                    30-day session volume by country
                  </CardDescription>
                </CardHeader>
                <CountryMap stats={countriesData} />
              </section>

              {/* <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Conversion funnel</CardTitle>
                  <CardDescription>Drop-off at each step over the last 30 days</CardDescription>
                </CardHeader>
                <Funnel steps={funnelData} />
              </section>

              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Traffic heatmap</CardTitle>
                  <CardDescription>Sessions by weekday and hour</CardDescription>
                </CardHeader>
                <Heatmap data={heatmapData} />
              </section>

              <section className="space-y-2">
                <CardHeader className="p-0">
                  <CardTitle>Performance vs. engagement</CardTitle>
                  <CardDescription>Does page-load speed affect time-on-page?</CardDescription>
                </CardHeader>
                <Scatter pts={scatterData} />
              </section> */}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
