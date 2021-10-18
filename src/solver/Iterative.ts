import { Solver } from "./Solver";
import { Buyer, MaxBidBuyer } from "../models/Buyer";
import { Result } from "../models/Result";
import * as TimSort from "timsort";
import { EmptyResult } from "./Helpers";

class Iterative implements Solver {
  solve(buyers: Buyer[], reservedPrice: number): Result {
    if (buyers.length === 0) return EmptyResult;

    /* Get max bids from each buyer */
    const maxBidsBuyers: MaxBidBuyer[] = buyers.map(
      (buyer) =>
        <MaxBidBuyer>{
          name: buyer.name,
          bid: buyer.bids.length !== 0 ? Math.max(...buyer.bids) : -1,
        }
    );

    /* Sort bid in descending order using TimSort */
    // TimSort.sort(
    //   maxBidsBuyers,
    //   (mx0: MaxBidBuyer, mx1: MaxBidBuyer) => mx1.bid - mx0.bid
    // );

    /**
     *  maxBid, preMaxBid
     * [ 1, 2, 3, 4, 5, 6]
     *
     *
     */

    const winner = maxBidsBuyers.reduce((b0, b1) => {
      if (b0.bid <= b1.bid) {
        return <MaxBidBuyer>{ name: b1.name, bid: b0.bid };
      } else {
        return <MaxBidBuyer>{ name: b0.name, bid: b1.bid };
      }
    });

    return <Result>{
      name: winner.name,
      bid: winner.bid <= reservedPrice ? reservedPrice : winner.bid,
    };

    // // O(N)
    // maxBidsBuyers.map((e) => {
    //   if (e.bid >= maxBid) {
    //     maxBid = e.bid;
    //     buyerName = e.name;
    //   }
    // });
    //
    // // O(N)
    // maxBidsBuyers.map((e) => {
    //   if (e.bid !== maxBid && e.bid >= preMaxBid) {
    //     preMaxBid = e.bid;
    //   }
    // });

    // if (preMaxBid >= reservedPrice) {
    //   return <Result>{
    //     name: buyerName,
    //     bid: preMaxBid,
    //   };
    // } else {
    //   return <Result>{
    //     name: buyerName,
    //     bid: reservedPrice,
    //   };
    // }

    // /* Empty result check for the specified case the max is -1*/
    // if (maxBidsBuyers[0].bid === -1) {
    //   return EmptyResult;
    // }
    //
    // /* There are at least two buyers who listed the same bid in current Auction */
    // if (maxBidsBuyers[0].bid === maxBidsBuyers[1].bid) {
    //   return EmptyResult;
    // }
    //
    // return {
    //   name: maxBidsBuyers[0].name,
    //   bid:
    //     maxBidsBuyers[1].bid <= reservedPrice
    //       ? reservedPrice
    //       : maxBidsBuyers[1].bid,
    // };
  }
}

export default Iterative;
