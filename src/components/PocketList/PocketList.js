import React /*useState*/ from "react";
import Button from "react-bootstrap/Button";
import { Pocket } from "components/PocketList/Pocket";

const renderListPockets = (
  list = {},
  onSelectPocket,
  selectedFromPocketCurrency
) => {
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

// Component that contains the list of Pocket
function PocketList(props) {
  // this is temp just to check that everything is connected correctly with react-redux
  // will change once the proper reduces come into play ^^
  const { pockets = {}, selectedFromPocketCurrency, onSelectPocket } = props;

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
