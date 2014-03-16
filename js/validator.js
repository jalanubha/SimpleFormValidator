/*
* Simple Javascript Form Validator by jalanubha
* Date: 16-3-2014
*/
var validator = {};
(function(){
validator = {
  version: "1.0 beta",
  error: "",
  valid: false,
  
  validate: function(element, options){
    console.log(options);
    if(element === undefined || options === undefined) {
      throw (validator.error = "Supplied arguments are incorrect");
    }
    if( element.constructor !== String) {
      throw (validator.error = "argument supplied is not a string");
    }
    if( options.constructor !== Object) {
      throw (validator.error = "argument supplied is not an Object");
    }
    
    var ele = document.getElementById(element);
    var regex = options.regex || validator.options.regex;
    var msg = options.msg || validator.options.msg;
    var errorCont;
    var contParent;
    
    if(options.errorCont !== undefined) {
      errorCont = document.getElementById(options.errorCont);
    }
    if(options.contParent !== undefined) {
      contParent = document.getElementById(options.contparent);
    }
    
    if(ele.value === "") {
      if(options.errorCont !== undefined) {
        errorCont.innerHTML = validator.options.msg;
        errorCont.className = errorCont.className.replace(/validator_valid/g, "");
      }
      return false;
    } else if(regex.test(ele.value)) {
      if(options.errorCont !== undefined) {
        errorCont.innerHTML = "";
      }
      if(/validator_valid/g.test(errorCont.className) === false) {
        if(errorCont.className === "") {
          errorCont.className += (options.validClass || validator.options.validClass);
        }
        else {
          errorCont.className += " " + (options.validClass || validator.options.validClass);
        }
      }
      return true;
    } else {
      if(options.errorCont !== undefined && options.contParent !== undefined) {
        contParent.appendChild(errorCont);
        errorCont.innerHTML = msg;
        errorCont.className = errorCont.className.replace(/validator_valid/g, "");
      } else if(options.errorCont !== undefined) {
        errorCont.innerHTML = msg;
        errorCont.className = errorCont.className.replace(/validator_valid/g, "");
      }
      return false;
    }
  },

  validateAll: function(form, options){
    validator.error = "";
    if( form.constructor !== String) {
      throw (validator.error = "argument supplied is not a string");
    }
    form = document.getElementById(form);
    if(form.elements === undefined && form.action === undefined) {
      throw (validator.error = "The first argument is not a form element");
    }
    if(options.constructor !== Array) {
      throw (validator.error = "The second argument should be an Array");
    }
    
    var boolTemp = true;
    for (var i = 0; i < options.length; i++) {
      console.log(form.elements[i].id);
      if (validator.validate(form.elements[i].id, options[i]) === true) {
        continue;
      }
      else {
        boolTemp = false;
      }
    }
    return (validator.valid = (boolTemp === true));
  }
};

validator.options = {
  regex: /.+/,
  msg: "This field is required",
  errorCont: null,
  contParent: null,
  validClass: "validator_valid"
};

validator.regex = {
  email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone:/^[+]?(\d{1,4}([-]|\s)){0,2}(\d{8,10})$/
};
})();