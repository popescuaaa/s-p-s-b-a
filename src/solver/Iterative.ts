import { Solver } from "./Solver";
import { Buyer, MaxBidBuyer } from "../models/Buyer";
import { Result } from "../models/Result";
import * as TimSort from "timsort";

const EmptyResult: Result = {
  name: "",
  bid: -1,
};

class Iterative implements Solver {
  solve(buyers: Buyer[], reservedPrice: number): Result {
    if (buyers.length === 0) return EmptyResult;

    /* Get max bids from each buyer */
    const maxBidsBuyers: MaxBidBuyer[] = buyers.map(
      (buyer) =>
        <MaxBidBuyer>{
          name: buyer.name,
          bid: Math.max(...buyer.bids),
        }
    );

    /* Sort bid in descending order */
    TimSort.sort(
      maxBidsBuyers,
      (mx0: MaxBidBuyer, mx1: MaxBidBuyer) => mx1.bid - mx0.bid
    );

    console.log(maxBidsBuyers);

    return {
      name: maxBidsBuyers[0].name,
      bid:
        maxBidsBuyers[1].bid < reservedPrice
          ? maxBidsBuyers[0].bid
          : maxBidsBuyers[1].bid,
    };
  }
}

export default Iterative;
