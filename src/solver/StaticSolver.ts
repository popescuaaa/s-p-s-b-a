import { Solver } from "./Solver";
import { Buyer } from "../models/Buyer";
import { Result } from "../models/Result";

class StaticSolver implements Solver {
  solve(buyers: Buyer[], reservedPrice: number): Result {
    return { name: "", bid: -1 };
  }
}
