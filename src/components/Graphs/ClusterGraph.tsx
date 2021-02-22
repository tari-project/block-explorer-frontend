import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as d3Array from 'd3-array';
import './ClusterGraph.scss';
import { ClusterPoint, Children } from '../../types/SingleBlockGraph';

interface Props {
    data: ClusterPoint[];
    width: number;
    height: number;
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

function forceCluster(nodes) {
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

function forceCollide(nodes) {
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
                            const r = d.r + q.data.r + (d.data.group === q.data.data.group ? padding1 : padding2);
                            let x = d.x - q.data.x,
                                y = d.y - q.data.y,
                                l = Math.hypot(x, y);
                            if (l < r) {
                                l = ((l - r) / l) * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                q.data.x += x;
                                q.data.y += y;
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

        Object.keys(groups).forEach((property) => {
            const children = {
                children: groups[property]
            };
            childGroups.children.push(children);
        });

        const pack = () =>
            d3.pack().size([width, height]).padding(1)(d3.hierarchy(childGroups).sum((d: any) => d.size));
        const nodes: any = pack().leaves();

        const simulation = d3
            .forceSimulation(nodes)
            .force('x', d3.forceX(width / 2).strength(0.1))
            .force('y', d3.forceY(height / 2).strength(0.1))
            .force('cluster', forceCluster(nodes))
            .force('collide', forceCollide(nodes));

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
            .select('body')
            .append('div')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('color', 'white')
            .style('padding', '8px')
            .style('background-color', '#ececec')
            .style('border-radius', '6px')
            .style('font', '12px sans-serif')
            .text('tooltip');

        const showTooltip = function (d) {
            tooltip.transition().duration(200);
            tooltip.style('visibility', 'visible').html(d.data.tooltip).style('color', d.data.color);
        };
        const moveTooltip = function () {
            tooltip.style('top', d3.event.pageY - 10 + 'px').style('left', d3.event.pageX + 10 + 'px');
        };
        const hideTooltip = function (d) {
            tooltip.style('visibility', 'hidden');
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
            .delay((d, i) => 50)
            .duration(750);

        simulation.on('tick', () => {
            node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
        });
    }, [data, width, height]);

    return <div id="chart" />;
}
