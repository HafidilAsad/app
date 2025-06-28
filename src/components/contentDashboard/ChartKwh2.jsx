import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, ResponsiveContainer, CartesianGrid,
  XAxis, Legend, Tooltip, LabelList, YAxis
} from 'recharts';
import axios from 'axios';

const ChartKwh2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://solusiprogrammer.com/api/energy');
        const rawData = response.data;

        // Urutkan data berdasarkan tanggal
        const sortedData = [...rawData].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Hitung selisih kWh harian dan bulatkan ke 1 angka di belakang koma
        const transformedData = sortedData.map((item, index, arr) => {
          if (index === 0) return null; // skip data pertama karena tidak ada pembanding
          const prev = arr[index - 1];

          const currentKwh = parseFloat(item.kwh);
          const previousKwh = parseFloat(prev.kwh);

          return {
            name: new Date(item.createdAt).toLocaleDateString('en-US', {
              // month: 'short',
              day: 'numeric',
            }),
            kWh: parseFloat((currentKwh - previousKwh).toFixed(1)),
          };
        }).filter(Boolean); // hilangkan null
          
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
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="name"
          angle={20}
          textAnchor="start"
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="kWh" fill="gold" radius={[5, 5, 0, 0]} isAnimationActive={false}>
          <LabelList dataKey="kWh" position="insideTop" fill="black" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartKwh2;
