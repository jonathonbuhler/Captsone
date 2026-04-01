import { filterFetch } from "../../../helpers/filter";
import type { Laptop } from "../../../helpers/Laptop";
import type { FilterProps } from "../Filters/Filters";
import styles from "./Other.module.css";
import { useState } from "react";

function Personalization({
  setLaptops,
  filters,
  page,
  setFilters,
  laptops,
}: FilterProps) {
  const [pref, setPref] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.checked && !pref.includes(name) && pref.length != 3) {
      setPref([...pref, name]);
    } else {
      setPref(pref.filter((n) => n !== name));
    }
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    const key = "preferences";
    pref.forEach((item) => params.append(key, item));

    fetch(`http://localhost:8000/update-fair?${params.toString()}`)
      .then((res) => res.json())
      .then(() => {
        filterFetch(filters, setLaptops, page);
      });
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          <i className="fa-solid fa-gear"></i>
        </button>
        <div className="dropdown-menu">
          <form
            className={styles.checkboxes}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <h2>Preferences</h2>
            <p>(Choose up to 3 you prefer)</p>
            <label htmlFor="storage">Storage</label>
            <input
              name="storage"
              type="checkbox"
              checked={pref.includes("storage")}
              onChange={handleChange}
            />
            <label htmlFor="ram">RAM</label>
            <input
              name="ram"
              type="checkbox"
              checked={pref.includes("ram")}
              onChange={handleChange}
            />
            <label htmlFor="display">Display</label>
            <input
              name="display"
              type="checkbox"
              checked={pref.includes("display")}
              onChange={handleChange}
            />
            <label htmlFor="battery">Battery</label>
            <input
              name="battery"
              type="checkbox"
              checked={pref.includes("battery")}
              onChange={handleChange}
            />
            <label htmlFor="gpu">GPU</label>
            <input
              name="gpu"
              type="checkbox"
              checked={pref.includes("gpu")}
              onChange={handleChange}
            />
            <label htmlFor="touch_screen">Touchscreen</label>
            <input
              name="touch_screen"
              type="checkbox"
              checked={pref.includes("touch_screen")}
              onChange={handleChange}
            />
            <label htmlFor="cpu">CPU</label>
            <input
              name="cpu"
              type="checkbox"
              checked={pref.includes("cpu")}
              onChange={handleChange}
            />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Personalization;
