#!/usr/bin/env node

import { loadAllTests } from "./src/system_utility/DataReader";
import { Auction } from "./src/models/Auction";
import Dynamic from "./src/solver/Dynamic";
import Iterative from "./src/solver/Iterative";

const playground = () => {
  const data: Auction[] = loadAllTests("./assets");
  const iSolver = new Iterative();

  const iResult = iSolver.solve(
    Object.entries(data[4].buyers).map((e) => e[1]),
    data[4].reservedPrice
  );

  console.log("Iterative version result", iResult);
};

playground();
