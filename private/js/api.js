function mainCreate() {
	
	document.getElementsByClassName("container")[0].remove();
	var container = document.createElement("div");
	container.setAttribute("class","container");
	var all = document.getElementsByClassName("containAll")[0];
	all.appendChild(container);
	var QUERY = "&";
 	var ebay = document.getElementsByClassName("ios")[0].checked
 	var amazon = document.getElementsByClassName("ios")[1].checked
 	var aliexpress = document.getElementsByClassName("ios")[2].checked
 	
	var search = document.getElementsByClassName("input-search")[0].value;
	var URL = "https://seargentrest.herokuapp.com/app-api?search=" + search + "&ebay=" +  ebay + "&amazon=" + amazon + "&aliexpress=" + aliexpress ;
	
	var obj = function () {
    	var tmp = null;
    	$.ajax({
      	  'async': false,
       	 'type': "GET",
       	 'global': false,
       	 'dataType': 'json',
       	 'url': URL,
       	 'success': function (data) {
       	     tmp = data;
       	 }
    	});
   	 return tmp;
	}();
	
	var container, item;
	var all = obj['items'];
	var i = 0;

	all.forEach(function(entry) {
	
	container = document.getElementsByClassName("container")[0];
	
	if (i % 3 == 0) {
		if (i != 0) 
			container.appendChild(curRow);
		curRow = document.createElement("div");
		curRow.setAttribute("class", "row");
	}
	
	item = create(entry[2], entry[0], entry[3], entry[1]);
	curRow.appendChild(item);
	i++;
	
	});	
}


function create(imgURL, title, link, price, curRow) {
	
	var item = document.createElement("div");
	item.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");
	var thumbnail = document.createElement("div");
	thumbnail.setAttribute("class", "thumbnail");
	item.appendChild(thumbnail);
	var logo =  document.createElement("img");
	logo.setAttribute("src", whichSite(imgURL));
	logo.setAttribute("class", "compare");
	logo.setAttribute("style", 'style=float:left!important;"');
	thumbnail.appendChild(logo);
	var img = document.createElement("img");
	img.setAttribute("src", imgURL);
	thumbnail.appendChild(img);
	var caption = document.createElement("div");
	caption.setAttribute("class", "caption");
	thumbnail.appendChild(caption);
	var h = document.createElement("div");
	h.setAttribute("class", "details");
	caption.appendChild(h);
	var a = document.createElement("a");
	a.setAttribute("href", link);
	a.innerHTML = title;
	var prc = '$'.concat(price.toString());
	h.appendChild(a);
	var hSec = document.createElement("h4");
	hSec.setAttribute("class", "none");
	hSec.innerHTML = prc;
	h.appendChild(hSec);
	return item;
	
	
}

function whichSite(URL){

	if (URL.includes("ebay")) 
		return "https://goo.gl/8FbhHj";
	else if (URL.includes("amazon"))
		return "https://goo.gl/q5WGSN";
	else if (URL.includes("goo.gl"))
		return "https://goo.gl/iLmbnR";
	else
		return "https://goo.gl/PPntcX";

}

function createEbay(imgURL, title, link, price){
	var ti = document.getElementById("ebay-link");
	var a = document.createElement("a");
	a.setAttribute("href", link);
	a.innerHTML = title;
	ti.appendChild(a);

	var pr = document.getElementById("ebay-price");
	var hSec = document.createElement("h4");
		console.log(price);

	var prc = '$'.concat(price.toString());
	hSec.setAttribute("class", "none");
	hSec.innerHTML = prc;
	pr.appendChild(hSec);
}

function createAmazon(imgURL, title, link, price){
	var ti = document.getElementById("amazon-link");
	var a = document.createElement("a");
	a.setAttribute("href", link);
	a.innerHTML = title;
	ti.appendChild(a);

	var pr = document.getElementById("amazon-price");
	var hSec = document.createElement("h4");
	var prc = '$'.concat(price.toString());
	hSec.setAttribute("class", "none");
	hSec.innerHTML = prc;
	pr.appendChild(hSec);
}

function createAli(imgURL, title, link, price){
	var ti = document.getElementById("ali-link");
	var a = document.createElement("a");
	a.setAttribute("href", link);
	a.innerHTML = title.toString();
	ti.appendChild(a);

	var pr = document.getElementById("ali-price");
	var hSec = document.createElement("h4");
	var prc = '$'.concat(price.toString());
	hSec.setAttribute("class", "none");
	hSec.innerHTML = prc.toString();
	pr.appendChild(hSec);
}
