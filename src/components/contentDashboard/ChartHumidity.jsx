import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, Legend, Tooltip, LabelList, YAxis } from 'recharts';
import axios from 'axios';

const ChartHumidity = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://solusiprogrammer.com/api/energy');
                const transformedData = response.data.map((item) => ({
                    name: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    Humidity: item.humidity, // Use humidity for the chart
                }));
                setData(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={195}>
            <BarChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="5 5" />
                <XAxis 
                    dataKey="name" 
                    angle={20} 
                    textAnchor="start" 
                    interval={0} // Ensures that all labels are displayed
                />
                <Bar dataKey="Humidity" fill="blue" radius={[5, 5, 0, 0]} isAnimationActive={false}>
                    <LabelList dataKey="Humidity" position="insideTop" fill="white" />
                </Bar>
                <Legend />
                <Tooltip />
                <YAxis /> {/* Set the Y-axis domain to 0-100 for humidity percentage */}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ChartHumidity;