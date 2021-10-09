import { Buyer } from "../models/Buyer";
import { EmptyResult, Result } from "../models/Result";

export interface Solver {
  solve(buyers: Buyer[], reservedPrice: number): Result | EmptyResult;
}
