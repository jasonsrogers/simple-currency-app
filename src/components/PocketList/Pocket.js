import React /*useState*/ from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

// Component that displays and handles Pocket informatio
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
