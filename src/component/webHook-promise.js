// export function get(url) {
//   return fetch(url)
//     .then((response) => response.json())
//     .catch((error) => {
//       console.error("error", error);
//     });
// }

// export function post(url) {
//   const timeout = 3000;
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     setTimeout(() => {
//       request.abort();
//       reject(new Error("Request timed out"));
//     }, timeout);
//     request.open("GET", url);
//     // request.send(null);
//     request.onreadystatechange = function () {
//       if (request.readyState === 4) {
//         if (request.status >= 200 && request.status < 300)
//           resolve(request.responseText);
//         else reject(new Error(`Request failed with ${request.status}`));
//       }
//     };
//   });
// }
