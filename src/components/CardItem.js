import React from "react";
import classes from "./CardItem.module.css";
import down from "../assets/down.svg";
import up from "../assets/up.svg";
function CardItem({ coin }) {
  const price = coin.current_price.toFixed(2);
  const coinPercentage = coin.price_change_percentage_24h.toFixed(2);
  const percentageClass =
    coinPercentage > 0
      ? classes.coinPercentage_success
      : classes.coinPercentage_negative;
  return (
    <div className={classes.menu_item_wrapper}>
      <div className={classes.cardContainer}>
        <div className={classes.cardHolder}>
          <div className={classes.coinImage}>
            <img src={coin.image} alt="coinimg" />
          </div>
          <div className={classes.coinInfo}>
            <div className={classes.coinName}>{coin.name}</div>
            <div className={classes.coinPrice}>{price}</div>
          </div>
          <div className={classes.coinPercentageWrapper}>
            <div className={percentageClass}>
              {coinPercentage > 0 ? (
                <img className={classes.icon} src={up} alt="indicator" />
              ) : (
                <img className={classes.icon} src={down} alt="indicator" />
              )}
              {coinPercentage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardItem;
