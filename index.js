const Fingerprint2 = require("fingerprintjs2");
const express = require("express");
const app = express();
const port = process.env.PORT || 8060;
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const PUB_ID = 50037;
const CHANNEL_ID = 375;
const GUEST_ID = 291;
const THUMBNAIL_URL = "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/";

const WEBSITE_TITLE = "Project Forty-Six";
const WEBSITE_URL = "https://dev.projectfortysix.com";
const WEBSITE_DESC =
  "Project Forty-Six is a conservative news and information service that was created to combat censorship and circumvent the chokehold Big-Tech has on entry to the public square. Our goal is to provide insight into Oklahoma’s most pressing social and political issues.";
const WEBSITE_IMAGE =
  "https://dev.projectfortysix.com/static/media/logo.a4842a85.png";

const REQUEST_HEADER = {
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": true,
  crossorigin: true,
  uid: GUEST_ID,
  pubid: PUB_ID,
  country_code: "US",
  channelid: CHANNEL_ID,
  dev_id: "",
  ip: "",
  device_type: "web",
};

app.get("/", function (request, response) {
  //
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, WEBSITE_TITLE);
    data = data.replace(/\$OG_DESCRIPTION/g, WEBSITE_DESC);
    data = data.replace(/\$OG_IMAGE/g, WEBSITE_IMAGE);
    result = data.replace(/\$OG_URL/g, WEBSITE_URL + request.originalUrl);
    response.send(result);
  });
});

app.get("/home/movies", function (request, response) {
  var str = request.originalUrl;
  var str_array = str.split("?");
  var secVar = str_array[1].split("=");

  var showId = secVar[1];
  var guestId = 291;
  Fingerprint2.get(function (components) {
    var values = components.map(function (component) {
      return component.value;
    });
    var id_device = Fingerprint2.x64hash128(values.join(""), 31);
    console.log("id_device", id_device);
    axios
      .get("https://ipapi.co/json/")
      .then((deviceResponse) => {
        console.log(deviceResponse.data);
        if (deviceResponse.data) {
          let device_id = id_device;
          let ipaddress = deviceResponse.data.ip;
          const customConfig = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": true,
              crossorigin: true,
              uid: guestId,
              pubid: 50037,
              country_code: deviceResponse.data.country_code,
              channelid: 375,
              dev_id: device_id,
              ip: ipaddress,
              device_type: "web",
            },
          };

          const filePath = path.resolve(__dirname, "./build", "index.html");

          axios
            .get(
              "https://api.gizmott.com/api/v1/account/authenticate",
              customConfig
            )
            .then((response1) => {
              try {
                if (response1.data.token) {
                  let ipaddress = deviceResponse.data.ip;
                  let device_id = id_device;
                  const showConfig = {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "Access-Control-Allow-Origin": true,
                      crossorigin: true,
                      "access-token": response1.data.token,
                      uid: guestId,
                      pubid: 50037,
                      country_code: deviceResponse.data.country_code,
                      channelid: 375,
                      dev_id: device_id,
                      ip: ipaddress,
                      device_type: "web",
                    },
                  };
                  axios
                    .get(
                      "https://api.gizmott.com/api/v1/show/" + showId,
                      showConfig
                    )
                    .then((response2) => {
                      fs.readFile(filePath, "utf8", function (err, data) {
                        if (err) {
                          return console.log(err);
                        }
                        data = data.replace(/\$OG_TITLE/g, "Project Forty-Six");
                        if (response2.data) {
                          var videoDesc = "";
                          if (response2.data.data.synopsis) {
                            videoDesc = response2.data.data.synopsis;
                          }
                          var thumb = "";
                          try {
                            thumb = response2.data.data.logo;
                          } catch (error) {
                            thumb = response2.data.data.logo_thumb;
                          }

                          if (videoDesc == null) {
                            videoDesc = response2.data.data.show_name;
                          }
                          console.log("videoDesc", videoDesc);
                          console.log(
                            "thumb",
                            "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/" +
                            thumb
                          );
                          console.log(
                            "url",
                            "dev.projectfortysix.com/" + request.originalUrl
                          );
                          data = data.replace(/\$OG_DESCRIPTION/g, videoDesc);
                          data = data.replace(
                            /\$OG_IMAGE/g,
                            "https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/" +
                            thumb
                          );
                          result = data.replace(
                            /\$OG_URL/g,
                            "dev.projectfortysix.com" + request.originalUrl
                          );
                          response.send(result);
                        }
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      response.sendFile(filePath);
                    });
                }
              } catch (error) {
                console.log("tokeError", error);
                response.sendFile(filePath);
              }
            })
            .catch((error) => {
              console.log(error);
              response.sendFile(filePath);
            });
        }
      })
      .catch((error) => {
        console.log(error);

        response.sendFile(filePath);
      });
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));
app.get("*", function (request, response) {


  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, WEBSITE_TITLE);
    data = data.replace(/\$OG_DESCRIPTION/g, WEBSITE_DESC);
    data = data.replace(/\$OG_IMAGE/g, WEBSITE_IMAGE);
    result = data.replace(/\$OG_URL/g, WEBSITE_URL + request.originalUrl);
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
