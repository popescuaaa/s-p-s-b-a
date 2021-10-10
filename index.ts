#!/usr/bin/env node

import { loadAllTests } from "./src/system_utility/DataReader";
import { Auction } from "./src/models/Auction";
import Dynamic from "./src/solver/Dynamic";
import Iterative from "./src/solver/Iterative";

const playground = () => {
  const data: Auction[] = loadAllTests("./assets");
  const iSolver = new Iterative();
  const dSolver = new Dynamic();

  const iResult = iSolver.solve(
    Object.entries(data[4].buyers).map((e) => e[1]),
    data[4].reservedPrice
  );

  const dResult = dSolver.solve(
    Object.entries(data[4].buyers).map((e) => e[1]),
    data[4].reservedPrice
  );

  console.log("Dynamic version result", dResult);
  console.log("Iterative version result", iResult);

  console.log(dResult.bid === iResult.bid && dResult.name === iResult.name);
};

playground();
