import {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChartComponent = (data:any) => {
    let [chart, setResultChart] = useState({'labels': ['2022', '2023'], 'datasets': [{
        label: 'Dataset 1',
        data: [1,3,4,5,6],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }]})
    
    function Get_data() {
        useEffect(() =>{
            setResultChart(data.data)
        }, [data])
    }
    Get_data()

    const data_chart = {
        labels: ['1'],
        datasets: [0]
    }

    return (
        <>
            {/* <div>{data_chart}</div> */}
            <Bar className="w-100 h-100" data={chart} />
        </>
    )
}