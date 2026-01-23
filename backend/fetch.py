import time
import requests
from bs4 import BeautifulSoup
from typing import Optional
from pydantic import BaseModel


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


class Laptop(BaseModel):
    id: int
    asin: str
    title: Optional[str] = ""
    model_number: Optional[str] = ""
    model_name: Optional[str] = ""
    brand: Optional[str] = ""
    storage_capacity: Optional[int] = 0
    cpu: Optional[str] = ""
    cpu_cores: Optional[int] = 0
    cpu_clock: Optional[float] = 0.0
    ram_type: Optional[str] = ""
    ram_capacity: Optional[int] = 0
    touch_screen: Optional[bool] = False
    screen_size: Optional[float] = 0.0
    screen_width: Optional[int] = 0
    screen_height: Optional[int] = 0
    screen_refresh: Optional[int] = 0
    battery_capacity: Optional[int] = 0
    year: Optional[int] = 0
    dedicated_gpu: Optional[bool] = None
    gpu: Optional[str] = ""
    rating: Optional[float] = 0.0
    price: Optional[float] = 0.0
    used: Optional[bool] = False
    img_url: Optional[str] = ""

def fetch_laptop(asin):
    url = f"https://amazon.com/dp/{asin}"
    resp = requests.get(url, headers=HEADERS, timeout=15)
    if resp.status_code != 200:
        return Laptop(asin=asin)

    soup = BeautifulSoup(resp.text, "html.parser")

    
    title_tag = soup.select_one("#productTitle")
    price_tag = soup.select_one(".a-price .a-offscreen")
    rating_tag = soup.select_one("#averageCustomerReviews .a-icon-alt") \
             or soup.select_one(".averageStarRating .a-icon-alt")
    img_tag = soup.select_one("#landingImage")
    
    
    tech_details = {}

    # 1. Tech Spec Section
    for section_id in ["productDetails_techSpec_section_1", "productDetails_techSpec_section_2"]:
        rows = soup.select(f"#{section_id} tr")
        for row in rows:
            key = row.select_one("th")
            val = row.select_one("td")
            if isinstance(val,str):
                val = val.replace("\u200e", "")
            if key and val:
                tech_details[key.get_text(strip=True).lower()] = val.get_text(strip=True)

    # 2. Detail Bullets Section
    detail_rows = soup.select("#productDetails_detailBullets_sections1 tr")
    for row in detail_rows:
        
        key = row.select_one("th")
        val = row.select_one("td")

        print("Key Value", key, val)
        if isinstance(val,str):
            val = val.replace("\u200e", "")
        if key and val:
            tech_details[key.get_text(strip=True).lower()] = val.get_text(strip=True)

    # 3. Feature bullets fallback (some specs are here)
    bullets = soup.select("#feature-bullets ul li span")
    for b in bullets:
        text = b.get_text(strip=True)
        if ":" in text:  # naive key: value
            k, v = map(str.strip, text.split(":", 1))
            if isinstance(v,str):
                v = v.replace("\u200e", "")
            tech_details[k.lower()] = v


    print(tech_details)  # debug

    storage_capacity = 0
    if tech_details.get("hard drive"):
        storage_capacity = tech_details.get("hard drive").lower()
        storage_capacity = "".join(c for c in storage_capacity if c.isdigit() and c != "t" and c != "g" and c != "b")
        if "tb" in storage_capacity:
            storage_capacity = int(storage_capacity.replace("tb", "").strip())*1000
        elif "gb" in storage_capacity:
            storage_capacity = int(storage_capacity.replace("gb", "").strip())
    
    
    cpu_cores = 0
    if tech_details.get("number of processors"):        
        cpu_cores = tech_details.get("number of processors")
        cpu_cores = cpu_cores.replace("\u200e", "")

    rating = 0
    if rating_tag:
        rating = rating_tag.get_text(strip=True)
        rating = rating[0:3]
    
    screen_size = 0
    if tech_details.get("standing screen display size"):
        screen_size = tech_details.get("standing screen display size")
        screen_size = screen_size.replace("\u200e", "")
        screen_size = screen_size.replace("Inches", "")

    price = 0
    if price_tag:
        price = price_tag.get_text(strip=True) if price_tag else None
        price = price.replace("$", "")
        price = price.replace(",", "")

    ram_type = ""
    if tech_details.get("computer memory type"):
        ram_type = tech_details.get("computer memory type").replace("SDRAM","")
    

    ram_capacity = 0
    if tech_details.get("ram"):
        ram_capacity = tech_details.get("ram")
        ram_capacity = "".join(c for c in ram_capacity if c.isdigit())
        ram_capacity = ram_capacity[:len(ram_capacity)-1]
        if ram_capacity == "":
            ram_capacity = 0

    screen_width = 0
    if tech_details.get("screen resolution"):
        screen_width = tech_details.get("screen resolution")
        screen_width = screen_width.replace("\u200e","").replace("pixels","")
        screen_width = screen_width.split("x")[0]
    
    screen_height = 0
    if tech_details.get("screen resolution"):
        screen_height = tech_details.get("screen resolution")
        screen_height = screen_height.replace("\u200e","").replace("pixels","")
        if len(screen_height.split("x")) > 1:
            screen_height = screen_height.split("x")[1]

    dedicated_gpu = False
    if tech_details.get("card description"):
        dedicated_gpu = tech_details.get("card description")
        dedicated_gpu = dedicated_gpu.replace("\u200e","").strip()    
        dedicated_gpu = dedicated_gpu == "Dedicated"

    touch_screen = False
    used = False
    if title_tag:
        ttext = title_tag.get_text().lower()
        touch_screen = "touchscreen" in ttext or "touch" in ttext
        used = "renewed" in ttext or "refurbished" in ttext or "used" in ttext

    model_number = ""
    if tech_details.get("series"):
        model_number = tech_details.get("series")
    if not model_number and tech_details.get("item model number"):
        model_number = tech_details.get("item model number")
    
    img_url = ""
    if img_tag:
        if img_tag.get("data-old-hires"):
            img_url = img_tag.get("data-old-hires")
        elif img_tag.get("src"):
            img_url = img_tag.get("src")
        
    

    return Laptop(        
        id=0,
        asin=asin,
        title=title_tag.get_text(strip=True) if title_tag else "",
        model_name=tech_details.get("model name"),
        model_number=model_number,
        price=price,        
        storage_capacity=storage_capacity,
        cpu=tech_details.get("processor series"),
        cpu_cores=cpu_cores,
        ram_type=ram_type,
        ram_capacity=ram_capacity,
        brand=tech_details.get("brand"),
        year=tech_details.get("model year"),
        touch_screen=touch_screen,
        screen_size=screen_size,
        screen_width=screen_width,
        screen_height=screen_height,
        screen_refresh=tech_details.get("refresh rate"),
        battery_capacity=tech_details.get("lithium-battery energy content"),
        dedicated_gpu=dedicated_gpu,
        gpu=tech_details.get("graphics coprocessor"),
        rating=rating,
        used=used,
        img_url = img_url
    )


def fetch_image(asin):
    time.sleep(10)    
    url = f"https://amazon.com/dp/{asin}"
    resp = requests.get(url, headers=HEADERS, timeout=15)
    soup = BeautifulSoup(resp.text, "html.parser")

    img_tag = soup.select_one("#landingImage")
    img_url = img_tag.get("data-old-hires")
    return img_url
    

     




