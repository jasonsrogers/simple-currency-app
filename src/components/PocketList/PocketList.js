import React /*useState*/ from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export function Pocket(props) {
  const {
    pocket: { code, amount, symbol, description },
    onSelectPocket,
    isPocketSelected
  } = props;
  return (
    <div
      className={
        "pocket__container " + (isPocketSelected ? "pocket__is-selected" : "")
      }
    >
      <div className="pocket__info">
        <div className="pocket__amount">
          {symbol} {amount}
        </div>
        <div className="pocket__description">{description}</div>
      </div>
      <div className="pocket__button-container">
        {!isPocketSelected && (
          <Button
            onClick={() => {
              onSelectPocket(code);
            }}
          >
            Select
          </Button>
        )}
        {isPocketSelected && (
          <div className="pocket__nav">
            <Button disabled>Top Up</Button>
            <Link to="/exchange">Exchange</Link>
            <Button disabled>Bank</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const renderListPockets = (
  list = {},
  onSelectPocket,
  selectedFromPocketCurrency
) => {
  // TODO: should I change to a list of pockets, not sure if the convenience of pockets.GBP is worth the weird mapping
  let entries = Object.entries(list);
  if (entries.length) {
    return (
      <div>
        {entries.map(entryArr => {
          let pocket = entryArr[1];
          return (
            <Pocket
              key={entryArr[0]}
              pocket={pocket}
              onSelectPocket={onSelectPocket}
              isPocketSelected={pocket.code === selectedFromPocketCurrency}
            />
          );
        })}
      </div>
    );
  } else {
    return <div>No pockets configured</div>;
  }
};

function PocketList(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const {
    state: { pockets = {}, selectedFromPocketCurrency },
    onSelectPocket
  } = props;

  return (
    <div>
      <div className="pocket-list__title">
        <h1>My Pockets:</h1>
        <Button disabled>Add Pocket</Button>
      </div>
      {renderListPockets(pockets, onSelectPocket, selectedFromPocketCurrency)}
    </div>
  );
}

export { PocketList };
