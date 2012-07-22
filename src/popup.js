// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var _proxy;

function showProxies() {
  var proxies = {
      inforgames:  { ip: "10.228.171.199", port: 3128 },
      castalia:    { ip: "10.228.144.163", port: 3128 },
      crevillente: { ip: "10.90.80.4", port: 3128 },
      pistacero:   { ip: "10.228.171.134", port: 3128 }
  }

  var table = document.createElement("table");
  table.setAttribute('style','width: 100%;');
  document.body.appendChild(table);
  var tr = document.createElement("tr");
  tr.setAttribute('style','text-align: left;');
  table.appendChild(tr);
  var th = document.createElement("th");
  th.innerHTML = "Name";
  tr.appendChild(th);
  th = document.createElement("th");
  th.innerHTML = "IP";
  tr.appendChild(th);
  th = document.createElement("th");
  th.innerHTML = "Port";
  tr.appendChild(th);
  th = document.createElement("th");
  tr.appendChild(th);
  for (var name in proxies) {
    tr = document.createElement("tr");
    table.appendChild(tr);
	var td = document.createElement("td");
	td.innerHTML = name;
	tr.appendChild(td);
    for ( var key in proxies[name] ) {
	    td = document.createElement("td");
	    td.innerHTML = proxies[name][key];
	    tr.appendChild(td);
    }
    var td = document.createElement("td");
    tr.appendChild(td);
    var button = document.createElement("button");
    td.appendChild(button);
    button.innerHTML = "Use";
    button.setAttribute("onclick","changeProxy(\""+proxies[name]['ip']+"\",\""+proxies[name]['port'] + "\");");
  }

  var button = document.createElement("button");
  button.innerHTML = "Use no proxies";
  document.body.appendChild(button);

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

document.addEventListener('DOMContentLoaded', showProxies);
