// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Position } from 'react-flow-renderer';
import { useSelector } from 'react-redux';

const LineageDiagram = () => {
  const salesData = useSelector((state) => state.chart.salesData);

  // Transform the data into a hierarchical structure
  const hierarchy = {};

  salesData.forEach(item => {
    const { region, country, city, id } = item;

    if (!hierarchy[region]) {
      hierarchy[region] = {};
    }
    if (!hierarchy[region][country]) {
      hierarchy[region][country] = [];
    }
    hierarchy[region][country].push({ id, city });
  });

  // Convert the hierarchy into nodes and edges for React Flow
  const nodes = [];
  const edges = [];
  let nodeId = 1;

  Object.keys(hierarchy).forEach(region => {
    const regionNode = {
      id: `region-${nodeId}`,
      data: { label: region },
      position: { x: 100, y: nodeId * 300 },
      style: { background: '#f0f0f0' },
      sourcePosition: Position.Right, // Set source position to the right
    };
    nodes.push(regionNode);
    let countryId = 1;

    Object.keys(hierarchy[region]).forEach(country => {
      const countryNode = {
        id: `country-${nodeId}-${countryId}`,
        data: { label: country },
        position: { x: 400, y: nodeId * 300 + countryId * 50 }, // Adjusted x position
        style: { background: '#d0d0d0' },
        sourcePosition: Position.Right, // Set source position to the right
        targetPosition: Position.Left, // Set target position to the left
      };
      nodes.push(countryNode);
      edges.push({ id: `e${regionNode.id}-${countryNode.id}`, source: regionNode.id, target: countryNode.id });

      hierarchy[region][country].forEach(city => {
        const cityNode = {
          id: `city-${city.id}`,
          data: { label: city.city },
          position: { x: 700, y: nodeId * 300 + countryId * 50 + 25 }, // Adjusted x position
          style: { background: '#ffffff' },
          sourcePosition: Position.Right, // Set source position to the right
          targetPosition: Position.Left, // Set target position to the left
        };
        nodes.push(cityNode);
        edges.push({ id: `e${countryNode.id}-${cityNode.id}`, source: countryNode.id, target: cityNode.id });
      });
      countryId++;
    });
    nodeId++;
  });

  return (
    <div className='h-96'>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default LineageDiagram;
