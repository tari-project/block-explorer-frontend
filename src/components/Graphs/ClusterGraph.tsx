import React from 'react';
import * as d3 from 'd3';
import './ClusterGraph.css';

interface Props {
    data: any;
    width: number;
    height: number;
}

export default function ClusterGraph({ width, height, data }: Props) {
    const maxSize = Math.max(...data.map((o) => o.size));
    let radiusScale = d3.scaleSqrt().domain([1, maxSize]).range([0, 10]);

    const forceX = d3
        .forceX(function (d: any) {
            if (d.group === 'inputs') {
                return width/2;
            } else if (d.group === 'kernels') {
                return  width/2 + 50;
            } else {
                return  width/2 + 130;
            }
        })
        .strength(0.1);
    const simulation = d3
        .forceSimulation()
        .force('x', forceX)
        .force('y', d3.forceY(height / 2).strength(0.1))
        .force(
            'collide',
            d3.forceCollide(function (d: any) {
                return radiusScale(d.size) * 4 + 1;
            })
        );

    function ready(dataPoints) {
        const svg = d3
            .select('#chart')
            .append('svg')
            .attr("width",  width )
            .attr("height",  height )
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append('g')
            .attr('transform', 'translate(0, 0)');

        let circles = svg
            .selectAll('bubble')
            .data(dataPoints)
            .enter()
            .append('circle')
            .attr('class', 'bubble')
            .attr('r', function (d: any) {
                return radiusScale(d.size) * 4;
            })
            .attr('fill', function (d: any) {
                return d.color;
            })
            .attr('cx', 100)
            .attr('cy', 100);

        simulation.nodes(dataPoints).on('tick', ticked);

        function ticked() {
            circles
                .attr('cx', function (d: any) {
                    return d.x;
                })
                .attr('cy', function (d: any) {
                    return d.y;
                });
        }
    }

    data && data.length > 0 && ready(data);

    return <div id="chart"/>;
}
