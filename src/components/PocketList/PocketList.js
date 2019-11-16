import React /*useState*/ from "react";
import Button from "react-bootstrap/Button";
import { List } from "components/PocketList/List";

// const renderListPockets = (
//   list = {},
//   onSelectPocket,
//   selectedFromPocketCurrency
// ) => {
//   let entries = Object.entries(list);
//   if (entries.length) {
//     return (
//       <div>
//         {entries.map(entryArr => {
//           let pocket = entryArr[1];
//           return (
//             <Pocket
//               key={entryArr[0]}
//               pocket={pocket}
//               onSelectPocket={onSelectPocket}
//               isPocketSelected={pocket.code === selectedFromPocketCurrency}
//             />
//           );
//         })}
//       </div>
//     );
//   } else {
//     return <div>No pockets configured</div>;
//   }
// };

// Component that contains the list of Pocket
function PocketList(props) {
  const { pockets = {}, selectedFromPocketCurrency, onSelectPocket } = props;
  const params = {
    pockets,
    selectedFromPocketCurrency,
    onSelectPocket
  };
  return (
    <div>
      <div className="pocket-list__title">
        <h1>My Pockets:</h1>
        <Button disabled>Add Pocket</Button>
      </div>
      <List {...params} />
    </div>
  );
}

export { PocketList };
