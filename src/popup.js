// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=20",
    true);
req.onload = showProxies;
req.send(null);

var _proxy;

function showProxies() {
  var proxies = new Array();

  proxies[0] = ["10.228.171.199",3128,"inforgames","En construcci&oacute;n", 4000000, 256000, "unknown", "unknown"];
  proxies[1] = ["10.228.144.163",3128,"castalia","Operativo", 4000000, 256000, "unknown", "unknown"];
  proxies[2] = ["10.90.80.4",3128,"crevillente","Operativo", 8000000, 1000000, "unknown", "unknown"];
  proxies[3] = ["10.228.171.134",3128,"pistacero","En pruebas", 10000000, 1000000, "unknown", "unknown"];

  var table = document.createElement("table");
  document.body.appendChild(table);
  var tr = document.createElement("tr");
  table.appendChild(tr);
  var th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "IP";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Port";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Name";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "State";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Download";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Upload";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Load Average";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Current Load";
  th = document.createElement("th");
  tr.appendChild(th);
  th.innerHTML = "Use";
  for (var i = 0, proxy; proxy = proxies[i]; i++) {
    tr = document.createElement("tr");
    table.appendChild(tr);
    for ( var j = 0; j < 8; j++ ) {
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = proxy[j];
    }
    var td = document.createElement("td");
    tr.appendChild(td);
    var button = document.createElement("button");
    td.appendChild(button);
    button.innerHTML = "Use";
    button.setAttribute("onclick","changeProxy(\""+proxy[0]+"\",\""+proxy[1]+"\");");
  }
  if (chrome.experimental !== undefined && chrome.experimental.proxy !== undefined)
    _proxy = chrome.experimental.proxy;
  else if (chrome.proxy !== undefined)
    _proxy = chrome.proxy;
  else
    alert('Need proxy api support, please update your Chrome');
  _proxy.settings.get(
    {'incognito': false},
    function(config) {console.log(JSON.stringify(config));});
}

function changeProxy(ip, port) {
  var config = {
    mode: "fixed_servers",
    rules: {
      proxyForHttp: {
        scheme: "http",
        host: ip,
        port: port
      },
      bypassList: ["guifi.net"]
    }
  };
  _proxy.settings.set(
    {value: config, scope: 'regular'},
    function() {});
  window.alert("Proxy cambiado a "+ip+":"+port);
}

//showProxies();

/*function showPhotos() {
  var photos = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
  }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
*/
