import * as d3 from "d3";
import { feature } from "topojson-client";
import useD3 from "../hooks/useD3";
import worldTopology from "world-atlas/countries-110m.json" assert { type: "json" };
import countries from "i18n-iso-countries";

interface Stat {
  country: string;
  views: number;
}

// export default function CountryMap({ stats }: { stats: Stat[] }) {
//   const ref = useD3(
//     (svg) => {
//       /* ── dimensions & projection ── */
//       const w = 680,
//         h = 340;
//       const projection = d3
//         .geoMercator()
//         .scale(110)
//         .translate([w / 2, h / 1.55]);
//       const path = d3.geoPath().projection(projection);

//       /* ── lookup table ── */
//       const viewsByISO = new Map(
//         stats.map((d) => [d.country.trim().toUpperCase(), d.views])
//       );
//       const byISO = new Map(
//         stats.map((s) => [s.country.trim().toUpperCase(), s.views])
//       );
//       const max = d3.max(stats, (d) => d.views) ?? 1;

//       /* ── on-brand colour scale (opacity ramp) ── */
//       const cssPrimary =
//         getComputedStyle(document.documentElement)
//           .getPropertyValue("--tw-prose-bold")
//           .trim() || "#14b8a6"; // fallback teal

//       const base = d3.color(cssPrimary)!; // non-null (fallback guarantees)
//       const start = base.copy({ opacity: 0.15 }).formatHex();
//       const end = base.copy({ opacity: 1 }).formatHex();

//       const colour = d3
//         .scaleLinear<string>()
//         .domain([0, max])
//         .interpolate(d3.interpolateRgb)
//         .range([start, end]);

//       /* ── TopoJSON → FeatureCollection ── */
//       const world = feature(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         worldTopology as any,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (worldTopology as any).objects.countries
//       ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

//       /* ── draw countries ── */
//       svg
//         .append("g")
//         .selectAll("path")
//         .data(world.features)
//         .join("path")
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         .attr("d", path as any)
//         .attr("fill", (d) => {
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           const isoRaw = (d.properties as any)?.iso_a2 as string | undefined;
//           const iso = isoRaw ? isoRaw.trim().toUpperCase() : "";
//           const v = byISO.get(iso);

//           // **** DEBUG – log misses once ****
//           if (v === undefined && iso) {
//             console.warn(`No data for ISO code "${iso}"`);
//             // Remove the line above once you’ve verified matches.
//           }

//           return v !== undefined ? colour(v) : "transparent";
//           // const iso = (d.properties as any).iso_a2 as string;
//           // return colour(viewsByISO.get(iso) ?? 0);
//         })
//         .attr("stroke", "var(--tw-prose-invert)")
//         .attr("stroke-width", 0.4);

//       /* ── tooltip (body-level div) ── */
//       const tip = d3
//         .select("body")
//         .append("div")
//         .attr(
//           "class",
//           "fixed z-50 rounded-md bg-background px-3 py-1.5 text-xs shadow-lg " +
//             "border border-border hidden"
//         );

//       svg
//         .selectAll("path")
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         .on("mousemove", (e, d: any) => {
//           const isoNum = (d.id as number).toString();
//           const views = viewsByISO.get(isoNum) ?? 0;
//           tip
//             .html(
//               `<strong>${
//                 d.properties.name
//               }</strong><br>${views.toLocaleString()} views`
//             )
//             .style("left", `${e.pageX + 12}px`)
//             .style("top", `${e.pageY + 12}px`)
//             .classed("hidden", false);
//         })
//         .on("mouseleave", () => tip.classed("hidden", true));
//     },
//     [stats]
//   );

//   return <svg ref={ref} width={680} height={340} className="select-none" />;
// }

export default function CountryMap({ stats }: { stats: Stat[] }) {
  const ref = useD3(
    (svg) => {
      /* ---------- projection ---------- */
      const w = 720,
        h = 380;
      const projection = d3
        .geoMercator()
        .scale(115)
        .translate([w / 2, h / 1.6]);
      const path = d3.geoPath().projection(projection);

      /* ---------- data lookup ---------- */
      const toNum = (iso2: string) =>
        countries.alpha2ToNumeric(iso2)?.toString().padStart(3, "0");

      const viewsByNum = new Map(
        stats.map((s) => [toNum(s.country.toUpperCase()), s.views])
      );
      const max = d3.max(stats, (s) => s.views) ?? 1;

      /* ---------- colour scale ---------- */
      const teal = d3.color("#f64c00")!;
      const ramp = d3
        .scaleLinear<string>()
        .domain([0, max])
        .range([
          teal.copy({ opacity: 0.15 }).formatRgb(),
          teal.copy({ opacity: 1 }).formatRgb(),
        ]);

      /* ---------- convert topojson ---------- */
      const world = feature(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        worldTopology as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (worldTopology as any).objects.countries
      ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

      /* ---------- draw ---------- */
      const paths = svg
        .append("g")
        .selectAll("path")
        .data(world.features)
        .join("path")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", path as any)
        .attr("fill", (d) => ramp(viewsByNum.get(d.id as string) ?? 0))
        .attr("stroke", "#222")
        .attr("stroke-width", 0.4);

      /* ---------- tooltip ---------- */
      const tip = d3
        .select("body")
        .append("div")
        .attr(
          "class",
          "fixed z-50 rounded bg-background text-xs px-3 py-1.5 shadow-lg border hidden"
        );

      paths
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("mousemove", (e, d: any) => {
          const v = viewsByNum.get(d.id as string) ?? 0;
          tip
            .html(
              `<strong>${
                d.properties.name
              }</strong><br>${v.toLocaleString()} views`
            )
            .style("left", `${e.pageX + 12}px`)
            .style("top", `${e.pageY + 12}px`)
            .classed("hidden", false);
        })
        .on("mouseleave", () => tip.classed("hidden", true));
    },
    [stats]
  );

  return <svg ref={ref} width={720} height={380} />;
}
