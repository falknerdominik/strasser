var form;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var nameRegex = /^[a-za-z\s]{6,20}$/;
var txtRegex = /^[a-za-z\s]{30,600}$/;

window.onload = function () {
  // attach eventHandler to form
  form = document.getElementById('form-contact');
  if (form.attachEvent) {
      form.attachEvent("submit", processForm);
  } else {
      form.addEventListener("submit", processForm);
  }

  // disable submit button
  form["submit"].disabled = true;

  // validation onkeyup
  form["email"].onkeyup = function () {
    var isValid = validateInput(this, "error", emailRegex);
    isValid ? form["submit"].disabled = false : form["submit"].disabled = true;
  }

  form["name"].onkeyup = function () {
    var isValid = validateInput(this, "error", nameRegex);
    isValid ? form["submit"].disabled = false : form["submit"].disabled = true;
  }

  form["text"].onkeyup = function () {
    var isValid = validateInput(this, "error", txtRegex);
    isValid ? form["submit"].disabled = false : form["submit"].disabled = true;
  }
}

function processForm(e) {
  if (e.preventDefault) e.preventDefault();

  // You must return false to prevent the default form behavior
  return false;
}

// validate the input with a given regex
function validateInput(elem, errorClass, regex) {
    if(regex.test(elem.value)) {
      if(hasClass(elem, errorClass)) {
        elem.className = "";
      }
    } else {
      if(!hasClass(elem, errorClass)) {
        elem.className = errorClass;
      }
      return false;
    }
    return true;
}

// check if a given element has a class
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
