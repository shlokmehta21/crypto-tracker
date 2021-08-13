import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  withStyles,
  Grid,
  Avatar,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const TableCell = withStyles({
  root: {
    borderColor: "rgb(34,37,49)",
  },
})(MuiTableCell);

const useStyles = makeStyles((theme) => {
  return {
    table: {
      minWidth: 650,
      backgroundColor: "rgb(23, 23, 26)",
    },
    stickyName: {
      //     display: "flex",
      //     flexWrap: "nowrap",
      alignItems: "center",
      //   justifyContent: "center",
      position: "sticky",
      left: "63px",
      backgroundColor: "rgb(23, 23, 26)",
    },
    stickyIcon: {
      position: "sticky",
      left: "-5px",
      backgroundColor: "rgb(23, 23, 26)",
    },
    stickyNumber: {
      position: "sticky",
      left: "28px",
      backgroundColor: "rgb(23, 23, 26)",
    },
    Coinname: {
      marginTop: "10px",
      backgroundColor: "rgb(23, 23, 26)",
    },
    avatar: {
      height: "24px",
      width: "24px",
      marginTop: "10px",
    },
    links: {
      textDecoration: "none",
      color: "#fff",
    },
  };
});

function CoinDataTable() {
  const [AllCoins, setAllCoins] = useState([]);
  const classes = useStyles();

  const fetchAllCoins = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      )
      .then((response) => {
        const data = response.data;
        setAllCoins(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.stickyIcon}></TableCell>
            <TableCell className={classes.stickyNumber}>#</TableCell>
            <TableCell className={classes.stickyName}>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h%</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Volume(24h)</TableCell>
            <TableCell align="right">Circulating Supply</TableCell>
            <TableCell align="right">Last 7 Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AllCoins.map((coin) => (
            <TableRow key={coin.name}>
              <TableCell className={classes.stickyIcon}>
                <StarBorderIcon button="true" fontSize="small" />
              </TableCell>
              <TableCell className={classes.stickyNumber}>
                {coin.market_cap_rank}
              </TableCell>
              <TableCell
                className={classes.stickyName}
                component="th"
                scope="row"
                mr={4}
              >
                <Link className={classes.links} to={`/detail/${coin.id}`}>
                  <Grid container wrap="nowrap">
                    <Grid item xs={5} sm={6} md={6} lg={3} xl={3}>
                      <Avatar className={classes.avatar} src={coin.image} />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sm={6}
                      md={6}
                      lg={9}
                      xl={9}
                      className={classes.Coinname}
                    >
                      {coin.name} {coin.symbol.toUpperCase()}
                    </Grid>
                  </Grid>
                </Link>
              </TableCell>
              <TableCell align="right">
                <Link className={classes.links} to={`/detail/${coin.id}`}>
                  ${coin.current_price}
                </Link>
              </TableCell>
              <TableCell align="right">
                {Math.trunc(coin.price_change_percentage_24h)}
              </TableCell>
              <TableCell align="right">${coin.market_cap}</TableCell>
              <TableCell align="right">${coin.total_volume}</TableCell>
              <TableCell align="right">
                {coin.circulating_supply} {coin.symbol.toUpperCase()}
              </TableCell>
              <TableCell align="right">
                <Link className={classes.links} to={`/detail/${coin.id}`}>
                  <img
                    src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/1.png"
                    alt=""
                  />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoinDataTable;
