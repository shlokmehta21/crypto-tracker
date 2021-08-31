import React from "react";
import classes from "./CoinNews.module.css";
import { ReactComponent as ExternalLink } from "../assets/link.svg";
function CoinNews({ newsdata, coinName, CoinDetails }) {
  return (
    <div className={classes.newsContainer}>
      <a href={newsdata.url} className={classes.card}>
        <div className={classes.content}>
          <h3 className={classes.cardTitle}>
            {newsdata.title}
            <span className={classes.icon}>
              <ExternalLink />
            </span>
          </h3>
          <p className={classes.description}>{newsdata.description}</p>
          <div className={classes.details}>
            <span className={classes.source}>
              {newsdata.source.name} -{" "}
              <span className={classes.time}>8 Hours ago</span>
            </span>
            <div className={classes.coinDesc}>
              <img src={CoinDetails.image.small} alt="bit" />
              <span className={classes.coin_name_desc}>{CoinDetails.name}</span>
            </div>
          </div>
        </div>
        <div className={classes.newsImg}>
          <img src={newsdata.urlToImage} alt="bb" />
        </div>
      </a>
    </div>
  );
}

export default CoinNews;
