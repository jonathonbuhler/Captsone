import { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import type { Laptop } from "../../../helpers/Laptop";

interface FilterProps {
  setLaptops: React.Dispatch<React.SetStateAction<Laptop[]>>;
}

function Filters({ setLaptops }: FilterProps) {
  const [filters, setFilters] = useState({
    title: undefined,
    brand: undefined,
    price_min: undefined,
    price_max: undefined,
    ram_type: undefined,
    ram_min: undefined,
    ram_max: undefined,
    storage_min: undefined,
    storage_max: undefined,
    touch_screen: undefined,
    screen_size_min: undefined,
    screen_size_max: undefined,
    used: false,
  });

  useEffect(() => {
    handleFilter();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name;
    const val = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [name]:
        val === "all" || val === ""
          ? undefined
          : val === "true"
            ? true
            : val === "false"
              ? false
              : isNaN(Number(val))
                ? val
                : Number(val),
    }));
  };

  const handleFilter = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    fetch(`http://localhost:8000/load-shop?${params.toString()}`).then((res) =>
      res.json().then((data) => setLaptops(data)),
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit");
    e.preventDefault();
    handleFilter();
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={handleChange}
      />

      <select name="brand" value={filters.brand} onChange={handleChange}>
        <option value="all">All</option>
        <option value="Apple">Apple</option>
      </select>
      <input
        value={filters.price_min}
        type="number"
        name="price_min"
        placeholder="Minimum Price"
        onChange={handleChange}
      />
      <input
        value={filters.price_max}
        type="number"
        name="price_max"
        placeholder="Maximum Price"
        onChange={handleChange}
      />
      <select name="ram_type" onChange={handleChange} value={filters.ram_type}>
        <option value="all">All</option>
        <option value="DDR4">DDR4</option>
        <option value="DDR5">DDR5</option>
        <option value="LPDDR5">LPDDR5</option>
      </select>
      <input
        type="number"
        name="ram_min"
        placeholder="Minimum Ram"
        onChange={handleChange}
        value={filters.ram_min}
      />
      <input
        type="number"
        name="ram_max"
        placeholder="Maximum Ram"
        onChange={handleChange}
        value={filters.ram_max}
      />
      <input
        type="number"
        name="storage_min"
        placeholder="Minimum Storage"
        onChange={handleChange}
        value={filters.storage_min}
      />
      <input
        type="number"
        name="storage_max"
        placeholder="Maximum Storage"
        onChange={handleChange}
        value={filters.storage_max}
      />
      <select
        name="touch_screen"
        onChange={handleChange}
        value={filters.touch_screen}
      >
        <option value="all">All</option>
        <option value="true">Touchscreen</option>
        <option value="false">Not Touchscreen</option>
      </select>
      <input
        type="number"
        name="screen_size_min"
        placeholder="Minimum Screen Size"
        onChange={handleChange}
        value={filters.screen_size_min}
      />
      <input
        type="number"
        name="screen_size_max"
        placeholder="Maximum Screen Size"
        onChange={handleChange}
        value={filters.screen_size_max}
      />
      <select name="used" value={String(filters.used)} onChange={handleChange}>
        <option value="false">New</option>
        <option value="true">Used / Refurbished</option>
        <option value="all">All</option>
      </select>
      <button onClick={handleFilter}>Load</button>
    </form>
  );
}

export default Filters;
