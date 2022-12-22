import React, { useState } from "react";
import Pokemon from "./Pokemon";

function App() {
  // const addFive = (a) => a + 5;
  // const substractTwo = (a) => a - 2;
  // const multiplyTwo = (a) => a * 2;

  // const compose = (...fns) => {
  //   return (param) => {
  //     return fns.reduceRight((acc, cur) => cur(acc), param);
  //   };
  // };

  // const a = compose(addFive, substractTwo, multiplyTwo);
  // console.log(a(2));

  const myDebounce = (cb, delay) => {
    let timer;

    return function (...args) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        cb.apply(this, args);
      }, delay);
    };
  };

  const handleChange = myDebounce((e) => console.log(e.target.value), 1000);

  return (
    <div>
      <input onChange={handleChange} />
      {/* <Pokemon /> */}
    </div>
  );
}

export default App;
