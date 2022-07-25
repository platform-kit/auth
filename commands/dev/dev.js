const path = require("path");
const fs = require("fs");
var util = require("util");
var child_process = require("child_process");
var exec = require("child_process").exec;
var dotenv = require("dotenv").config();

(async () => {

  var prefix = "http";
  if(process.env.ENVIRONMENT == 'development') {
    prefix = "https";
  }

  console.log(
    "🚀 Running UI development server @ " + prefix + "://localhost:3000 \n"
  );

  // UI Dev Server
  const ui = await exec(
    "cd ui; npm run dev;",
    function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log("Error code: " + error.code);
        console.log("Signal received: " + error.signal);
      }
      console.log("Child Process STDOUT: " + stdout);
      console.log("Child Process STDERR: " + stderr);
    }
  );

  ui.on("exit", function (code) {
    console.log("Child process exited with exit code " + code);
  });

  ui.stdout.on("data", function (data) {
    ui.stdout.write(util.format(data.toString()));
  });

  // HTTPS Server
  const https = exec(
    "npm run start",
    function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log("Error code: " + error.code);
        console.log("Signal received: " + error.signal);
      }
      console.log("Child Process STDOUT: " + stdout);
      console.log("Child Process STDERR: " + stderr);
    }
  );

  https.on("exit", function (code) {
    console.log("Child process exited with exit code " + code);
  });


  https.stdout.on("data", function (data) {
    console.log(data);
  });  

})();
