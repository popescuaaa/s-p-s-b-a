import {display} from "../../src/module/dependency";

test('example test for isolated module', () => {
    expect(display("Hello! 👋")).toBe("Hello! 👋");
});
