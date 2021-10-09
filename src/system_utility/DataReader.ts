/**
 *  Node.js YAML file data reader
 */

import * as fs from "fs";
import * as yaml from "js-yaml";
import { Auction } from "../models/Auction";
import { Result } from "../models/Result";

const readYaml = (yamlFile: string): Auction => {
  try {
    const fileContents = fs.readFileSync(yamlFile, "utf8");
    return <Auction>yaml.load(fileContents);
  } catch (e) {
    return <Auction>{
      auctionName: "",
      buyers: [],
      reservedPrice: -1,
      expectedResult: <Result>{},
    };
  }
};

export { readYaml };
