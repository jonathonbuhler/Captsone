import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { type Laptop, blank_laptop } from "../../helpers/Laptop";

function Admin() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [formData, setFormData] = useState<Laptop>(blank_laptop);

  useEffect(() => {
    fetch("http://localhost:8000/load-all")
      .then((res) => res.json())
      .then((data) => setLaptops(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:8000/admin/${formData.asin}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData(data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (!name) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleAdd = () => {
    fetch("http://localhost:8000/admin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((err) => console.error(err));
  };

  const handleLoad = async () => {
    await fetch(`http://localhost:8000/load/${formData.asin}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
    console.log(formData);
  };

  return (
    <div className="main-container">
      <div className={styles["add-data"]}>
        <h1>Admin</h1>
        <div className={styles.search}>
          <input
            type="text"
            name="asin"
            id="asin"
            placeholder="ASIN"
            value={formData.asin}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleLoad}>Load</button>
          <button onClick={() => setFormData(blank_laptop)}>Reset</button>
        </div>
        <hr />
        <div className={styles.features}>
          {Object.keys(formData).map((item, i) => (
            <div key={i} className={styles.textInput}>
              <label htmlFor={item}>{item}</label>
              <input
                type="text"
                placeholder={item}
                name={item}
                value={formData[item as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button onClick={handleAdd}>Add</button>
        </div>
        <table>
          <thead>
            <tr>
              {Object.keys(formData).map((d, j) => (
                <th>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {laptops.map((l, i) => (
              <tr key={i}>
                {Object.keys(l).map((d, j) => (
                  <td>{l[d as keyof typeof l]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
