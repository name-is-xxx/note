export function Request(way, url, data) {
  const timeout = 3000;
  const port = 8080;
  const newUrl = "http://localhost:" + port + "/backend" + url;
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    setTimeout(() => {
      request.abort();
      reject(new Error("Request timed out"));
    }, timeout);
    request.open(way, newUrl);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(data);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        console.log(request);
        if (request.status >= 200 && request.status < 300)
          resolve(JSON.parse(request.responseText));
        else reject(new Error(`Request failed with ${request.status}`));
      }
    };
  });
}
