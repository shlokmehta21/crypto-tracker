import { Avatar, Container } from "@material-ui/core";
import React from "react";
import classes from "./Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import CardCarousal from "../components/CardCarousal";
import CoinDataTable from "../components/CoinDataTable";
import Chip from "@material-ui/core/Chip";
import fireIcon from "../assets/fire.gif";

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
  const classesMui = useStyles();
  return (
    <>
      {/* Global stats */}
      <div className={classes.container}>
        <div className={classes.global_stats_fade}>
          <div className={classes.global_stat_content}>
            <div className={classes.global_stat_inner_content}>
              <span className={classes.item}>
                Cryptos :<span className={classes.item_inner}>11,000</span>
              </span>
              <span className={classes.item}>
                Market Cap:
                <span className={classes.item_inner}> $1,825,190,610,965</span>
              </span>
              <span className={classes.item}>
                24h Vol:
                <span className={classes.item_inner}> $102,880,914,250</span>
              </span>
              <span className={classes.item}>
                Dominance:
                <span className={classes.item_inner}>
                  BTC: 46.5% ETH: 19.7%
                </span>
              </span>
              <span className={classes.item}>
                ETH Gas:
                <span className={classes.item_inner}> 42 Gwei</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* total price description */}
      <Container>
        <Chip
          p={5}
          avatar={<Avatar src={fireIcon} />}
          label="Trending Coins"
          className={classesMui.chip}
        />
        <section className={classesMui.section}>
          <div className={classes.carousal}>
            <CardCarousal />
          </div>
        </section>
        <div className={classes.coinDataTable}>
          <CoinDataTable />
        </div>
      </Container>
    </>
  );
}
