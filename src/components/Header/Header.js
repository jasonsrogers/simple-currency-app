import React, { /*useState,*/ useEffect } from "react";
import { fetchRates } from "actions/actions";
import { connect } from "react-redux";
let intervalId;
function Header(props) {
  const {
    state: { selectedFromPocketCurrency },
    onFetchRates,
    timer = 10000
  } = props;

  //   onFetchRates(selectedFromPocketCurrency);
  // TODO reanable polling once dev is done (locks account if to many requrests :( )
  useEffect(() => {
    onFetchRates(selectedFromPocketCurrency);
    //     intervalId = setInterval(() => {
    //       onFetchRates();
    //     }, timer);
    //     // cleanup up interval componentDidUnmount
    //     return () => {
    //       clearInterval(intervalId);
    //     };
  }, [onFetchRates, timer]);

  return (
    <header className="app__header">
      <h1>Demo trading app</h1>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRates(currency) {
      dispatch(fetchRates(currency));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
