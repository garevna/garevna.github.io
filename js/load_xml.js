// JavaScript Document
function loadXMLDoc(URL_name, asyncr)
  {
    if (window.XMLHttpRequest)
    {// код для IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
     }
    else  
    {// код для IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        document.getElementById("xml_container").innerHTML = xmlhttp.responseText;
        $loaded = 'ready';
      }
      else
      {
          if (xmlhttp.status==404) { $loaded = '404'; }
          else { $loaded = xmlhttp.status; }
      }
    }
    xmlhttp.open("GET", URL_name, asyncr);
    xmlhttp.send();
  }