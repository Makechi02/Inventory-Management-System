"use client";

import {useEffect, useState} from "react";
import DashboardChart from "@/components/ui/dashboard/admin/DashboardChart";
import MetricService from "@/service/MetricService";

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalItems: 0,
        totalCategories: 0
    });

    const [recentUsers, setRecentUsers] = useState([]);
    const [recentItems, setRecentItems] = useState([]);
    const [recentCategories, setRecentCategories] = useState([]);
    const [inventoryValuation, setInventoryValuation] = useState(0);
    const [itemsByCategory, setItemsByCategory] = useState([]);

    const barChartData = {
        labels: ['Users', 'Items', 'Categories'],
        datasets: [
            {
                label: 'Count',
                data: [metrics.totalUsers, metrics.totalItems, metrics.totalCategories],
                backgroundColor: ['#3b82f6', '#f97316', '#10b981'],
            },
        ],
    };

    const lineChartData = {
        labels: recentUsers.map(user => user.name),
        datasets: [
            {
                label: 'Recent Users',
                data: recentUsers.map(user => user._id.length),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
            },
        ],
    };

    const pieChartData = {
        labels: recentCategories.map(category => category.name),
        datasets: [
            {
                label: 'Recent Categories',
                data: recentCategories.map(category => category._id.length),
                backgroundColor: ['#3b82f6', '#f97316', '#10b981', '#ef4444', '#8b5cf6'],
            },
        ],
    };

    const inventoryValuationData = {
        labels: ['Inventory Valuation'],
        datasets: [
            {
                label: 'Value',
                data: [inventoryValuation],
                backgroundColor: ['#f97316'],
            },
        ],
    };

    const itemsByCategoryData = {
        labels: itemsByCategory.map(item => item.categoryName || 'Unknown'),
        datasets: [
            {
                label: 'Items',
                data: itemsByCategory.map(item => item.count),
                backgroundColor: itemsByCategory.map((_, index) => `hsl(${index * 360 / itemsByCategory.length}, 70%, 50%)`),
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Metrics Overview',
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return Number.isInteger(value) ? value : '';
                    },
                    stepSize: 1,
                },
                grid: {
                    display: true,
                    drawBorder: true,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Metrics Overview',
            },
        }
    };

    useEffect(() => {
        const fetchMetrics = () => {
            MetricService.getAllMetrics()
                .then(response => {
                    const data = response.data;
                    setMetrics({
                        totalUsers: data.totalUsers,
                        totalItems: data.totalItems,
                        totalCategories: data.totalCategories
                    });

                    setRecentUsers(data.recentUsers);
                    setRecentItems(data.recentItems);
                    setRecentCategories(data.recentCategories);
                }).catch(error => console.error(error))
        };

        const getInventoryValuation = () => {
            MetricService.getInventoryValuation()
                .then(response => setInventoryValuation(response.data))
                .catch(error => console.error(error));
        }

        const getItemsByCategory = () => {
            MetricService.getItemsByCategory()
                .then(response => setItemsByCategory(response.data))
                .catch(error => console.error(error));
        }

        fetchMetrics();
        getInventoryValuation();
        getItemsByCategory();
    }, []);

    return (
        <div>
            <h1 className={`font-bold mb-6 page-heading`}>Dashboard Overview</h1>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8`}>
                <MetricCard title={`Total Items`} data={metrics.totalItems}/>
                <MetricCard title={`Total Categories`} data={metrics.totalCategories}/>
                <MetricCard title={`Total Users`} data={metrics.totalUsers}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <RecentCard
                    title={`Recently Added Items`}
                    data=
                        {recentItems.map(item => (
                            <li key={item._id} className="bg-gray-100 p-3 rounded-md">{item.name}</li>
                        ))}
                />

                <RecentCard
                    title={`Recent Categories`}
                    data=
                        {recentCategories.map(category => (
                            <li key={category._id} className="bg-gray-100 p-3 rounded-md">
                                {category.name}
                            </li>
                        ))}
                />

                <RecentCard
                    title={`Recent Users`}
                    data=
                        {recentUsers.map(user => (
                            <li key={user._id} className="bg-gray-100 p-3 rounded-md">
                                {user.name}
                            </li>
                        ))}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <DashboardChart type="bar" data={barChartData} options={chartOptions}/>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <DashboardChart type="bar" data={inventoryValuationData} options={chartOptions}/>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <DashboardChart type="pie" data={itemsByCategoryData} options={lineChartOptions}/>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, data }) => {
    return (
        <div className={`p-4 bg-white rounded-lg shadow-lg flex flex-col items-center text-center`}>
            <h2 className={`text-lg sm:text-xl font-semibold text-gray-700 capitalize`}>{title}</h2>
            <p className={`text-3xl sm:text-4xl font-bold text-gray-900 mt-2`}>{data}</p>
        </div>
    )
}

const RecentCard = ({ title, data }) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className={`text-xl font-bold mb-4 capitalize`}>{title}</h2>
            <ul className={`sm:list-disc px-4 sm:px-0 sm:pl-4 space-y-2`}>
                {data}
            </ul>
        </div>
    )
}

export default Dashboard;
