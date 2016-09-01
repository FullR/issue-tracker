import "babel-polyfill";
import "index.html";
import ReactDOM from "react-dom";
import React from "react";
import Router from "router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
window.noop = function() {};

// const sound = new Howl({
//   src: ["/api/sound/foo/baboon"],
//   format: "mp3",
//   autoplay: true,
//   onload() {
//     console.log("Loaded!");
//     //sound.play();
//   },
//   onloaderror(error) {
//     console.log(`Failed to load: ${error}`);
//   }
// });

function App() {
  return (
    <MuiThemeProvider>
      <Router/>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App/>, document.querySelector("#app-container")
);
