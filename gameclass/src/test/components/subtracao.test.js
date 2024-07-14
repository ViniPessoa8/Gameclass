
import { expect, test } from "vitest";

function sub (a, b) {
    return a - b;
}

test("1 - 3 == 4", () => {
    expect(sub(1, 3)).toBe(-2);
});

test("-1 - (-1) == -2", () => {
    expect(sub(-1, -1)).toBe(0);
})