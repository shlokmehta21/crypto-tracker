import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GlobalStat from "../components/GlobalStat";
import { Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import classes from "./Detail.module.css";
import { useHistory } from "react-router-dom";
import OverViewDetails from "../components/OverViewDetails";
import HistoryChart from "../components/HistoryChart";
import CoinNews from "../components/CoinNews";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import newsIcon from "../assets/newspaper.png";
import { Button } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => {
  return {
    chip: {
      marginTop: "40px",
      backgroundColor: "rgba(56, 97, 251, 0.1)",
      color: "rgb(97, 136, 255)",
      fontWeight: "bold",
    },
    loadBtn: {
      marginTop: "10px",
      width: "100%",
      marginBottom: "20px",
      backgroundColor: "rgb(50, 53, 70)",
    },
  };
});

function Detail() {
  const { id } = useParams();
  const [CoinDetails, setCoinDetails] = useState();
  const [CoinGraphData, setCoinGraphData] = useState({});
  const [NewsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [page, setPage] = useState(5);
  const history = useHistory();
  const classesMui = useStyles();

  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  const changeClassName = useCallback(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 767;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const FetchGraphData = useCallback(async () => {
    const [day, week, year, news, details] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "365",
        },
      }),
      axios.get(`https://crypto-node-news-backend.herokuapp.com/${id}/${page}`),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false`
      ),
    ]);

    setCoinGraphData({
      day: formatData(day.data.prices),
      week: formatData(week.data.prices),
      year: formatData(year.data.prices),
    });

    setNewsData(news.data.articles);
    console.log(news.data.articles);
    setCoinDetails(details.data);
    setIsLoading(false);
  }, [id, page]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      FetchGraphData();
      changeClassName();
    }
    const cleanup = () => {
      mounted = false;
    };

    return cleanup();
  }, [FetchGraphData, changeClassName]);

  const handleClick = (event) => {
    event.preventDefault();
    history.push("/");
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const btnLabel = isLoading ? "Loading" : "Read More";

  return (
    <>
      <GlobalStat />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Container>
          <div className={classes.cointainer_details}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/" onClick={handleClick}>
                Cryptocurrency
              </Link>
              <Link color="inherit" href="/" onClick={handleClick}>
                Coins
              </Link>
              <Typography variant="caption" color="textPrimary">
                {id.toUpperCase()}
              </Typography>
            </Breadcrumbs>
          </div>
          <OverViewDetails CoinDetails={CoinDetails} isMobile={isMobile} />
          <HistoryChart
            Chartdata={CoinGraphData}
            CoinDetails={CoinDetails}
            isMobile={isMobile}
          />
          <Chip
            p={5}
            avatar={<Avatar src={newsIcon} />}
            label={`${CoinDetails.name} News`}
            className={classesMui.chip}
          />
          {NewsData.map((data) => (
            <CoinNews
              key={data.url}
              newsdata={data}
              CoinDetails={CoinDetails}
              Hours={randomIntFromInterval(1, 24)}
            />
          ))}
          <Button
            className={classesMui.loadBtn}
            onClick={() => setPage((prevpage) => prevpage + 5)}
          >
            {btnLabel}
          </Button>
        </Container>
      )}
    </>
  );
}

export default Detail;
