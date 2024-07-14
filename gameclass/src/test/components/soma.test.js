import { expect, test } from "vitest";

function soma (a, b) {
    return a + b;
}

test("1 + 3 == 4", () => {
    expect(soma(1, 3)).toBe(4);
});

test("-1 + (-1) == -2", () => {
    expect(soma(-1, -1)).toBe(-2);
})