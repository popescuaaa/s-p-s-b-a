import { Buyer } from "./Buyer";
import { Result } from "./Result";

export interface Auction {
  auctionName: string;
  buyers: Buyer[];
  expectedResult: Result;
  reservedPrice: number;
}
