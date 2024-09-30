import React from 'react';
import { Chart } from 'react-charts';

export default function StockChart() {
  // Sample chart data
  const data = React.useMemo(
    () => [
      {
        label: 'Stock Prices',
        data: [
          [1, 10],
          [2, 20],
          [3, 15],
          [4, 25],
          // Add more data points as needed
        ],
      },
    ],
    []
  );

  // Sample chart configuration
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  return (
    <div className="chart-container" style={{height:"90vh"}}>
      <Chart data={data} axes={axes} />
    </div>
  );
}
