import React from "react";
import { ConversionForm } from "components/Converter/ConversionForm";

function Converter(props) {
  const {
    state: {
      selectedPocketRates,
      selectedFromPocketCurrency,
      selectedToPocketCurrency,
      pockets
    },
    onTransferFunds,
    onSelectToPocket
  } = props;

  return (
    <div>
      <h1>Converter</h1>

      <ConversionForm
        selectedPocketRates={selectedPocketRates}
        pockets={pockets}
        selectedFromPocketCurrency={selectedFromPocketCurrency}
        selectedToPocketCurrency={selectedToPocketCurrency}
        onTransferFunds={onTransferFunds}
        onSelectToPocket={onSelectToPocket}
      />
    </div>
  );
}

export { Converter };
