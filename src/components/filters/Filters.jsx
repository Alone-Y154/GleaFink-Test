/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedRegions, setSelectedRegions } from '../../reducers/filters/filters';
import { useSearchParams } from 'react-router-dom';

const Filters = () => {
    const salesData = useSelector((state) => state.chart.salesData);
    const selectedRegions = useSelector((state) => state.filters.selectedRegions);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpToPage, setJumpToPage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    if (!salesData) {
        return <p>Loading...</p>;
    }

    // Get unique regions for filtering
    const uniqueRegions = [...new Set(salesData.map((item) => item.region))];

    // Filter sales data based on selected regions
    const filteredData = selectedRegions.length > 0
        ? salesData.filter((item) => selectedRegions.includes(item.region))
        : salesData; // Show all data if no region is selected

    // Handle checkbox change
    const handleCheckboxChange = (region) => {
        setCurrentPage(1);
        const newSelectedRegions = selectedRegions.includes(region)
            ? selectedRegions.filter((r) => r !== region)
            : [...selectedRegions, region];

        dispatch(setSelectedRegions(newSelectedRegions));
        setSearchParams({ regions: newSelectedRegions.join(',') }); // Update URL
        
        // Close mobile filter on selection
        setIsMobileFilterOpen(false);
    };

    // Sync URL with selected regions on mount and update
    useEffect(() => {
        const regionsFromUrl = searchParams.get('regions');
        if (regionsFromUrl) {
            const regionsArray = regionsFromUrl.split(',');
            dispatch(setSelectedRegions(regionsArray));
        }
    }, [searchParams, dispatch]);

    // Pagination logic
    const itemsPerPage = 10; // Number of items per page
    const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Total number of pages
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    // Handle pagination
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle jump to page
    const handleJumpToPage = () => {
        const pageNumber = Number(jumpToPage);
        if (!isNaN(pageNumber)) {
            handlePageChange(pageNumber);
        }
        setJumpToPage(''); // Clear the input after jumping
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden p-4 bg-gray-100">
                <button 
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {isMobileFilterOpen ? 'Close Filters' : 'Open Filters'}
                </button>
            </div>

            {/* Left Side: Filters - Responsive */}
            <div className={`
                ${isMobileFilterOpen ? 'block' : 'hidden'} 
                md:block 
                md:w-1/4 
                p-4 
                border-r 
                fixed 
                md:static 
                top-0 
                left-0 
                right-0 
                z-50 
                bg-white 
                md:bg-transparent 
                h-full 
                overflow-y-auto
            `}>
                <div className='flex justify-between items-center'>
                    <h2 className="font-bold text-lg">Filters</h2>
                    <button 
                        onClick={() => {
                            dispatch(clearSelectedRegions());
                            setSearchParams({}); // Clear URL parameters
                            setIsMobileFilterOpen(false);
                        }} 
                        className='bg-red-600 p-2 rounded text-white font-semibold text-xs cursor-pointer'
                    >
                        Reset
                    </button>
                </div>
                <div className='m-5'>
                    {uniqueRegions.map((region) => (
                        <div key={region} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={region}
                                checked={selectedRegions.includes(region)}
                                onChange={() => handleCheckboxChange(region)}
                                className="mr-2"
                            />
                            <label htmlFor={region} className="text-gray-700">{region}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Displaying Sales Data - Responsive */}
            <div className="w-full md:w-3/4 p-4 overflow-x-auto">
                <h2 className="font-bold text-lg mb-4">Sales Data</h2>
                {currentData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">Product</th>
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">Region</th>
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">Country</th>
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">City</th>
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">Sales</th>
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">Date</th>
                                    <th className="border border-gray-300 p-2 whitespace-nowrap">Manager</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item) => (
                                    <tr key={item.id} className={`hover:bg-gray-100`}>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{item.product}</td>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{item.region}</td>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{item.country}</td>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{item.city}</td>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{item.sales.toLocaleString()}</td>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 p-2 whitespace-nowrap">{item.manager}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No sales data available for the selected regions.</p>
                )}

                {/* Pagination Controls - Responsive */}
                <div className ="mt-4 flex items-center justify-end">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Next
                    </button>
                    <div className="ml-4 flex items-center">
                        <input
                            type="number"
                            value={jumpToPage}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Allow only positive integers
                                if (value === '' || (parseInt(value) > 0 && !isNaN(value))) {
                                    setJumpToPage(value);
                                }
                            }}
                            className="border border-gray-300 p-2 rounded w-16 appearance-none" // Added appearance-none to hide arrows
                            placeholder="Jump to"
                            min="1" // Set minimum value to 1
                        />
                        <button
                            onClick={handleJumpToPage}
                            className="ml-2 p-2 bg-green-500 text-white rounded"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;