import React from "react";
import { Link } from "react-router-dom";
import Carousel, { consts } from "react-elastic-carousel";
import CardItem from "./CardItem";
import classes from "./CardCarousal.module.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function CardCarousal({ trendingcoin }) {
  return (
    <div className="carousel-wrapper">
      <Carousel
        renderArrow={({ type, onClick }) => {
          const pointer =
            type === consts.PREV ? (
              <ChevronLeftIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            );
          return (
            <button className={classes.btnArrow} onClick={onClick}>
              {pointer}
            </button>
          );
        }}
        pagination={false}
        breakPoints={breakPoints}
      >
        {trendingcoin.map((coin) => (
          <Link
            className={classes.links}
            key={coin.id}
            to={`/detail/${coin.id}`}
          >
            <CardItem coin={coin} key={coin.id}></CardItem>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default CardCarousal;
