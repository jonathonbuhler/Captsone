import { useEffect, useState } from "react";
import type { Laptop } from "../../helpers/Laptop";
import styles from "./Shop.module.css";
import Filters from "./Filters/Filters";
import { Link } from "react-router-dom";

function Shop() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/load-shop")
      .then((res) => res.json())
      .then((data) => {
        setLaptops(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-container">
      <h1>Shop</h1>
      <div className={styles.shop}>
        <Filters setLaptops={setLaptops} />
        <div className={styles.items}>
          {laptops.map((l, i) => {
            return (
              <Link to={`/laptop/${l.id}`} className={styles.laptop} key={i}>
                <img src={l.img_url} alt="" />
                <a href={`https://www.amazon.com/dp/${l.asin}`} target="_blank">
                  <p>
                    {l.title.slice(0, 75)}
                    {l.title.length > 75 ? "..." : ""}
                  </p>
                </a>
                <p>${l.price.toFixed(2)}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Shop;
