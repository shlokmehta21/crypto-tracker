import React from "react";
import classes from "./GlobalStat.module.css";

function GlobalStat() {
  return (
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
              <span className={classes.item_inner}>BTC: 46.5% ETH: 19.7%</span>
            </span>
            <span className={classes.item}>
              ETH Gas:
              <span className={classes.item_inner}> 42 Gwei</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalStat;
