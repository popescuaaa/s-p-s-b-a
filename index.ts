#!/usr/bin/env node

import { loadAllTests, readYaml } from "./src/system_utility/DataReader";
import { Auction } from "./src/models/Auction";
import fs from "fs";
import Iterative from "./src/solver/Iterative";

const data: Auction[] = loadAllTests("./assets");
console.log(data[4].buyers);
const solver = new Iterative();
console.log(
  solver.solve(
    Object.entries(data[4].buyers).map((e) => e[1]),
    data[4].reservedPrice
  )
);
