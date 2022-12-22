import React, { useCallback, useState } from "react";

function Child() {
  const [search, setSearch] = useState("");

  const onSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  console.log("Child");

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Child;
