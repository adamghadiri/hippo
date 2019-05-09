import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "normalize-css/normalize.css";
import "./styles/styles.scss";
import './db/firebase'

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));

// var a = [];
// var b;
// for (var i = 0; i < 1000; i++) {
//   b = Math.floor(Math.random() * i + 1000);
//   a.push(b);
// }

// function solution(A) {
//   if (length.A < 5) {
//     return 0;
//   }
//   var p,
//     q,
//     minCost = 0;
//   for (p = 1; p < A.length - 3; p++) {
//     for (q = p + 2; q < A.length - 1; q++) {
//       if (!minCost) {
//         minCost = A[p] + A[q];
//       } else {
//         if (minCost > A[p] + A[q]) {
//           minCost = A[p] + A[q];
//         }
//       }
//     }
//   }
//   return minCost;
// }

// console.log(solution(a));
