import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
const WaveGraph = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    // Sample data points to create the wave pattern
    const timePoints = [
      "12:00 AM",
      "1:00 AM",
      "2:00 AM",
      "3:00 AM",
      "4:00 AM",
      "5:00 AM",
    ];
    const actualData = [2590, 2770, 2665, 2875, 2570, 2690];
    const predictionData = [2595, 2790, 2655, 2873, 2582, 2690];
    const option = {
      color: ["#4354D6", "#CC8931"], // Ensure legend and line colors match
      backgroundColor: "transparent",
      grid: {
        left: "0%",
        right: "3%",
        top: "10%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: timePoints,
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#F9F9F9",
          fontSize: 12,
          fontFamily: "JetBrains Mono",
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        min: 2500,
        max: 3000,
        splitNumber: 6,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#F9F9F9",
          fontSize: 12,
          fontFamily: "JetBrains Mono",
          formatter: function (value) {
            // Custom formatting, e.g., add a $ sign
            return value;
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#ffffff10",
            width: 1,
            type: "solid",
          },
        },
      },
      legend: {
        data: ["ACTUAL", "PREDICTION"],
        right: "5%",
        bottom: "0%",
        textStyle: {
          color: "#686870",
          fontSize: 12,
          fontFamily: "JetBrains Mono",
        },
        itemWidth: 12,
        itemHeight: 12,
        icon: "rect",
      },
      series: [
        {
          name: "ACTUAL",
          type: "line",
          data: actualData,
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: "#4354D6",
            width: 3,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(72, 93, 255, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(72, 93, 255, 0.1)",
              },
            ]),
          },
        },
        {
          name: "PREDICTION",
          type: "line",
          data: predictionData,
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: "#CC8931",
            width: 3,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255, 171, 60, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0)",
              },
            ]),
          },
        },
      ],
    };
    chart.setOption(option);
    // Handle window resize
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);
  return (
    <div className=" bg-white/2 border border-white/10 rounded-[10px] px-4 lg:px-6 py-2 lg:py-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] lg:text-md font-medium text-primary-text">
          Predicted vs. Actual Values
        </h2>
        <p className="text-medium-opacity text-xxs lg:text-xs font-medium">
          The graph displays the asset's predicted and actual values.
        </p>
      </div>
      <div
        ref={chartRef}
        className="mt-3 bg-transparent w-full h-[300px] 3xl:h-[220px]"
        
      />
    </div>
  );
};
export default WaveGraph;
