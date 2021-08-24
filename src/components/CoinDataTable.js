import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  TablePagination,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SmallLineChart from "./SmallLineChart";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Up } from "../assets/up.svg";

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
      alignItems: "center",
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
    tblPagination: {
      backgroundColor: "rgb(23, 25, 36)",
    },
    dataRow: {
      "&:hover": {
        backgroundColor: "rgb(23, 25, 36)",
      },
    },
    hourChange: {
      color: "green",
    },
    hourChangeNeg: {
      color: "red",
    },
  };
});

function CoinDataTable({ Allcoin }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
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
            {Allcoin.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((coin) => (
              <TableRow key={coin.name} className={classes.dataRow}>
                <TableCell className={classes.stickyIcon}>
                  <StarBorderIcon
                    style={{ cursor: "pointer" }}
                    button="true"
                    fontSize="small"
                  />
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
                <TableCell
                  align="right"
                  className={
                    coin.price_change_percentage_24h > 0
                      ? classes.hourChange
                      : classes.hourChangeNeg
                  }
                >
                  <Grid container wrap="nowrap">
                    <Grid item xs={5} sm={6} md={6} lg={3} xl={3}>
                      {coin.price_change_percentage_24h > 0 ? (
                        <Up fill="green" />
                      ) : (
                        <Down fill="red" />
                      )}
                    </Grid>
                    <Grid item xs={3} sm={6} md={6} lg={9} xl={9}>
                      {coin.price_change_percentage_24h.toFixed(1)}
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell align="right">${coin.market_cap}</TableCell>
                <TableCell align="right">${coin.total_volume}</TableCell>
                <TableCell align="right">
                  {coin.circulating_supply} {coin.symbol.toUpperCase()}
                </TableCell>
                <TableCell align="right">
                  <Link className={classes.links} to={`/detail/${coin.id}`}>
                    <SmallLineChart
                      data={coin.sparkline_in_7d}
                      per7Change={coin.price_change_percentage_7d_in_currency}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          className={classes.tblPagination}
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={Allcoin.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default CoinDataTable;
