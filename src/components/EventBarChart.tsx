import * as d3 from "d3";
import useD3 from "../hooks/useD3";

type Props = { data: Record<string, number> };

export default function EventBar({ data }: Props) {
  const entries = Object.entries(data);
  const ref = useD3(
    (svg) => {
      const w = 720,
        h = 380,
        margin = { top: 10, right: 20, bottom: 40, left: 40 };

      const x = d3
        .scaleBand()
        .domain(entries.map((d) => d[0]))
        .range([margin.left, w - margin.right])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(entries, (d) => d[1]) || 0])
        .nice()
        .range([h - margin.bottom, margin.top]);

      const tip = d3
        .select("body")
        .append("div")
        .attr(
          "class",
          "fixed z-50 rounded-md bg-background px-3 py-1.5 text-xs shadow-lg border border-border hidden"
        );

      svg
        .append("g")
        .selectAll("rect")
        .data(entries)
        .join("rect")
        .attr("x", (d) => x(d[0])!)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(0) - y(d[1]))
        .attr("width", x.bandwidth())
        .attr("class", "fill-primary hover:opacity-80 transition")
        .on("mousemove", (e, [type, cnt]) => {
          tip
            .style("left", `${e.pageX + 12}px`)
            .style("top", `${e.pageY + 12}px`)
            .html(`<strong>${type}</strong><br>${cnt.toLocaleString()}`)
            .classed("hidden", false);
        })
        .on("mouseleave", () => tip.classed("hidden", true));

      svg
        .append("g")
        .attr("transform", `translate(0,${h - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(6));
    },
    [data]
  );

  return <svg ref={ref} width={720} height={380} />;
}
