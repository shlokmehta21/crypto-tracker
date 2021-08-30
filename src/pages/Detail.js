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

function Detail() {
  const { id } = useParams();
  const [CoinDetails, setCoinDetails] = useState();
  const [CoinGraphData, setCoinGraphData] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const history = useHistory();

  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  const fetchDetails = useCallback(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false`
      )
      .then((response) => {
        setCoinDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
    const [day, week, year] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "365",
        },
      }),
    ]);

    setCoinGraphData({
      day: formatData(day.data.prices),
      week: formatData(week.data.prices),
      year: formatData(year.data.prices),
    });
  }, [id]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchDetails();
      FetchGraphData();
      changeClassName();
    }
    const cleanup = () => {
      mounted = false;
    };

    return cleanup();
  }, [fetchDetails, FetchGraphData, changeClassName]);

  const handleClick = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <>
      <GlobalStat />
      {CoinDetails && (
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
          <CoinNews />
        </Container>
      )}
    </>
  );
}

export default Detail;
