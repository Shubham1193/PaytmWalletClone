"use client"
"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

import React from 'react';

type TransactionData = {
  time  : Date,
//   amount: number;
  amount: number;
};

type ChartProps = {
  data: TransactionData[];
};

export function Chart({ data }: ChartProps) {
  // console.log(data);
  const chartdata = data.map((d) => d.amount)
  const labels = data.map((d) => d.time.toLocaleDateString())
  console.log(chartdata)
  console.log(labels)
  const dataa = {
    // labels: ['January', 'February', 'March', 'April', 'May'],
    labels : labels,
    datasets: [
      {
        label: 'Transaction History',
        data: chartdata,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        
      },
    ],
    
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  console.log(chartdata)
  return (
    <div>
      {/* {
        data.map((t, index) => (
         <>
          <p key={index}>{t.transaction}</p>
         </>
        ))
      } */}
      <div style={{ width: '1000px', height: '400px' }}>
    
      <Line data={dataa} options={options} />
    </div>
    </div>
  );
}
