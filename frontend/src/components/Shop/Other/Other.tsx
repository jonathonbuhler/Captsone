import styles from "./Other.module.css";
import Price from "./Price";
import Personalization from "./Personalization";
import type { Laptop } from "../../../helpers/Laptop";
import type { FilterProps } from "../Filters/Filters";

function Other({
  setLaptops,
  filters,
  page,
  setFilters,
  laptops,
}: FilterProps) {
  return (
    <div className={styles.other}>
      <Price />
      <Personalization
        laptops={laptops}
        setLaptops={setLaptops}
        filters={filters}
        page={page}
        setFilters={setFilters}
      />
    </div>
  );
}

export default Other;
