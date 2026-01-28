import { useEffect, useState } from "react";
import type { Laptop } from "../../helpers/Laptop";
import styles from "./Shop.module.css";

function Shop() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
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
    used: undefined,
  });

  useEffect(() => {
    fetch("http://localhost:8000/load-shop")
      .then((res) => res.json())
      .then((data) => {
        setLaptops(data);
      })
      .catch((err) => console.error(err));
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

  return (
    <div className={styles.shop}>
      <h1>Shop</h1>
      <div className={styles.filters}>
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
        <select
          name="ram_type"
          onChange={handleChange}
          value={filters.ram_type}
        >
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
        <select name="used" value={filters.used} onChange={handleChange}>
          <option value="false">New</option>
          <option value="true">Used / Refurbished</option>
          <option value="all">All</option>
        </select>
        <button onClick={handleFilter}>Load</button>
      </div>
      <div className={styles.items}>
        {laptops.map((l, i) => {
          return (
            <div className={styles.laptop} key={i}>
              <img src={l.img_url} alt="" />
              <a href={`https://www.amazon.com/dp/${l.asin}`} target="_blank">
                <p>
                  {l.title.slice(0, 75)}
                  {l.title.length > 75 ? "..." : ""}
                </p>
              </a>

              <p>${l.price.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
