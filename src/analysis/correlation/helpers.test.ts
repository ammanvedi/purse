import { createAllBinaryPermutationsForSequenceLength } from "./helpers";

describe("Helpers", () => {
  describe("createAllBinaryPermutationsForSequenceLength", () => {
    it("Creates the permutations", () => {
      const res = createAllBinaryPermutationsForSequenceLength(3);
      expect(res).toMatchObject([
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 0],
        [0, 1, 1],
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0]
      ]);
    });
  });
});
