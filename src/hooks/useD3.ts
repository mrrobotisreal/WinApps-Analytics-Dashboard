import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function useD3(
  render: (svg: d3.Selection<SVGGElement, unknown, null, undefined>) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    render(svg.append("g"));
  }, deps);

  return ref;
}