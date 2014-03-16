(function(){
	var states = {
		'India': ['Maharashtra','Rajasthan'],
		'Australia': ['New South Wales', 'Victoria']
	};

	var cities = {
		'Maharashtra': ['Mumbai', 'Pune'],
		'Rajasthan': ['Jaipur', 'Udaipur'],
		'New South Wales': ['Sydney', 'Albury', 'Armidale', 'Dubbo'],
		'Victoria': ['Melbourne', 'Ararat', 'Portland']
	};

	var slCntry = document.getElementById("country");
	var slState = document.getElementById("state");
	var slCity = document.getElementById("city");

	if(!slCntry.addEventListener) {
		slCntry.attachEvent("onchange", function(){
			empty(slState, 'State');
			fill(slState, states[slCntry.value]);
			empty(slCity, 'City');
		}, false);
	} else {
		slCntry.addEventListener("change", function(){
			empty(slState, 'State');
			fill(slState, states[slCntry.value]);
			empty(slCity, 'City');
		}, false);
	}

	if(!slState.addEventListener) {
		slState.attachEvent("onchange", function(){
			empty(slCity, 'City');
			fill(slCity, cities[slState.value]);
		}, false);
	} else {
		slState.addEventListener("change", function(){
			empty(slCity, 'City');
			fill(slCity, cities[slState.value]);
		}, false);
	}

	var fill = function(elem, data){
		if (elem.options === undefined) {
			throw "supplied argument is not a form select element";
		}
		if (data.constructor !== Array) {
			throw "supplied argument is not an Array";
		}
		for(var i = 1; i <= data.length; i++) {
			elem.options[i] = document.createElement("option");
			elem.options[i].value = data[i - 1];
			elem.options[i].innerHTML = data[i - 1];
		}
	};

	var empty = function(elem, data){
		if (elem.options === undefined) {
			throw "supplied argument is not a form select element";
		}
		if (data.constructor !== String) {
			throw "second argument should be a String"
		}
		elem.innerHTML = "";
		elem.options[0] = document.createElement("option");
		elem.options[0].disabled = "disabled";
		elem.options[0].value = "";
		elem.options[0].innerHTML = data;
	};
})();