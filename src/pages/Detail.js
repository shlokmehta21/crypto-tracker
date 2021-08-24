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
import StarBorderIcon from "@material-ui/icons/StarBorder";

function Detail() {
  const { id } = useParams();
  const [CoinDetails, setCoinDetails] = useState();
  const history = useHistory();

  const fetchDetails = useCallback(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false`
      )
      .then((response) => {
        console.log(response.data);
        setCoinDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchDetails();
    }
    const cleanup = () => {
      mounted = false;
    };

    return cleanup();
  }, [fetchDetails]);

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
                    <StarBorderIcon
                      style={{ cursor: "pointer" }}
                      button="true"
                      fontSize="small"
                    />
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
                    $
                    {CoinDetails.market_data.current_price.usd.toLocaleString()}
                  </div>
                  <span className={classes.pricePercentage}>
                    {CoinDetails.market_data.price_change_percentage_24h.toFixed(
                      2
                    )}
                    %
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
                          ${" "}
                          {CoinDetails.market_data.market_cap.usd.toLocaleString()}
                        </div>
                        <span className={classes.stats_percentage}>
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
                          {typeof CoinDetails.market_data
                            .fully_diluted_valuation === {}
                            ? "-"
                            : CoinDetails.market_data.fully_diluted_valuation
                                .usd}
                        </div>

                        <span className={classes.stats_percentage}>
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
                        <span className={classes.stats_percentage}>
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
                      <div className={classes.statsLabel}>
                        Circulating Supply
                      </div>
                      <div className={classes.statsItem}>
                        <div className={classes.statsValue}>
                          {CoinDetails.market_data.circulating_supply.toLocaleString()}{" "}
                          {""} {CoinDetails.symbol.toUpperCase()}
                        </div>
                        <div
                          className={classes.statsLabel}
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
                          className={classes.statsLabel}
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
        </Container>
      )}
    </>
  );
}

export default Detail;
