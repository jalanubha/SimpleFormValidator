(function(){
var frm = document.getElementById("frmFeedback");
var submit = document.getElementById("btnSubmit");
var reset = document.getElementById("btnReset");

//Validation options
var options = [
	{
      msg: "Please Enter you name",
      errorCont: "errName"
    },
    {
      regex: validator.regex.email,
      msg: "Email is invalid",
      errorCont: "errEmail"
    },
    {
      regex: validator.regex.phone,
      msg: "The phone no. is not in correct format",
      errorCont: "errPhone"
    },
    {
      errorCont: "errPlace"
    },
    {
      errorCont: "errPlace"
    },
    {
      errorCont: "errPlace"
    },
    {
      errorCont: "errText"
    }
];

//Validate on keyup
for(var i = 0; i < options.length; i++) {	
	(function(){
		var elem = frm.elements[i];
		var option = options[i];
		if(!elem.addEventListener) {
      elem.attachEvent("onkeyup", function(){
        validator.validate(elem.id, option);
      }, false);
    } else {
      elem.addEventListener("keyup", function(){
        validator.validate(elem.id, option);
      });
    }
	})();
}

//Validate on blur
for(var i = 0; i < options.length; i++) { 
  (function(){
    var elem = frm.elements[i];
    var option = options[i];
    if(!elem.addEventListener) {
      elem.attachEvent("onblur", function(){
        validator.validate(elem.id, option);
      }, false);
    } else {
      elem.addEventListener("blur", function(){
        validator.validate(elem.id, option);
      });
    }
  })();
}

//Validate before submit
if(!submit.addEventListener) {
  submit.attachEvent("onclick", function(e){
    if(!e.preventDefault) {
      e.returnValue = false;
    } else {
      e.preventDefault();
    }
    if(validator.validateAll("frmFeedback", options) === true) {
      alert("Form submitted successfully !!");
      frm.submit();
    }
  });
} else {
  submit.addEventListener("click", function(e){
    if(!e.preventDefault) {
      e.returnValue = false;
    } else {
      e.preventDefault();
    }
    if(validator.validateAll("frmFeedback", options) === true) {
      alert("Form submitted successfully !!");
      frm.submit();
    }
  }, false);
}

//Validate on reset
if(!reset.addEventListener) {
  reset.attachEvent("onclick", function(e){
    validator.validateAll("frmFeedback", options);
  });
} else {
  reset.addEventListener("click", function(e){
    validator.validateAll("frmFeedback", options);
  }, false);
}

})();