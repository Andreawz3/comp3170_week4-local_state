import { useState } from "react";
import Country from "./components/country";

import data from "./data/countries.json";
import "./styles.css";

const countries = data.countries;
const HUNDRED_MILLION = 100000000;
const TWO_HUNDRED_MILLION = 200000000;
const FIVE_HUNDRED_MILLION = 500000000;
const ONE_BILLION_MILLION = 1000000000;

function sortAlpha() {
  return countries.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

function sortAsc() {
  return countries.sort(function (a, b) {
    return a.population - b.population;
  });
}

function sortDesc() {
  return countries.sort(function (a, b) {
    return b.population - a.population;
  });
}

function sortShuffle() {
  return countries.sort(() => Math.random() - 0.5);
}

export default function App() {
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState(">");

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function sort(option) {
    if (option === "alpha") {
      return sortAlpha();
    } else if (option === ">") {
      return sortDesc();
    } else if (option === "<") {
      return sortAsc();
    } else if (option === "shuffle") {
      return sortShuffle();
    } else {
      return data.countries;
    }
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function filter(list, option) {
    if (option === "all") {
      return list;
    } else if (option === "1") {
      return list.filter((country) => country.population < HUNDRED_MILLION);
    } else if (option === "100m") {
      return list.filter((country) => country.population > HUNDRED_MILLION);
    } else if (option === "200m") {
      return list.filter((country) => country.population > TWO_HUNDRED_MILLION);
    } else if (option === "500m") {
      return list.filter(
        (country) => country.population > FIVE_HUNDRED_MILLION
      );
    } else if (option === "1b") {
      return list.filter((country) => country.population > ONE_BILLION_MILLION);
    } else {
      return list.filter(function (country) {
        return country.continent.toLowerCase() === option;
      });
    }
  }

  const sortedCountries = sort(sortOption);

  const filteredCountries = filter(sortedCountries, filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>

        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="by continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>

            <optgroup label="by population size">
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>

      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country key={country.id} details={country} />;
        })}
      </div>
    </div>
  );
}
