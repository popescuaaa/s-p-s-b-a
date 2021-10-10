import { Buyer } from "../models/Buyer";
import { Result } from "../models/Result";

export interface Solver {
  solve(buyers: Buyer[], reservedPrice: number): Result;
}
