import { Avatar, Button, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext, useCallback } from "react";
import classes from "./Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import CardCarousal from "../components/CardCarousal";
import CoinDataTable from "../components/CoinDataTable";
import Chip from "@material-ui/core/Chip";
import tredingIcon from "../assets/trending.png";
import axios from "axios";
import GlobalStat from "../components/GlobalStat";
import { WatchListContext } from "../Context/WatchListContext";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import SearchBar from "material-ui-search-bar";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    SearchBar: {
      backgroundColor: "rgb(50, 53, 70, .4)",
    },
  };
});

export default function Home() {
  const [AllCoins, setAllCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [watchCoins, setWatchCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWatchCoins, setShowWatchCoins] = useState(false);
  const [searched, setSearched] = useState("");
  const classesMui = useStyles();
  const { watchList } = useContext(WatchListContext);

  const FetchHomeData = useCallback(async () => {
    const [GottrendingCoins, FullCoins] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=7d`
      ),
    ]);
    setTrendingCoins(GottrendingCoins.data);
    setAllCoins(FullCoins.data);
    setIsLoading(false);
  }, []);

  const fetchWatchListCoins = useCallback(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: watchList.join(","),
          order: "market_cap_desc",
          sparkline: true,
        },
      })
      .then((response) => {
        const data = response.data;
        setWatchCoins(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [watchList]);

  useEffect(() => {
    FetchHomeData();
    if (watchList.length > 0) {
      fetchWatchListCoins();
    } else {
      console.log("empty watch list");
      setWatchCoins([]);
    }
  }, [FetchHomeData, watchList, fetchWatchListCoins]);

  const requestSearch = (searchedVal) => {
    const filteredRows = AllCoins.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setAllCoins(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <GlobalStat />

      {isLoading ? (
        <LinearProgress />
      ) : (
        <Container>
          <Chip
            p={5}
            avatar={<Avatar src={tredingIcon} />}
            label="Trending Coins"
            className={classesMui.chip}
          />
          <section className={classesMui.section}>
            <div className={classes.carousal}>
              <CardCarousal
                trendingcoin={trendingCoins}
                isLoading={isLoading}
              />
            </div>
          </section>

          <div className={classes.coinDataTable}>
            <Button
              style={{
                backgroundColor: "rgb(50, 53, 70)",
                marginRight: "5px",
                marginBottom: "5px",
              }}
              onClick={() => setShowWatchCoins(true)}
            >
              <StarOutlineIcon
                fontSize="small"
                style={{ marginRight: "2px", align: "center" }}
              />
              WatchList
            </Button>
            <Button
              style={{
                backgroundColor: "rgb(50, 53, 70)",
                marginBottom: "5px",
              }}
              onClick={() => setShowWatchCoins(false)}
            >
              Cryptocurrency
            </Button>
            {showWatchCoins === false && (
              <SearchBar
                className={classesMui.SearchBar}
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            )}
            {showWatchCoins === true ? (
              <CoinDataTable Allcoin={watchCoins} watchCoins={watchCoins} />
            ) : (
              <CoinDataTable Allcoin={AllCoins} watchCoins={watchCoins} />
            )}
          </div>
        </Container>
      )}
    </>
  );
}
