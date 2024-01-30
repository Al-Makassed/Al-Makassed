import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

// chart options
const barChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
    // textAnchor: 'start',
  },
  xaxis: {
    categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

const BarChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series] = useState([
    {
      data: [80, 95, 70, 42, 65, 55, 78],
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>(barChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [],
          },
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: (val: number) => `${val}`,
          title: {
            formatter: () => "total orders",
          },
        },
      },
    }));
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={365}
      />
    </div>
  );
};

export default BarChart;
