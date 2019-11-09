import React, { useState } from "react";

const renderPocket = pocket => {
  return (
    <li key={pocket.code}>
      <div>{pocket.code}</div>
      <div>{pocket.amount}</div>
      <div>{pocket.symbol}</div>
      <div>{pocket.description}</div>
    </li>
  );
};

const renderListPockets = (list = {}) => {
  // TODO: should I change to a list of pockets, not sure if the convenience of pockets.GBP is worth the weird mapping
  let entries = Object.entries(list);
  if (entries.length) {
    return <ul>{entries.map(entryArr => renderPocket(entryArr[1]))}</ul>;
  } else {
    return <div>No pockets configured</div>;
  }
};

function PocketList(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const {
    state: { pockets = [] }
  } = props;

  return <div>{renderListPockets(pockets)}</div>;
}

export { PocketList };
