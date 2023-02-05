import React from "react";
import Chart from "react-apexcharts";

// Find the width of the screen
const width = window.innerWidth;

const SentimentChart = ({ chartData, aspect }) => {
  const fontOptions = {
    fontFamily: "Poppins",
  };

  const options = {
    chart: {
      background: "transparent",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          ...fontOptions,
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          ...fontOptions,
          color: "#ffffff",
        },
      },
    },
    markers: {
      size: 8,
      colors: "#BE89ED",
      shape: "circle",
    },
    series: [
      {
        name: "Average Sentiment",
        data: chartData,
        color: "#CABCFC",

        strokeWidth: 2,
      },
    ],
    plotOptions: {
      line: {
        curve: "smooth",
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
        format: "ddd",
      },
      y: {
        formatter: function (value) {
          return value + " sentiment";
        },
        style: {
          fontFamily: "Poppins",
        },
      },
    },
    grid: {
      show: false,
    },

    legend: {
      show: true,
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginRight: "1rem",
      }}
    >
      <h3
        style={{
          position: "absolute",
          left: "1rem",
        }}
      >
        {aspect}
      </h3>

      <Chart
        options={options}
        series={options.series}
        type={options.chart.type}
        height={200}
        width={width - 60}
      />
    </div>
  );
};

export default SentimentChart;
