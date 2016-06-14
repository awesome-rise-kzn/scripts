

// When the window has finished loading create our google map below
//google.maps.event.addDomListener(window, 'load', init);

var marker;
function initMap() {
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var map = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 11,
            center: { lat: 0, lng: 0 }, 
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            styles: [
                {
                    "featureType":"water",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#00559B"},
                        {"saturation":100},
                        {"lightness":-60},
                        {"visibility":"simplified"}
                    ]
                },
                {
                    "featureType":"landscape",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#ffffff"},
                        {"saturation":-100},
                        {"lightness":100},
                        {"visibility":"simplified"}
                    ]
                },
                {
                    "featureType":"landscape.man_made",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#ffffff"},
                        {"saturation":-100},
                        {"lightness":100},
                        {"visibility":"on"}
                    ]
                },
                {
                    "featureType":"landscape.natural",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#ffffff"},
                        {"saturation":-100},
                        {"lightness":100},
                        {"visibility":"on"}
                    ]
                },
                {
                    "featureType":"poi.park",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#ffffff"},
                        {"saturation":-100},
                        {"lightness":100},
                        {"visibility":"off"}
                    ]
                },
                {
                    "featureType":"road",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#00559B"},
                        {"saturation":100},
                        {"lightness":-53},
                        {"visibility":"simplified"}
                    ]
                },
                {
                    "featureType":"water",
                    "elementType":"all",
                    "stylers":[]
                },
                {
                    "featureType":"administrative.locality",
                    "elementType":"geometry",
                    "stylers":[
                        {"hue":"#ffffff"},
                        {"saturation":0},
                        {"lightness":100},
                        {"visibility":"on"}
                    ]
                },
                {
                    "featureType":"water",
                    "elementType":"all",
                    "stylers":[]
                },
                {
                    "featureType":"poi.school",
                    "elementType":"labels",
                    "stylers":[
                        {"hue":"#999999"},
                        {"saturation":-100},
                        {"lightness":-28},
                        {"visibility":"on"}
                    ]
                },
                {
                    "featureType":"poi",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#999999"},
                        {"saturation":-100},
                        {"lightness":-23},
                        {"visibility":"on"}
                    ]
                },
                {
                    "featureType":"administrative",
                    "elementType":"all",
                    "stylers":[
                        {"hue":"#2C3E50"},
                        {"saturation":29},
                        {"lightness":-52},
                        {"visibility":"on"}
                    ]
                }
            ]
        }
    );
    var geocoder = new google.maps.Geocoder();

    $(document).ready(function(){
        marker  = new google.maps.Marker({
            position: { lat: 0, lng: 0 }
        });
        getPointAddress(geocoder, map);
    });

    var rtime;
    var timeout = false;
    var delta = 200;

    $(document).ready(function(){
        $(window).resize(function(){
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });
    });

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            console.log('Done resizing');
            map_resizer(geocoder,map);
        }               
    }
}

function map_recenter(map, latlng, offsetx, offsety) {
    var point1 = map.getProjection().fromLatLngToPoint(
        (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
    );
    var point2 = new google.maps.Point(
        ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom()) ) || 0,
        ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom()) ) || 0
    );  
    map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
        point1.x - point2.x,
        point1.y + point2.y
    )));
}
var marker = new google.maps.Marker({
    position: { lat: 0, lng: 0 }
});
var image_marker_big = "";

function geocodeAddress(geocoder, resultsMap, marker_big, address) {
    image_marker_big = marker_big;
    resize_map(geocoder, resultsMap, address, marker_big);
}

function set_marker(map, position, custom_marker_image) {
    marker.setMap(null);
    if (custom_marker_image != false) {
        marker = new google.maps.Marker({
            position: position,
            icon: image_marker_big,
            animation: google.maps.Animation.DROP
        });
    }
    else{
        marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP
        });
    }
    marker.setMap(map);
}

function resize_map(geocoder, resultsMap, address, offsetx=180 ,offsety=-90) {
    var x = offsetx ,y = offsety;
    var custom_marker = true;
    if($("body").width() < 999 && $("body").width() >= 930){
        x = 140;
    }
    if($("body").width() < 930 && $("body").width() >= 820){
        x = 105;
    }
    if($("body").width() < 820 && $("body").width() >= 768){
        x = 70;
    }
    if($("body").width() < 768 && $("body").width() >= 0){
        x = 0;
        custom_marker = false;
    }

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            set_marker(resultsMap,results[0].geometry.location,custom_marker);
            map_recenter(resultsMap, results[0].geometry.location, x, y);
        } else {
          console.log('Ошибка геопозиции при смещении: ' + status);
        }
    });
};
