import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { History, HistoryRow } from "components/History/History";

const history = [
  {
    fromPocketCode: "EUR",
    fromValue: 12,
    toPocketCode: "GBP",
    toValue: 10,
    rate: 1.2,
    date: "Sun Nov 17 2019 23:55:38 GMT+0000 (Greenwich Mean Time)"
  },
  {
    fromPocketCode: "EUR",
    fromValue: 14,
    toPocketCode: "USD",
    toValue: 20,
    rate: 1.6,
    date: "Sun Nov 18 2019 23:55:38 GMT+0000 (Greenwich Mean Time)"
  }
];

describe("History renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");
    const state = {};
    // not checking calls, just atomic test to check that it works at it's most basic
    ReactDOM.render(<History {...state} onFetchRates={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(true).toBeTruthy();
  });

  it("It renders history", () => {
    const state = { history };

    const historyWrapper = mount(<History {...state} />);
    const ratesTitle = historyWrapper.find("h1");
    expect(ratesTitle).toHaveLength(1);
    expect(ratesTitle.text()).toBe("History:");

    expect(historyWrapper.find(HistoryRow).length).toBe(2);
  });
  it("It renders history row", () => {
    const transaction = history[0];

    const historyRowWrapper = mount(<HistoryRow transaction={transaction} />);
    const rowText = historyRowWrapper.text();
    expect(rowText).toContain("EUR 12");
    expect(rowText).toContain("to GBP 10");
    expect(rowText).toContain("at rate 1.2");
    expect(rowText).toContain(
      "on Sun Nov 17 2019 23:55:38 GMT+0000 (Greenwich Mean Time)"
    );
  });
});
