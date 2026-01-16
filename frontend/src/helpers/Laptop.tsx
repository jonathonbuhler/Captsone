interface Laptop {
  asin: string;
  model_number: string;
  model_name: string;
  brand: string;
  storage_capacity: string;
  cpu: string;
  cpu_cores: string;
  cpu_clock: string;
  ram_type: string;
  ram_capacity: string;
  gpu_type: string;
  gpu: string;
  screen_size: string;
  screen_width: string;
  screen_height: string;
  screen_refresh: string;
  touch_screen: string;
  battery_capacity: string;
  price: string;
  rating: string;
  year: string;
}

const blank_laptop = {
  asin: "",
  model_number: "",
  model_name: "",
  brand: "",
  storage_capacity: "",
  cpu: "",
  cpu_cores: "",
  cpu_clock: "",
  ram_type: "",
  ram_capacity: "",
  gpu_type: "",
  gpu: "",
  screen_size: "",
  screen_width: "",
  screen_height: "",
  screen_refresh: "",
  touch_screen: "",
  battery_capacity: "",
  price: "",
  rating: "",
  year: "",
};

export { type Laptop, blank_laptop };
