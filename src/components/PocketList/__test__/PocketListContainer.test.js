import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import PocketListContainer from "components/PocketList/PocketListContainer";
import { PocketList } from "components/PocketList/PocketList";
import reducer from "reducers/reducer";
import { BrowserRouter as Router} from "react-router-dom";

// TODO check if to use this: import configureMockStore from "redux-mock-store";

const store = createStore(
  reducer
  // applyMiddleware(
  //   thunkMiddleware // lets us dispatch() functions
  //   // loggerMiddleware // neat middleware that logs actions
  // )
);

describe("Pocket list container renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <PocketListContainer />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Renders a pocket list", () => {
    const container = mount(
      <Provider store={store}>
        <Router>
          <PocketListContainer />
        </Router>
      </Provider>
    );
    expect(container.find(PocketList)).toBeTruthy();
    // check that it renders one of the default pockets
    expect(container.text()).toContain("£");
  });
});
