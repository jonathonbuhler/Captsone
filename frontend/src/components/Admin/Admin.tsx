import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { type Laptop, blank_laptop } from "../../helpers/Laptop";
import { getLaptops } from "../../helpers/db";
import { Link } from "react-router-dom";

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

  const handleLoad = async (asin: string = formData.asin) => {
    await fetch(`http://localhost:8000/load/${asin}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
    console.log(formData);
  };

  const handleUpdateML = async () => {
    await fetch(`http://localhost:8000/admin/update-fair`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
          <button onClick={() => handleLoad(formData.asin)}>Load</button>
          <button onClick={() => setFormData(blank_laptop)}>Reset</button>
          <button onClick={handleCheck}>Check</button>
          <button onClick={handleUpdateML}>Update ML</button>
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
              <th>id</th>
              <th>amazon</th>
              <th>asin</th>
              <th>title</th>
              <th>price</th>
              <th>fair-price</th>
            </tr>
          </thead>
          <tbody>
            {laptops.map((l, i) => (
              <tr key={i}>
                <td>{l.id}</td>
                <td>
                  <a href={`https://amazon.com/dp/${l.asin}`} target="_blank">
                    link
                  </a>
                </td>
                <td
                  onClick={() => {
                    handleLoad(l.asin);
                  }}
                >
                  {l.asin}
                </td>
                <td>
                  <Link
                    to={`/laptop/${l.id}`}
                    className={styles.laptop}
                    key={i}
                  >
                    {l.title.slice(0, 20)}
                  </Link>
                </td>
                <td>${l.price.toFixed(2)}</td>
                <td>${l.fair_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
