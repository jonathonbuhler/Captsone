import { useEffect } from "react";
import styles from "./Filters.module.css";
import type { Laptop } from "../../../helpers/Laptop";
import { type Filter, filterFetch } from "../../../helpers/filter";

interface FilterProps {
  laptops: Laptop[];
  setLaptops: React.Dispatch<React.SetStateAction<Laptop[]>>;
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  page: number;
}

function Filters({
  setLaptops,
  laptops,
  page,
  filters,
  setFilters,
}: FilterProps) {
  useEffect(() => {
    handleFilter();
  }, [page]);

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
    filterFetch(filters, setLaptops, page);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit");
    e.preventDefault();
    handleFilter();
  };

  return (
    <>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <h3>Filters</h3>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={handleChange}
        />
        <label htmlFor="brand">Brand</label>
        <select name="brand" value={filters.brand} onChange={handleChange}>
          <option value="all">All</option>
          <option value="Apple">Apple</option>
          <option value="Alienware">Alienware</option>
          <option value="Microsoft">Microsoft</option>
          <option value="HP">HP</option>
          <option value="ASUS">ASUS</option>
          <option value="Samsung">Samsung</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Acer">Acer</option>
          <option value="Dell">Dell</option>
          <option value="KAIGERR">KAIGERR</option>
        </select>
        <label htmlFor="price_min">Price</label>
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
        <label htmlFor="ram_type">Ram Type</label>
        <select
          name="ram_type"
          onChange={handleChange}
          value={filters.ram_type}
        >
          <option value="all">All</option>
          <option value="DDR3">DDR3</option>
          <option value="DDR4">DDR4</option>
          <option value="DDR5">DDR5</option>
          <option value="LPDDR5">LPDDR5</option>
        </select>
        <label htmlFor="ram_min">Ram Capacity (GB)</label>
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
        <label htmlFor="storage_min">Storage Capacity (GB)</label>
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
        <label htmlFor="touch_screen">Touchscreen</label>
        <select
          name="touch_screen"
          onChange={handleChange}
          value={filters.touch_screen ? filters.touch_screen.toString() : "all"}
        >
          <option value="all">All</option>
          <option value="true">Touchscreen</option>
          <option value="false">Not Touchscreen</option>
        </select>
        <label htmlFor="screen_size_min">Screen Size</label>
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
        <label htmlFor="used">Condition</label>
        <select
          name="used"
          value={String(filters.used)}
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="false">New</option>
          <option value="true">Used / Refurbished</option>
        </select>
        <button className="btn btn-primary" onClick={handleFilter}>
          Search
        </button>
      </form>
    </>
  );
}

export { Filters, type FilterProps };
