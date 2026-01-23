import { useEffect, useState } from "react";
import type { Laptop } from "../../helpers/Laptop";
import styles from "./Shop.module.css";

function Shop() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
    brand: "",
    price_min: 0,
    price_max: 1000000,
    ram_type: "",
    ram_min: 0,
    ram_max: 10000,
    storage_min: 0,
    touch_screen: false,
    screen_size_min: 0,
    screen_size_max: 1000,
  });

  useEffect(() => {
    fetch("http://localhost:8000/load-shop")
      .then((res) => res.json())
      .then((data) => {
        setLaptops(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <h1>Shop</h1>
      <div className={styles.items}>
        {laptops.map((l, i) => {
          return (
            <div className={styles.laptop} key={i}>
              <img src={l.img_url} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Shop;
