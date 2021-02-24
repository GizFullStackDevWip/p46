function createSSAI(url,videoElem,adParams) {




    sessionCreation(url);
    
    var arr = url.split("/");
    var result = arr[0] + "//" + arr[2]
    var domainOfUrl=result;
    


    var previousTime = 0;
    var beaconTime = [];
    var trackingUrl = domainOfUrl;
    var beaconData = []
    var whereYouAt = 0;
    setInterval(eachSecond, 1000);




    function isInArray(value, array) {
        return array.indexOf(value);
    }


    function eachSecond() {


        whereYouAt = whereYouAt + 1;
        whereYouAt = Math.round(whereYouAt)



        if (whereYouAt != previousTime) {
            previousTime = whereYouAt;

            if (beaconTime.length > 0) {

                if (isInArray(whereYouAt, beaconTime) > -1) {

                    var temp = beaconData[isInArray(whereYouAt, beaconTime)].beaconUrls;
                    for (var i = 0; i < temp.length; i++) {
                        
                        callAdTrackingUrl(temp[i])
                    }



                }



            }

        }
    }


    function callAPI(url) {

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {


                var trackingData = JSON.parse(request.responseText);

                // console.log('trackingData', trackingData)

                var avails = trackingData.avails;



                for (k = 0; k < avails.length; k++) {


                    var avail = avails[k];

                    var ads = avail.ads;


                    for (j = 0; j < ads.length; j++) {

                        var trackingEvents = ads[j].trackingEvents;

                        for (k = 0; k < trackingEvents.length; k++) {

                            var trackingEvent = trackingEvents[k]



                            if (trackingEvent && trackingEvent.eventType) {
                                var eventType = trackingEvent.eventType;
                                if (eventType == "start" || eventType == "firstQuartile" || eventType == "firstQuartile" || eventType == "midpoint" || eventType == "impression") {
                                    beaconTime.push(Math.round(trackingEvent.startTimeInSeconds))
                                    beaconData.push(trackingEvent)


                                }
                            }

                        }



                    }




                }


            } else if (request.status == 502) {

                beaconTime = [];

            }

        }
        request.open("GET", url);
        request.send(null);
    }

    function sessionCreation(theUrl) {

        var data = JSON.stringify(adParams);

        // console.log('adParamsStringyfied', data)

        var xhr = new XMLHttpRequest();


        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                var jsonResult = JSON.parse(this.responseText)
               

                const player = videojs(videoElem);


                if (jsonResult) {
                    player.src({
                        src: domainOfUrl+ jsonResult.manifestUrl,
                        type: 'application/x-mpegURL'
                    });
                    trackingUrl = trackingUrl + jsonResult.trackingUrl;
                    setInterval(refresh, 10000);
                }




            }
        });

        xhr.open("POST", theUrl);
        xhr.setRequestHeader("content-type", "application/json");


        xhr.send(data);


    }

    function refresh() {
        callAPI(trackingUrl);

    }



    function callAdTrackingUrl(theUrl) {

        // console.log('inCallAdTrackingUrl', theUrl);

        var i = document.createElement("img");
        i.src = theUrl;



    }




}