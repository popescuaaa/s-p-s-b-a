import { Solver } from "./Solver";
import { Buyer } from "../models/Buyer";
import { Result } from "../models/Result";
import { EmptyResult } from "./Helpers";

interface RoundEntry {
  name: string;
  bid: number;
}

interface Winner {
  name: string;
  bid: number;
  winningBid: number;
  winningBidBuyerName: string;
  concurrentBids: number;
}

class Dynamic implements Solver {
  solve(buyers: Buyer[], reservedPrice: number): Result {
    if (buyers.length === 0) return EmptyResult;

    /* Define a so called `previous round winner for internal use` */
    let _winner: Winner = {
      name: "",
      bid: 0,
      winningBid: 0,
      winningBidBuyerName: "",
      concurrentBids: 0,
    };

    /* Reduce the buyers array to find the number of steps */
    const steps = Object.entries(buyers)
      .map((buyer) => buyer[1].bids.length)
      .reduce((b0, b1) => Math.max(b0, b1));

    for (let step = 0; step <= steps; ++step) {
      /* Compute the round winner */
      let round: RoundEntry[] = Object.entries(buyers).map((buyer) => {
        return {
          name: buyer[1].name,
          bid: buyer[1].bids[step] ? buyer[1].bids[step] : -1,
        };
      });

      _winner = this.computeRoundResult(reservedPrice, round, _winner);
    }

    if (_winner.winningBid === 0 && _winner.winningBidBuyerName === "") {
      /* Reduce the winning price to the reserved one */
      _winner.winningBid = reservedPrice;
      _winner.winningBidBuyerName = _winner.name;
    }

    if (_winner.concurrentBids > 1 || _winner.name === "") return EmptyResult;

    console.log("The winner is", _winner);

    return <Result>{
      name: _winner.name,
      bid: _winner.winningBid,
    };
  }

  /* Round result computation helper */
  private computeRoundResult = (
    reservedPrice: number,
    round: RoundEntry[],
    previousRoundWinner: Winner
  ): Winner => {
    /* Create the new potential winner entity */
    let _winner: Winner = {
      name: "",
      bid: 0,
      winningBid: 0,
      winningBidBuyerName: "",
      concurrentBids: 0,
    };

    for (let re = 0; re < round.length; ++re) {
      /* If the buyer has a smaller bid than the reserved price, skip */
      if (round[re].bid < reservedPrice) continue;

      /* Checking for the same bid int the same round */
      if (round[re].bid === _winner.bid) _winner.concurrentBids++;

      /* Search for a bid higher than the highest bid of a different buyer */
      if (round[re].bid > _winner.bid && round[re].name != _winner.name) {
        _winner.winningBid = _winner.bid;
        _winner.winningBidBuyerName = _winner.name;
        _winner.bid = round[re].bid;
        _winner.name = round[re].name;
        _winner.concurrentBids = 1;
      } else if (
        /* Search for a bid higher than the highest winning price of a different buyer */
        round[re].bid > _winner.winningBid &&
        round[re].name != _winner.name
      ) {
        _winner.winningBid = round[re].bid;
        _winner.winningBidBuyerName = round[re].name;
      }
    }

    if (
      previousRoundWinner.bid > _winner.bid &&
      previousRoundWinner.name !== _winner.name
    ) {
      _winner.bid = previousRoundWinner.bid;
      _winner.name = previousRoundWinner.name;
      _winner.concurrentBids = previousRoundWinner.concurrentBids;
    }

    /* Update previous winner */
    if (
      previousRoundWinner.bid > _winner.winningBid &&
      _winner.name !== previousRoundWinner.name
    ) {
      _winner.winningBid = previousRoundWinner.bid;
      _winner.winningBidBuyerName = previousRoundWinner.name;
    } else if (
      previousRoundWinner.winningBid > _winner.winningBid &&
      _winner.winningBidBuyerName !== previousRoundWinner.winningBidBuyerName
    ) {
      _winner.winningBid = previousRoundWinner.winningBid;
      _winner.winningBidBuyerName = previousRoundWinner.winningBidBuyerName;
    }

    return _winner;
  };
}

export default Dynamic;
