import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './ClusterGraph.css';
import { ClusterPoint } from '../../types/SingleBlockGraph';

interface Props {
    data: ClusterPoint[];
    width: number;
    height: number;
}

export default function ClusterGraph({ width, height, data }: Props) {
    useEffect(() => {
        const maxSize = Math.max(...data.map((o) => o.size));
        const radiusScale = d3.scaleSqrt().domain([1, maxSize]).range([0, 10]);

        const forceX = d3
            .forceX(function (d: any) {
                if (d.group === 'inputs') {
                    return width / 2;
                } else if (d.group === 'kernels') {
                    return width / 2 + 50;
                } else {
                    return width / 2 + 130;
                }
            })
            .strength(0.1);
        const simulation = d3
            .forceSimulation()
            .force('x', forceX)
            .force('y', d3.forceY(height / 2).strength(0.1))
            .force(
                'collide',
                d3
                    .forceCollide(function (d: any) {
                        return maxSize >= 500 ? radiusScale(d.size) / 2 + 1 : radiusScale(d.size) * 2 + 1;
                    })
                    .iterations(1)
            )
            .alphaDecay(0.1);

        function ready(dataPoints) {
            const svg = d3
                .select('#chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .append('g')
                .attr('transform', 'translate(0, 0)');

            const tooltip = d3
                .select('#chart')
                .append('div')
                .style('opacity', 0)
                .attr('class', 'tooltip')
                .style('background-color', 'black')
                .style('border-radius', '5px')
                .style('padding', '10px')
                .style('color', 'white');
            const showTooltip = function (this: any, d) {
                tooltip.transition().duration(200);
                tooltip
                    .style('opacity', 1)
                    .html(d.tooltip)
                    .style('left', d3.mouse(this)[0] + 30 + 'px')
                    .style('top', d3.mouse(this)[1] + 30 + 'px');
            };
            const moveTooltip = function (this: any, d) {
                tooltip.style('left', d3.mouse(this)[0] + 30 + 'px').style('top', d3.mouse(this)[1] + 30 + 'px');
            };
            const hideTooltip = function (d) {
                tooltip.transition().duration(200).style('opacity', 0);
            };

            const circles = svg
                .selectAll('bubble')
                .data(dataPoints)
                .enter()
                .append('circle')
                .attr('class', 'bubble')
                .attr('r', function (d: any) {
                    return maxSize >= 500 ? radiusScale(d.size) / 2 : radiusScale(d.size) * 4;
                })
                .attr('fill', function (d: any) {
                    return d.color;
                })
                .attr('cx', 100)
                .attr('cy', 100)
                .on('mouseover', showTooltip)
                .on('mousemove', moveTooltip)
                .on('mouseleave', hideTooltip);

            function ticked() {
                circles
                    .attr('cx', function (d: any) {
                        return d.x;
                    })
                    .attr('cy', function (d: any) {
                        return d.y;
                    });
            }
            simulation.nodes(dataPoints).on('tick', ticked);
        }

        data && data.length > 0 && ready(data);
    }, [data, width, height]);

    return <div id="chart" />;
}
