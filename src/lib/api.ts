import { useQuery } from "@tanstack/react-query"

export function useEventTotals() {
  return useQuery({
    queryKey: ["eventTotals"],
    queryFn: () => fetch("/api/dashboard").then(r => r.json()),
  })
}

export function useEventsByHour() {
  return useQuery({
    queryKey: ["eventsByHour"],
    queryFn: () => fetch("/api/events-by-hour").then(r => r.json()),
  })
}
