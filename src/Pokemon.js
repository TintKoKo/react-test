import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getByName } from "./PokemonAPI";

function Pokemon() {
  console.log("Pokemon Render");

  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    getByName(search).then((p) => setPokemon(p));
  }, [search]);

  const onSearchChange = useCallback((evt) => {
    setSearch(evt.target.value);
  }, []);

  const onThresholdChange = useCallback((evt) => {
    setThreshold(parseInt(evt.target.value, 10) || "");
  }, []);

  const pokemonWithPower = useMemo(() => {
    return pokemon.map((p) => ({ ...p, power: calculatePower(p) }));
  }, [pokemon]);

  const countOverThreshold = useMemo(
    () => pokemonWithPower.filter((p) => p.power > threshold).length,
    [pokemonWithPower, threshold]
  );

  const min = useMemo(
    () => Math.min(...pokemonWithPower.map((p) => p.power)),
    [pokemonWithPower]
  );

  const max = useMemo(
    () => Math.max(...pokemonWithPower.map((p) => p.power)),
    [pokemonWithPower]
  );

  return (
    <div>
      <div>
        <div>Search</div>
        <input
          placeholder="Search"
          type="text"
          value={search}
          onChange={onSearchChange}
        />
        <div>Power threshold</div>
        <input
          placeholder="Threshold"
          type="text"
          value={threshold}
          onChange={onThresholdChange}
        />
        <div>Count over threshold {countOverThreshold}</div>
        <div>
          Min - {min} Max - {max}
        </div>
      </div>
      <PokemonTable pokemon={pokemonWithPower} />
    </div>
  );
}

function PokemonTable({ pokemon }) {
  console.log("Pokemon Table Render");

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>hp</th>
            <th>attack</th>
            <th>defense</th>
            <th>special attack</th>
            <th>special defense</th>
            <th>speed</th>
            <th>power</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.type.join(", ")}</td>
              <td>{p.hp}</td>
              <td>{p.attack}</td>
              <td>{p.defense}</td>
              <td>{p.special_attack}</td>
              <td>{p.special_defense}</td>
              <td>{p.speed}</td>
              <td>{p.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const calculatePower = (pokemon) =>
  pokemon.hp +
  pokemon.attack +
  pokemon.defense +
  pokemon.special_attack +
  pokemon.special_defense +
  pokemon.speed;

export default Pokemon;
