import React, {useEffect} from 'react';
import * as d3 from 'd3';
import * as d3Array from 'd3-array';
import './ClusterGraph.css';
import {ClusterPoint, Children} from '../../types/SingleBlockGraph';

interface Props {
    data: ClusterPoint[];
    width: number;
    height: number;
}

export default function ClusterGraph({ width, height, data }: Props) {
    useEffect(() => {
        const groups = {},
            childGroups: Children = { children: [] };

        data.forEach(function (item) {
            const list = groups[item.group];
            if (list) {
                list.push(item);
            } else {
                groups[item.group] = [item];
            }
        });
        
        for (const property in groups) {
            if (groups.hasOwnProperty(property)) {
                const children = {
                    children: groups[property]
                };
                childGroups.children.push(children);
            }
        }

        const pack = () =>
            d3.pack().size([width, height]).padding(1)(d3.hierarchy(childGroups).sum((d: any) => d.size));
        let nodes: any = pack().leaves();

        const simulation = d3
            .forceSimulation(nodes)
            .force('x', d3.forceX(width / 2).strength(0.1))
            .force('y', d3.forceY(height / 2).strength(0.1))
            .force('cluster', forceCluster())
            .force('collide', forceCollide());

        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('class', 'clusterGraph')
            .attr('width', width)
            .attr('height', height)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .append('g')
            .attr('transform', 'translate(0, 0)');

        const tooltip = d3
            .select('#chart')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('background-color', '#ececec')
            .style('border-radius', '5px')
            .style('padding', '8px');

        const showTooltip = function (this: any, d) {
            tooltip.transition().duration(200);
            tooltip
                .style('opacity', 0.8)
                .html(d.data.tooltip)
                .style('left', d3.mouse(this)[0] + 30 + 'px')

                .style('top', d3.mouse(this)[1] + 30 + 'px')
                .style('color', d.data.color);
        };
        const moveTooltip = function (this: any, d) {
            tooltip.style('left', d3.mouse(this)[0] + 30 + 'px').style('top', d3.mouse(this)[1] + 30 + 'px');
        };
        const hideTooltip = function (d) {
            tooltip.transition().duration(200).style('opacity', 0);
        };

        const node = svg
            .append('g')
            .selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('class', 'bubble')
            .attr('cx', (d: any) => d.data.x)
            .attr('cy', (d: any) => d.data.y)
            .attr('fill', (d: any) => d.data.color)
            .attr('r', (d: any) => d.r)
            .on('mouseover', showTooltip)
            .on('mousemove', moveTooltip)
            .on('mouseleave', hideTooltip);

        node.transition()
            .delay((d, i) => Math.random() * 500)
            .duration(750)
            .attrTween('r', (d: any) => {
                const i = d3.interpolate(0, d.r);
                return (t) => (d.r = i(t));
            });

        simulation.on('tick', () => {
            node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
        });

        function forceCluster() {
            const strength = 0.2;

            function force(alpha) {
                const centroids: any = d3Array.rollup(nodes, centroid, (d: any) => d.data.group);
                const l = alpha * strength;
                for (const d of nodes) {
                    const { x: cx, y: cy } = centroids.get(d.data.group);
                    d.vx -= (d.x - cx) * l;
                    d.vy -= (d.y - cy) * l;
                }
            }

            force.initialize = (_) => (nodes = _);

            return force;
        }

        function forceCollide() {
            const alpha = 0.4; // fixed for greater rigidity!
            const padding1 = 2; // separation between same-color nodes
            const padding2 = 6; // separation between different-color nodes
            let maxRadius;

            function force() {
                const quadTree = d3.quadtree(
                    nodes,
                    (d: any) => d.x,
                    (d) => d.y
                );
                for (const d of nodes) {
                    const r = d.r + maxRadius;
                    const nx1 = d.x - r,
                        ny1 = d.y - r;
                    const nx2 = d.x + r,
                        ny2 = d.y + r;
                    quadTree.visit((q: any, x1, y1, x2, y2) => {
                        if (!q.length)
                            do {
                                if (q.data !== d) {
                                    const r =
                                        d.r + q.data.r + (d.data.group === q.data.data.group ? padding1 : padding2);
                                    let x = d.x - q.data.x,
                                        y = d.y - q.data.y,
                                        l = Math.hypot(x, y);
                                    if (l < r) {
                                        l = ((l - r) / l) * alpha;
                                        return ((d.x -= x *= l), (d.y -= y *= l), (q.data.x += x), (q.data.y += y));
                                    }
                                }
                            } while ((q = q.next));
                        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                }
            }

            force.initialize = (_) => (maxRadius = Math.max(...nodes.map((o) => o.r)) + Math.max(padding1, padding2));

            return force;
        }

        function centroid(nodes) {
            let x = 0;
            let y = 0;
            let z = 0;
            for (const d of nodes) {
                const k = d.r ** 2;
                x += d.x * k;
                y += d.y * k;
                z += k;
            }
            return { x: x / z, y: y / z };
        }
    }, [data, width, height]);

    return <div id="chart" />;
}
