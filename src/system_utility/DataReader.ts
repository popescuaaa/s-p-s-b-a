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

const loadAllTests = (dirPath: string): Auction[] => {
  try {
    const assets = fs.readdirSync(dirPath);
    const allTestsFiles = assets.map((asset) => `${dirPath}/${asset}`);
    return allTestsFiles.map((testFile) => readYaml(testFile));
  } catch (e: any) {
    console.log(`There was an error when parsing folder: ${e}`);
    return [];
  }
};

export { readYaml, loadAllTests };
