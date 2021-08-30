import React from "react";
import classes from "./CoinNews.module.css";
import { ReactComponent as ExternalLink } from "../assets/link.svg";
function CoinNews() {
  return (
    <div className={classes.newsContainer}>
      <div className={classes.head}>
        <h2 className={classes.Coinname}>Bitcoin News</h2>
      </div>
      <div className={classes.newsCard}>
        <div className={classes.cardContainer}>
          <div className={classes.cardWrapper}>
            <a href="/" className={classes.card}>
              <div className={classes.content}>
                <h3 className={classes.cardTitle}>
                  Bill Belichick, New England Patriots still have 'decisions to
                  make' after preseason finale, including starting quarterback -
                  ESPN
                  <span className={classes.icon}>
                    <ExternalLink />
                  </span>
                </h3>
                <p className={classes.description}>
                  Cam Newton and Mac Jones both played in the Patriots'
                  preseason finale on Sunday, but New England coach Bill
                  Belichick gave a firm
                </p>
                <div className={classes.details}>
                  <span className={classes.source}>
                    ESPN - <span className={classes.time}>8 Hours ago</span>
                  </span>
                  <div className={classes.coinDesc}>
                    <img
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                      alt="bit"
                    />
                    <span className={classes.coin_name_desc}>Bitcoin</span>
                  </div>
                </div>
              </div>
              <div className={classes.newsImg}>
                <img
                  src="https://cryptopotato.com/wp-content/uploads/2021/06/el-salvador-btc.jpg"
                  alt="bb"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinNews;
