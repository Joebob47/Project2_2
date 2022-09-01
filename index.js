// load the core node http module
const http = require("http");

// load the core node filesystem (fs) module, using js promises instead of callbacks
// a promise represents eventual completion of asynch operation and its result
const fileSys = require('fs').promises;

// create a function to respond to http requests
// special variable __dirname has absolute path of where node code is running
// if fs.readFile() successful, it returns data 
// use then() method to handle success - contents parameter contains HTML file data
const requestListener = function (httpReq, serverRes) {
  // output request url
  console.log(httpReq.url);

  if (httpReq.url === "/") {
    // check request url, if root, return html file
    fileSys.readFile(__dirname + "/responseFile.html")
      .then(fileContents => {
        // set http response header entry
        serverRes.setHeader("Content-Type", "text/html; charset=UTF-8");
        // return 200 OK http status code
        serverRes.writeHead(200);
        // send back file contents + close response
        serverRes.end(fileContents);
      });
  } else {
    // if request url not root, return json file
    fileSys.readFile(__dirname + "/stuff.json")
      .then(fileContents => {
        // set http response header entry
        serverRes.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        serverRes.writeHead(200);
        // send back file contents + close response
        serverRes.end(fileContents);
      });

  }
  
};

// create an http server instance
const myServer = http.createServer(requestListener);

// define the TCP port and IP address to tell our http server to listen to
const iPA = "0.0.0.0";
const myPort = "8080";

// call the listen() method to start listening to http requests
myServer.listen(
  myPort, iPA, () => {
    console.log(`Server is running on http://${iPA}:${myPort}`);
    // console.log("Server is running on http://" + host + ":" + port);
  }
);

