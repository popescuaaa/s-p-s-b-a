import { Auction } from "../../src/models/Auction";
import { loadAllTests } from "../../src/system_utility/DataReader";
import Dynamic from "../../src/solver/Dynamic";
import Iterative from "../../src/solver/Iterative";

describe("Iterative solution", () => {
  const data: Auction[] = loadAllTests("./assets");
  const solver = new Iterative();

  data.forEach((dataEntry) =>
    test(`Testcase: ${dataEntry.auctionName}`, () => {
      const result = solver.solve(
        Object.entries(dataEntry.buyers).map((b) => b[1]),
        dataEntry.reservedPrice
      );
      expect(result).toStrictEqual(dataEntry.expectedResult);
    })
  );
});
