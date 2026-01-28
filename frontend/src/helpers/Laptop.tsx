interface Laptop {
  id: number;
  asin: string;
  title: string;
  model_number: string;
  model_name: string;
  brand: string;
  storage_capacity: string;
  cpu: string;
  cpu_cores: string;
  cpu_clock: string;
  ram_type: string;
  ram_capacity: string;
  touch_screen: boolean;
  screen_size: string;
  screen_width: string;
  screen_height: string;
  screen_refresh: string;
  battery_capacity: string;
  year: string;
  dedicated_gpu: boolean;
  gpu: string;
  rating: string;
  price: number;
  used: boolean;
  img_url: string;
}

const blank_laptop: Laptop = {
  id: 0,
  asin: "",
  title: "",
  model_number: "",
  model_name: "",
  brand: "",
  storage_capacity: "",
  cpu: "",
  cpu_cores: "",
  cpu_clock: "",
  ram_type: "",
  ram_capacity: "",
  touch_screen: false,
  screen_size: "",
  screen_width: "",
  screen_height: "",
  screen_refresh: "",
  battery_capacity: "",
  year: "",
  dedicated_gpu: false,
  gpu: "",
  rating: "",
  price: 0,
  used: false,
  img_url: "",
};

export { type Laptop, blank_laptop };
