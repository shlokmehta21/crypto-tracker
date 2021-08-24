import { Avatar, Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import CardCarousal from "../components/CardCarousal";
import CoinDataTable from "../components/CoinDataTable";
import Chip from "@material-ui/core/Chip";
import fireIcon from "../assets/fire.gif";
import axios from "axios";
import GlobalStat from "../components/GlobalStat";

const useStyles = makeStyles((theme) => {
  return {
    section: {
      boxSizing: "border-box",
      margin: "0px",
      paddingTop: "3px",
      paddingBottom: "16px",
      display: "flex",
      flexDirection: "column",
    },
    DataTable: {
      marginTop: "50px",
    },
    chip: {
      marginTop: "20px",
      marginLeft: "20px",
      backgroundColor: "rgba(56, 97, 251, 0.1)",
      color: "rgb(97, 136, 255)",
      fontWeight: "bold",
    },
  };
});

export default function Home() {
  const [AllCoins, setAllCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const classesMui = useStyles();

  const fetchAllCoins = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=7d"
      )
      .then((response) => {
        const data = response.data;
        setAllCoins(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTrendingCoins = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((response) => {
        const data = response.data;
        setTrendingCoins(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTrendingCoins();
    fetchAllCoins();
  }, []);

  return (
    <>
      <GlobalStat />
      <Container>
        <Chip
          p={5}
          avatar={<Avatar src={fireIcon} />}
          label="Trending Coins"
          className={classesMui.chip}
        />
        <section className={classesMui.section}>
          <div className={classes.carousal}>
            <CardCarousal trendingcoin={trendingCoins} />
          </div>
        </section>
        <div className={classes.coinDataTable}>
          <CoinDataTable Allcoin={AllCoins} />
        </div>
      </Container>
    </>
  );
}
