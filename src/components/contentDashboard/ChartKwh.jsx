import React from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis,  Legend , Tooltip, LabelList} from 'recharts';

const ChartKwh = () => {
    const data = [
        { name: 'Jan', kWh: 40, pv: 2400, amt: 2400 },
        { name: 'Feb', kWh: 30, pv: 1398, amt: 2210 },
        { name: 'Mar', kWh: 20, pv: 9800, amt: 2290 },
        { name: 'Apr', kWh: 27, pv: 3908, amt: 2000 },
        { name: 'May', kWh: 18, pv: 4800, amt: 2181 },
        { name: 'Jun', kWh: 23, pv: 3800, amt: 2500 },
        { name: 'Jul', kWh: 34, pv: 4300, amt: 2100 },
        { name: 'Aug', kWh: 40, pv: 4300, amt: 2100 },
        { name: 'Sep', kWh: 30, pv: 4300, amt: 2100 },
        { name: 'Oct', kWh: 40, pv: 4300, amt: 2100 },
        { name: 'Nov', kWh: 30, pv: 4300, amt: 2100 },
        { name: 'Des', kWh: 32, pv: 4300, amt: 2100 },

    ];

    return (
        <ResponsiveContainer width="100%" height={305}>
            <BarChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis 
                    dataKey="name" 
                    angle={20} 
                    textAnchor="start" 
                    interval={0} // Ensures that all labels are displayed
                />
                <Bar dataKey="kWh" fill="gold" radius={[5, 5, 0, 0]} isAnimationActive={false} >
                    <LabelList dataKey="kWh" position="insideTop" fill="white"  />
                </Bar>
                <Legend />
                <Tooltip />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ChartKwh;
