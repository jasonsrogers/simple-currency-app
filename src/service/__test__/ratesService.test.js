import * as service from "service/ratesService";

describe("Rounded operations: ", () => {
  it("Should round numbers", () => {
    expect(service.roundValue(12)).toBe(12);
    expect(service.roundValue(12.12)).toBe(12.12);
    expect(service.roundValue(12.123)).toBe(12.12);
    expect(service.roundValue(12.99)).toBe(12.99);
    expect(service.roundValue(12.995)).toBe(12.99);
    expect(service.roundValue(12.946)).toBe(12.95);
    expect(service.roundValue(12.999)).toBe(13);

    // Negative number testing
    expect(service.roundValue(-12)).toBe(-12);
    expect(service.roundValue(-12.12)).toBe(-12.12);
    expect(service.roundValue(-12.123)).toBe(-12.12);
    expect(service.roundValue(-12.995)).toBe(-12.99);
    expect(service.roundValue(-12.946)).toBe(-12.95);
    expect(service.roundValue(-12.999)).toBe(-13);

    // Note: possibility to round further than 2 decimal points, currently not used but it's there for free ^^
    expect(service.roundValue(12.123, 3)).toBe(12.123);
  });

  it("Should add then round", () => {
    expect(service.roundAdd(12)).toBe(12);
    expect(service.roundAdd(12, 13)).toBe(25);
    expect(service.roundAdd(12, 13, 14, 15, 16)).toBe(70);
    expect(service.roundAdd(12, -13, 14, -15, 16)).toBe(14);

    // this is why you need to round add
    expect(0.1 + 0.2).toBe(0.30000000000000004);
    expect(service.roundAdd(0.1, 0.2)).toBe(0.3);

    expect(service.roundAdd(12.12, 13.13)).toBe(25.25);
    expect(service.roundAdd(12.75, 13.86)).toBe(26.61);
    expect(service.roundAdd(12.111, 13.111)).toBe(25.22);
    expect(service.roundAdd(12.114, 13.114)).toBe(25.23);
  });
  it("Should sub then round", () => {
    expect(service.roundSub(12)).toBe(12);
    expect(service.roundSub(12, 13)).toBe(-1);
    expect(service.roundSub(13, 12)).toBe(1);
    expect(service.roundSub(40, 13, 14)).toBe(13);

    // this is why you need to round add
    expect(0.12 - 0.1).toBe(0.01999999999999999);
    expect(service.roundSub(0.12 - 0.1)).toBe(0.02);

    expect(service.roundSub(12.12, 13.13)).toBe(-1.01);
    expect(service.roundSub(12.75, 13.86)).toBe(-1.11);
    expect(service.roundSub(12.111, 13.111)).toBe(-1);
    expect(service.roundSub(12.114, 13.114)).toBe(-1);
  });
});
