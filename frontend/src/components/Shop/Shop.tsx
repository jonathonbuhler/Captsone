import { useEffect, useState } from "react";
import type { Laptop } from "../../helpers/Laptop";
import styles from "./Shop.module.css";
import Filters from "./Filters/Filters";
import { Link } from "react-router-dom";
import windowWidth from "../../helpers/windowWidth";

function Shop() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [page, setPage] = useState(0);
  const width = windowWidth();
  const [wordLim, setWordLim] = useState(0);

  useEffect(() => {
    if (width > 1100) {
      setWordLim(80);
    } else if (width > 800) {
      setWordLim(80);
    } else if (width <= 800) {
      setWordLim(100);
    }
    console.log();
  }, [width]);

  return (
    <div className="main-container">
      <h1>Shop</h1>
      <div className={styles.shop}>
        <Filters setLaptops={setLaptops} />
        <div>
          {" "}
          <div className={styles.items}>
            {laptops.map((l, i) => {
              return (
                <Link to={`/laptop/${l.id}`} className={styles.laptop} key={i}>
                  <p>
                    {l.title.slice(0, wordLim)}
                    {l.title.length > wordLim ? "..." : ""}
                  </p>
                  <div className={styles.pic}>
                    <img src={l.img_url} alt="" />
                    <p>Price: ${l.price.toFixed(2)}</p>
                    <p>Fair Price: ${l.fair_price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.page}>
            <button>Previous Page</button>
            <button>Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
