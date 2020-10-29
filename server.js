const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const path = require('path');
const fs = require('fs')
const axios = require('axios');


app.get('/', function (request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'HappiTV');
    data = data.replace(/\$OG_DESCRIPTION/g, "A Digital Platform For All LGBTQ+ Audiences Courting Millennials, Gen Xers and Centennials alike, HappiTV brings the whole community together with empowering voices that bring the best offering in Queer fiction worldwide, Reality TV that matters and a safe haven for the ideas that are changing the world. Whether you come for a laugh, a cathartic cry, information or simple escapism, Happi offers the special content that matters to one of the most coveted demographics in the nation and abroad: The discerning, educated and ready to influence LGBTQ+ audience.");
    data = data.replace(/\$OG_IMAGE/g, 'https://gethappi.tv/static/media/logo.05d4e14f.png');
    result = data.replace(/\$OG_URL/g, 'https://gethappi.tv' + request.originalUrl);
    response.send(result);
  });
});

app.get('/home/movies', function (request, response) {
  // var url_string = "https://gethappi.tv" + request.originalUrl;
  // var url = new URL(url_string);
  // var showId = url.searchParams.get("show_id");
  var str = request.originalUrl;
  var str_array = str.split('?');
  var secVar = str_array[1].split('=');

  var showId = secVar[1];
  var guestId = 74961;

  const customConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': true,
      crossorigin: true,
    },
    params: {
      uid: guestId,
      country_code: 'US'
    }
  };

  const filePath = path.resolve(__dirname, './build', 'index.html')

  axios.get('https://poppo.tv/platform/bk/authenticate', customConfig)
    .then(response1 => {
      try {
        if (response1.data.token) {
          const showConfig = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Access-Control-Allow-Origin': true,
              crossorigin: true,
              'access-token': response1.data.token,
            },
            params: {
              pubid: 50023,
              show_id: showId,
              user_id: guestId,
              country_code: 'US'
            }
          };
          axios.get('https://poppo.tv/platform/bk/api/getShowsDetails', showConfig)
            .then(response2 => {
              console.log('response2', response2.data.data[0])
              console.log('video_description', response2.data.data[0].video_description)
              fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                  return console.log(err);
                }
                data = data.replace(/\$OG_TITLE/g, 'HappiTV');
                var videoDesc = response2.data.data[0].video_description;
                var thumb = '';
                try {
                  thumb = response2.data.data[0].logo;
                } catch (error) {
                  thumb = response2.data.data[0].thumbnail;
                }
                console.log('showDetailsThumb', 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/' + thumb)

                if (videoDesc == null) {
                  videoDesc = response2.data.data[0].video_title;
                }
                data = data.replace(/\$OG_DESCRIPTION/g, videoDesc);
                data = data.replace(/\$OG_IMAGE/g, 'https://gizmeon.s.llnwi.net/vod/thumbnails/show_logo/' + thumb);
                result = data.replace(/\$OG_URL/g, 'https://gethappi.tv' + request.originalUrl);
                response.send(result);
              });
            })
            .catch(error => {
              console.log(error);
              response.sendFile(filePath);
            });

        }
      } catch (error) {
        console.log('tokeError', error)
        response.sendFile(filePath);
      }
    })
    .catch(error => {
      console.log(error);
      response.sendFile(filePath);
    });

  console.log('ShowMoviesShowId', showId);

});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'HappiTV');
    data = data.replace(/\$OG_DESCRIPTION/g, "A Digital Platform For All LGBTQ+ Audiences Courting Millennials, Gen Xers and Centennials alike, HappiTV brings the whole community together with empowering voices that bring the best offering in Queer fiction worldwide, Reality TV that matters and a safe haven for the ideas that are changing the world. Whether you come for a laugh, a cathartic cry, information or simple escapism, Happi offers the special content that matters to one of the most coveted demographics in the nation and abroad: The discerning, educated and ready to influence LGBTQ+ audience.");
    data = data.replace(/\$OG_IMAGE/g, 'https://gethappi.tv/static/media/logo.05d4e14f.png');
    result = data.replace(/\$OG_URL/g, 'https://gethappi.tv' + request.originalUrl);
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
