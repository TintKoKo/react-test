import React, { memo, useCallback, useMemo, useState } from "react";

function App() {
  const [appRender, setAppRender] = useState(1);
  const [color, setColor] = useState("red");

  console.log(`APP render ${appRender}`);

  const params = useMemo(() => ({ color }), [color]);
  const onClick = useCallback(() => {}, []);

  return (
    <div>
      <button onClick={() => setAppRender(appRender + 1)}>App Re-Render</button>
      <button onClick={() => setColor(color === "red" ? "blue" : "red")}>
        Chanage Color
      </button>
      <MemorizedSwatch params={params} onClick={onClick} />
    </div>
  );
}

function Swatch({ params, onClick }) {
  console.log(`Swatch render ${params.color}`);

  return (
    <div>
      <div
        style={{ width: 50, height: 50, background: params.color }}
        onClick={onClick}
      ></div>
    </div>
  );
}

const MemorizedSwatch = memo(Swatch);

export default App;
