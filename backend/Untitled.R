d = read.csv("/Users/jonathonbuhler/Desktop/l.csv")

d$model_number = NULL
d$img_url = NULL
d$cpu = NULL
d$gpu = NULL
d$model_name = NULL
d$brand = NULL
d$asin = NULL
d$title = NULL
d["pixel_count"] = d$screen_height*d$screen_width
d$screen_height = NULL
d$screen_width = NULL

d$touch_screen[d$touch_screen == "f"] = 0
d$touch_screen[d$touch_screen == "t"] = 1
d$dedicated_gpu[d$dedicated_gpu == "f"] = 0
d$dedicated_gpu[d$dedicated_gpu == "t"] = 1
d$used[d$used == "f"] = 0
d$used[d$used == "t"] = 1

head(d)


write.csv(d, file="/Users/jonathonbuhler/Desktop/ml.csv", row.names=FALSE)
