import React, { useState } from "react";

const renderPocket = pocket => {
  return (
    <li>
      <div>{pocket.code}</div>
      <div>{pocket.amount}</div>
      <div>{pocket.symbol}</div>
      <div>{pocket.description}</div>
    </li>
  );
};

const renderListPockets = list => {
  return (
    // TODO: should I change to a list of pockets, not sure if the convenience of pockets.GBP is worth the weird mapping
    <ul>{Object.entries(list).map(entryArr => renderPocket(entryArr[1]))}</ul>
  );
};

function PocketList(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const {
    state: { pockets }
  } = props;

  return <div>{renderListPockets(pockets)}</div>;
}

export { PocketList };
