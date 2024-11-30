// eslint-disable-next-line no-unused-vars
import React from 'react';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import Filters from '../components/filters/Filters';
import LineageDiagram from '../components/flow/LineageFlow';
import Map from '../components/map/Map';


function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Sales Data Visualization</h1>
      
      <div className="flex flex-col lg:flex-row justify-between mb-8">
        {/* Bar Chart Section */}
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 mx-2 mb-4 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Sales Data Overview</h2>
          <div className="h-full lg:h-96">
            <BarChart className="w-full h-full" />
          </div>
        </div>
        
        {/* Pie Chart Section */}
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 mx-2">
          <h2 className="text-2xl font-semibold mb-4">Sales Data By Region</h2>
          <div className="h-full lg:h-96">
            <PieChart className="w-full h-full" />
          </div>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filters By Region</h2>
        <Filters />
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Locations on Map</h2>
        <Map />
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lineage Visualization - Region &rarr; Country &rarr; City</h2>
        <LineageDiagram />
      </div>
    </div>
  );
}

export default Dashboard;