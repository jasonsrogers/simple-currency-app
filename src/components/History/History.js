import React, { useEffect } from "react";

function HistoryRow(props) {
  const {
    fromPocketCode,
    fromValue,
    toPocketCode,
    toValue,
    rate,
    date
  } = props.transaction;
  return (
    <div>
      {fromPocketCode} {fromValue} to {toPocketCode} {toValue} at rate {rate} on{" "}
      {date}
    </div>
  );
}

// Simple component to render list of History element
function History(props) {
  const { history = [] } = props;
  const rows = history.map(transaction => {
    return (
      <HistoryRow key={transaction.date} transaction={transaction}></HistoryRow>
    );
  });
  useEffect(() => {}, []);
  return (
    <div>
      <h1>History:</h1>
      <div className="history__rows-list">{rows}</div>
    </div>
  );
}

export { History, HistoryRow };
