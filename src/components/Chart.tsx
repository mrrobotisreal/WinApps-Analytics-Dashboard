"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarData { label: string; value: number }
export default function Chart({ data }: { data: BarData[] }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 400, height = 200;
    const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)!]).range([height, 0]);
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.append("g")
       .selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("x", d => x(d.label)!)
       .attr("y", d => y(d.value))
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.value))
       .attr("class", "fill-sky-500");
  }, [data]);
  return <svg ref={ref} />;
}