interface Filter {
  title: string | undefined;
  brand: string | undefined;
  price_min: number | undefined;
  price_max: number | undefined;
  ram_type: string | undefined;
  ram_min: number | undefined;
  ram_max: number | undefined;
  storage_min: number | undefined;
  storage_max: number | undefined;
  touch_screen: boolean | undefined;
  screen_size_min: number | undefined;
  screen_size_max: number | undefined;
  used: boolean | undefined;
  offset: number | undefined;
  sort_by: string | undefined;
  preferences: string[] | undefined;
}

const blank_filter: Filter = {
  title: undefined,
  brand: undefined,
  price_min: undefined,
  price_max: undefined,
  ram_type: undefined,
  ram_min: undefined,
  ram_max: undefined,
  storage_min: undefined,
  storage_max: undefined,
  touch_screen: undefined,
  screen_size_min: undefined,
  screen_size_max: undefined,
  used: false,
  offset: undefined,
  sort_by: "percent_diff",
  preferences: undefined,
};

const filterFetch = (
  filters: Filter,
  setLaptops: React.Dispatch<React.SetStateAction<any>>,
  page: number,
) => {
  const params = new URLSearchParams();

  Object.entries({ ...filters, offset: page * 33 }).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else {
        params.append(key, String(value));
      }
    }
  });
  fetch(`http://localhost:8000/load-shop?${params.toString()}`).then((res) =>
    res.json().then((data) => setLaptops(data)),
  );
};

export { blank_filter, type Filter, filterFetch };
