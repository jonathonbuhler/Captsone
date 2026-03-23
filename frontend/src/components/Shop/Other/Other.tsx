import styles from "./Other.module.css";

function Other() {
  return (
    <div className={styles.other}>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Price Your Laptop
        </button>
        <div className="dropdown-menu">
          <form className={styles.form}>
            <label htmlFor="year">Year</label>
            <input type="number" name="year" placeholder="Year" />
            <label htmlFor="storage_capacity">Storage Capacity</label>
            <input
              type="number"
              name="storage_capacity"
              placeholder="Storage Capactiy"
            />
            <label htmlFor="ram_capacity">Ram Capacity (GB)</label>
            <input name="ram_capacity" type="text" placeholder="Ram Capacity" />
            <label htmlFor="ram_type">Ram Type</label>
            <select name="ram_type">
              <option value="DDR3">DDR3</option>
              <option value="DDR4">DDR4</option>
              <option value="DDR5">DDR5</option>
            </select>
            <label htmlFor="dedicated_gpu">Dedicated GPU</label>
            <select name="dedicated_gpu">
              <option value="true">No</option>
              <option value="false">Yes</option>
            </select>
            <label htmlFor="cpu_cores">CPU Core Count</label>
            <input
              type="number"
              name="cpu_cores"
              placeholder="CPU Core Count"
            />
            <label htmlFor="cpu_clock">CPU Clock Speed (GHz)</label>
            <input
              name="cpu_clock"
              type="number"
              placeholder="CPU Clock Speed"
            />
            <label htmlFor="touchscreen">Touchscreen</label>
            <select name="touchscreen">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <label htmlFor="screen_size">Screen Size (inches)</label>
            <input
              type="number"
              placeholder="Screen Size (inches)"
              name="screen_size"
            />
            <label htmlFor="screen_width">Screen Resolution (pixels)</label>
            <input
              type="number"
              placeholder="Screen Width"
              name="screen_width"
            />
            <input
              type="number"
              placeholder="Screen Height"
              name="screen_width"
            />
            <label htmlFor="screen_refresh">Screen Refresh Rate (Hz)</label>
            <input type="number" placeholder="Screen Refresh Rate" />
            <label htmlFor="battery_capacity">Battery Capacity (Wh)</label>
            <input type="number" placeholder="Battery Capacity" />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Other;
