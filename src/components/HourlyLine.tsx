import * as d3 from "d3";
import useD3 from "../hooks/useD3";

interface Point {
  hour: string;
  count: number;
}

export default function HourlyArea({ points }: { points: Point[] }) {
  const ref = useD3(
    (svg) => {
      const w = 720,
        h = 380,
        m = { top: 20, right: 30, bottom: 30, left: 40 };

      const parse = d3.isoParse;
      const x = d3
        .scaleTime()
        .domain(d3.extent(points, (d) => parse(d.hour)!) as [Date, Date])
        .range([m.left, w - m.right]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(points, (d) => d.count) ?? 0])
        .nice()
        .range([h - m.bottom, m.top]);

      /* ── AREA + LINE ───────────────────────────── */
      const area = d3
        .area<Point>()
        .x((d) => x(parse(d.hour)!))
        .y0(y(0))
        .y1((d) => y(d.count))
        .curve(d3.curveMonotoneX);

      const line = d3
        .line<Point>()
        .x((d) => x(parse(d.hour)!))
        .y((d) => y(d.count))
        .curve(d3.curveMonotoneX);

      // shaded area
      svg
        .append("path")
        .datum(points)
        .attr("d", area)
        .attr("class", "fill-primary/30");

      // outline
      svg
        .append("path")
        .datum(points)
        .attr("d", line)
        .attr("class", "stroke-primary stroke-[2px] fill-none");

      /* ── AXES ─────────────────────────────────── */
      svg
        .append("g")
        .attr("transform", `translate(0,${h - m.bottom})`)
        .call(d3.axisBottom(x).ticks(6));

      svg
        .append("g")
        .attr("transform", `translate(${m.left},0)`)
        .call(d3.axisLeft(y).ticks(5));

      // ① circle marker
      const focus = svg
        .append("circle")
        .attr("r", 4)
        .attr(
          "class",
          "fill-primary stroke-background stroke-[2px] pointer-events-none"
        )
        .style("opacity", 0);

      // ② tooltip div
      const tip = d3
        .select("body")
        .append("div")
        .attr(
          "class",
          "fixed z-50 rounded-md bg-background px-3 py-1.5 text-xs shadow-lg border border-border hidden"
        );

      // ③ invisible overlay to capture mouse
      svg
        .append("rect")
        .attr("x", m.left)
        .attr("y", m.top)
        .attr("width", w - m.left - m.right)
        .attr("height", h - m.top - m.bottom)
        .attr("fill", "transparent")
        .on("mousemove", (e) => {
          const [mx] = d3.pointer(e);
          const xDate = x.invert(mx);

          // bisect to nearest data point
          const i = d3
            .bisector((d: Point) => new Date(d.hour))
            .center(points, xDate);
          const p = points[i];

          focus
            .attr("cx", x(new Date(p.hour)))
            .attr("cy", y(p.count))
            .style("opacity", 1);

          tip
            .style("left", `${e.pageX + 12}px`)
            .style("top", `${e.pageY + 12}px`)
            .html(
              `
            <strong>${d3.timeFormat("%b %d %H:%M")(
              new Date(p.hour)
            )}</strong><br>
            ${p.count.toLocaleString()} events
          `
            )
            .classed("hidden", false);
        })
        .on("mouseleave", () => {
          focus.style("opacity", 0);
          tip.classed("hidden", true);
        });
    },
    [points]
  );

  return <svg ref={ref} width={720} height={380} />;
}
