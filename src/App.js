import React, { useState } from "react";
import autoprefixer from "autoprefixer";
import Textarea from "react-textarea-autosize";
import postcss from "postcss";
import "./App.css";

// (await import("es6-promise")).polyfill();

const defaultAutoprefixerSrc = `::placeholder {
  color: gray;
}`;

const autoprefixer_config = {
  grid: true,
  overrideBrowserslist: [
    // Country statistics is not supported in client-side build of Browserslist
    // '> 10% in RU',
    // '> 10% in UA',
    "last 6 versions",
    "ff ESR",
    "opera >= 12",
    "safari >= 5",
    "ios >= 8",
    "ie >= 8"
  ]
};

function addPrefixes(css) {
  return postcss([autoprefixer(autoprefixer_config)])
    .process(css, { from: undefined })
    .then(function(result) {
      return result.css;
    });
}

function Autoprefixer() {
  const [css, setCss] = useState(defaultAutoprefixerSrc);

  function handleChange(e) {
    setCss(e.target.value);
  }

  function handleAddPrefixes() {
    addPrefixes(css).then(css => setCss(css));
  }

  return (
    <div className="tool-autoprefixer">
      <p>
        <button onClick={handleAddPrefixes}>add prefixes</button>
      </p>
      <p>
        <Textarea value={css} onChange={handleChange} />
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <div>
        <h3>Autoprefixer</h3>
        <Autoprefixer />
      </div>
      <hr />
      <div></div>
    </div>
  );
}

export default App;
