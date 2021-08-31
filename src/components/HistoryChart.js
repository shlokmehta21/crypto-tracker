import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import classes from "./HistoryChart.module.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import ChartIcon from "../assets/bar-graph.png";

const useStyles = makeStyles((theme) => {
  return {
    chip: {
      backgroundColor: "rgba(56, 97, 251, 0.1)",
      color: "rgb(97, 136, 255)",
      fontWeight: "bold",
    },
  };
});

function HistoryChart({ Chartdata, CoinDetails, isMobile }) {
  const { day, week, year } = Chartdata;
  const [timeFormat, setTimeFormat] = useState("24h");
  const classesMui = useStyles();

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

  const changeColorOnTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return CoinDetails.market_data.price_change_percentage_24h;
      case "7d":
        return CoinDetails.market_data.price_change_percentage_7d;
      case "1y":
        return CoinDetails.market_data.price_change_percentage_1y;
      default:
        return CoinDetails.market_data.price_change_percentage_24h;
    }
  };

  const color = changeColorOnTimeFormat();
  const BorderColor = color < 0 ? "rgb(228, 10, 10)" : "rgb(124,252,0)";
  const StartColor = color < 0 ? "rgb(228, 10, 10, .7)" : "rgba(124,252,0,.7)";
  const EndColor = color < 0 ? "rgb(228, 10, 10, .0)" : "rgba(124,252,0,0)";
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, StartColor);
    gradient.addColorStop(1, EndColor);

    return {
      datasets: [
        {
          label: `${CoinDetails.name} Price`,
          data: determineTimeFormat(),
          fill: true,
          backgroundColor: gradient,
          borderColor: BorderColor,
        },
      ],
    };
  };

  const options = {
    lineHeightAnnotation: {
      always: true,
      hover: true,
      lineWeight: 1.5,
      showTooltips: true,
    },
    hover: {
      mode: "index",
      intersect: false,
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

  const chartHeight = isMobile ? 558 : 450;

  return (
    <>
      <div className={classes.heading}>
        <Chip
          p={5}
          avatar={<Avatar src={ChartIcon} />}
          label={`${CoinDetails.name} to USD Chart`}
          className={classesMui.chip}
        />
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
        <Line data={data} options={options} width={801} height={chartHeight} />
      </div>
    </>
  );
}

export default HistoryChart;
