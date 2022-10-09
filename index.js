import download from "download";
import axios from "axios";
let url = "https://api-static.mihoyo.com/takumi/misc/api/emoticon_set?gids=2";

let imgArr = [];
let imgName = [];
axios.get(url).then((res) => {
  let data = res.data.data;

  data.list.forEach((item) => {
    imgArr.push(item.icon);
    imgName.push(item.name + "." + item.icon.split(".").pop());
    if (item.list) {
      item.list.forEach((item) => {
        // imgArr.push(item.icon);
        // console.log(item.icon, item.id, item.name);
        imgArr.push(item.icon);
        imgName.push(item.name + "." + item.icon.split(".").pop());
      });
    }
  });

  imgArr.shift();
  imgName.shift();

  // Download the file
  (async () => {
    console.log("下载开始")
    await Promise.all(
      imgArr.map((url, index) =>
        download(url, "./img", { filename: imgName[index] })
      )
    );
    console.log("下载完毕")
  })();
});
