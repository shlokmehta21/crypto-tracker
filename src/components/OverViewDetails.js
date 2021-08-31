import React, { useContext } from "react";
import classes from "./OverViewDetails.module.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { WatchListContext } from "../Context/WatchListContext";
import StarIcon from "@material-ui/icons/Star";

function OverViewDetails({ CoinDetails, isMobile }) {
  const { watchList, deleteCoin, addCoin } = useContext(WatchListContext);

  const handleDelete = (id) => {
    deleteCoin(id);
  };

  const handleAddCoin = (id) => {
    addCoin(id);
  };
  return (
    <div>
      <div className={classes.top_summary_container}>
        <div className={classes.name_section}>
          <div className={classes.nameHeader}>
            <img src={CoinDetails.image.small} alt="coinImg" />
            <h2 className={classes.coin_Name}>
              {CoinDetails.name}
              <small className={classes.coin_name_symbol}>
                {CoinDetails.symbol.toUpperCase()}
              </small>
            </h2>
            <span className={classes.add_icon}>
              {watchList.indexOf(CoinDetails.id) !== -1 ? (
                <StarIcon
                  style={{ cursor: "pointer" }}
                  button="true"
                  fontSize="small"
                  onClick={() => handleDelete(CoinDetails.id)}
                />
              ) : (
                <StarBorderIcon
                  style={{ cursor: "pointer" }}
                  button="true"
                  fontSize="small"
                  onClick={() => handleAddCoin(CoinDetails.id)}
                />
              )}
            </span>
          </div>
          <div className={classes.rankInfo}>
            <div className={classes.rank}>
              Rank #{CoinDetails.market_cap_rank}
            </div>
          </div>
        </div>
        <div className={classes.priceSection}>
          <h1 className={classes.priceHeading}>
            {CoinDetails.name} Price ({CoinDetails.symbol.toUpperCase()})
          </h1>
          <div className={classes.priceTitle}>
            <div className={classes.priceValue}>
              ${CoinDetails.market_data.current_price.usd.toLocaleString()}
            </div>
            <span
              className={
                CoinDetails.market_data.price_change_percentage_24h.toFixed(2) <
                0
                  ? classes.pricePercentage_negative
                  : classes.pricePercentage_positive
              }
            >
              {CoinDetails.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className={classes.statsSection}>
          <div className={classes.statsContainer}>
            <div className={classes.statsBlock}>
              <div className={classes.statsBlockInner}>
                <div className={classes.statsLabel}>Market Cap</div>
                <div className={classes.statsItem}>
                  <div className={classes.statsValue}>
                    $ {CoinDetails.market_data.market_cap.usd.toLocaleString()}
                  </div>
                  <span
                    className={
                      CoinDetails.market_data.market_cap_change_percentage_24h <
                      0
                        ? classes.stats_percentage_negative
                        : classes.stats_percentage_positive
                    }
                  >
                    {CoinDetails.market_data.market_cap_change_percentage_24h.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.statsBlock}>
              <div className={classes.statsBlockInner}>
                <div className={classes.statsLabel}>
                  Fully Diluted Market Cap
                </div>
                <div className={classes.statsItem}>
                  <div className={classes.statsValue}>
                    ${" "}
                    {typeof CoinDetails.market_data.fully_diluted_valuation ===
                    {}
                      ? "-"
                      : CoinDetails.market_data.fully_diluted_valuation.usd}
                  </div>

                  <span
                    className={
                      CoinDetails.market_data.market_cap_change_percentage_24h <
                      0
                        ? classes.stats_percentage_negative
                        : classes.stats_percentage_positive
                    }
                  >
                    {CoinDetails.market_data.market_cap_change_percentage_24h.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.statsBlock}>
              <div className={classes.statsBlockInner}>
                <div className={classes.statsLabel}>
                  Volume
                  <div className={classes.volumetitle}>24h</div>
                </div>
                <div className={classes.statsItem}>
                  <div className={classes.statsValue}>
                    ${" "}
                    {CoinDetails.market_data.total_volume.usd.toLocaleString()}
                  </div>
                  <span
                    className={
                      CoinDetails.market_data.price_change_percentage_7d < 0
                        ? classes.stats_percentage_negative
                        : classes.stats_percentage_positive
                    }
                  >
                    {CoinDetails.market_data.price_change_percentage_7d.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.statsBlock}>
              <div className={classes.statsBlockInner}>
                <div className={classes.statsLabel}>Circulating Supply</div>
                <div className={classes.statsItem}>
                  <div className={classes.statsValue}>
                    {CoinDetails.market_data.circulating_supply.toLocaleString()}{" "}
                    {""} {CoinDetails.symbol.toUpperCase()}
                  </div>
                  <div
                    className={`${
                      isMobile ? classes.statsLabelMob : classes.statsLabel
                    }`}
                    style={{
                      marginTop: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    Max Supply
                    <div className={classes.supplyValue}>
                      {CoinDetails.market_data.max_supply}
                    </div>
                  </div>
                  <div
                    className={`${
                      isMobile ? classes.statsLabelMob : classes.statsLabel
                    }`}
                    style={{
                      marginTop: "5px",
                      justifyContent: "space-between",
                    }}
                  >
                    Total Supply
                    <div className={classes.supplyValue}>
                      {CoinDetails.market_data.total_supply}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverViewDetails;
