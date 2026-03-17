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
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    if (laptops.length < 33) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
    console.log(laptops.length);
  }, [laptops]);

  useEffect(() => {
    if (width > 1100) {
      setWordLim(80);
    } else {
      setWordLim(100);
    }
    console.log();
  }, [width]);

  return (
    <div className="main-container">
      <h1>Shop</h1>
      <div className={styles.shop}>
        <Filters setLaptops={setLaptops} page={page} />
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
                    <p
                      className={
                        l.price < l.fair_price ? styles.good : styles.bad
                      }
                    >
                      Fair Price: ${l.fair_price}
                    </p>
                    <p
                      className={
                        l.price < l.fair_price ? styles.good : styles.bad
                      }
                    >
                      Percent Diff: {l.price < l.fair_price ? "" : "+"}
                      {(
                        ((l.price - l.fair_price) / l.fair_price) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.page}>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page == 0}
            >
              <i
                className="fa-solid fa-arrow-down"
                style={{ transform: "rotate(90deg)" }}
              ></i>
            </button>
            <button
              disabled={lastPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <i
                className="fa-solid fa-arrow-down"
                style={{ transform: "rotate(-90deg)" }}
              ></i>
            </button>
            <p>Page: {page + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
