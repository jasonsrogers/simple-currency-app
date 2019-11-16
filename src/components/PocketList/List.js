import React /*useState*/ from "react";

import { Pocket } from "components/PocketList/Pocket";
function List(props) {
  const { pockets, selectedFromPocketCurrency, onSelectPocket } = props;

  let entries = Object.entries(pockets);
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
}

export { List };
