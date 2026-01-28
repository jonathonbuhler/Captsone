import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { type Laptop, blank_laptop } from "../../helpers/Laptop";
import { getLaptops } from "../../helpers/db";

function Admin() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [formData, setFormData] = useState<Laptop>(blank_laptop);
  const [valid, setValid] = useState<string>("");

  useEffect(() => {
    getLaptops().then((l) => setLaptops(l));
  }, []);

  const handleEdit = () => {
    console.log(formData);
    fetch("http://localhost:8000/admin/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((err) => console.error(err));
  };

  const handleCheck = () => {
    fetch(`http://localhost:8000/admin/check/${formData.asin}`)
      .then((res) => res.json())
      .then((data) => setValid(data.message));
  };

  const handleSearch = () => {
    fetch(`http://localhost:8000/admin/${formData.asin}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData(data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const name = e.target.name;
    if (!name) {
      return;
    }
    if (name == "dedicated_gpu" || name == "touch_screen" || name == "used") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.value == "true" ? true : false,
      }));
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
          <button onClick={handleCheck}>Check</button>
          <p>In database: {valid}</p>
        </div>
        <hr />
        <div className={styles.features}>
          {Object.keys(formData).map((item, i) => {
            if (
              item == "dedicated_gpu" ||
              item == "touch_screen" ||
              item == "used"
            ) {
              return (
                <div key={i} className={styles.textInput}>
                  <label htmlFor={item}>{item}</label>
                  <select
                    name={item}
                    value={formData[item as keyof typeof formData] as string}
                    onChange={handleChange}
                  >
                    <option value={"true"}>true</option>
                    <option value={"false"}>false</option>
                  </select>
                </div>
              );
            } else {
              return (
                <div key={i} className={styles.textInput}>
                  <label htmlFor={item}>{item}</label>
                  <input
                    type="text"
                    placeholder={item}
                    name={item}
                    value={formData[item as keyof typeof formData] as string}
                    onChange={handleChange}
                  />
                </div>
              );
            }
          })}
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>amazon</th>
              {Object.keys(formData).map((d, j) => (
                <th key={j}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {laptops.map((l, i) => (
              <tr key={i}>
                <td>
                  <a href={`https://amazon.com/dp/${l.asin}`} target="_blank">
                    link
                  </a>
                </td>
                {Object.keys(l).map((d, j) => {
                  if (d == "title" || d == "img_url") {
                    return (
                      <td>{l[d as keyof typeof l].toString().slice(0, 20)}</td>
                    );
                  }
                  return <td>{String(l[d as keyof typeof l])}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
