import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import classes from "./HistoryChart.module.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

function HistoryChart({ Chartdata, CoinDetails }) {
  const { day, week, year } = Chartdata;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };
  const data = {
    datasets: [
      {
        label: `${CoinDetails.name} Price`,
        data: determineTimeFormat(),
        fill: false,
        backgroundColor: "	rgb(124,252,0)",
        borderColor: "	rgb(124,252,0)",
      },
    ],
  };

  const options = {
    lineHeightAnnotation: {
      always: true,
      hover: true,
      lineWeight: 1.5,
    },

    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "time",
        distribution: "linear",
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#323546",
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <>
      <div className={classes.heading}>
        <div>{`${CoinDetails.name} to USD Chart`}</div>
        <ButtonGroup
          size="small"
          aria-label="small outlined primary button group"
        >
          <Button onClick={() => setTimeFormat("24h")}>24H</Button>
          <Button onClick={() => setTimeFormat("7d")}>7D</Button>
          <Button onClick={() => setTimeFormat("1y")}>1Y</Button>
        </ButtonGroup>
      </div>
      <div className={classes.Chart}>
        <Line data={data} options={options} width={801} height={558} />
      </div>
    </>
  );
}

export default HistoryChart;
