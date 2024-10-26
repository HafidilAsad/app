import React from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis,  Legend , Tooltip, LabelList} from 'recharts';

const ChartKwh = () => {
    const data = [
        { name: '1', kWh: 40, pv: 2400, amt: 2400 },
        { name: '2', kWh: 30, pv: 1398, amt: 2210 },
        { name: '3', kWh: 20, pv: 9800, amt: 2290 },
        { name: '4', kWh: 27, pv: 3908, amt: 2000 },
        { name: '5', kWh: 18, pv: 4800, amt: 2181 },
        { name: '6', kWh: 23, pv: 3800, amt: 2500 },
        { name: '7', kWh: 34, pv: 4300, amt: 2100 },
    ];

    return (
        <ResponsiveContainer width="100%" height={330}>
            <BarChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <Bar dataKey="kWh" fill="#8884d8" radius={[10, 10, 0, 0]} isAnimationActive={false} >
                    <LabelList dataKey="kWh" position="insideTop" fill="white"  />
                </Bar>
                <Legend />
                <Tooltip />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ChartKwh;
