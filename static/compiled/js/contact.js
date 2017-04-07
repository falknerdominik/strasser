var form;


window.onload = function () {
  // attach eventHandler to form
  form = document.getElementById('form-contact');
  if (form.attachEvent) {
      form.attachEvent("submit", processForm);
  } else {
      form.addEventListener("submit", processForm);
  }

}

function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  // regex for validation
  var nameRegex = /^[A-Za-z\s]{6,20}$/;
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var txtRegex = /^[A-Za-z\s\?!.,]{30,600}$/;

  isValid = validateInput(form["name"], "error", nameRegex);
  isValid = isValid && validateInput(form["email"], "error", emailRegex);
  isValid = isValid && validateInput(form["text"], "error", txtRegex);

 if(isValid) {
    // send request to api
    var request = JSON.stringify({
      name: form["name"].value.trim(),
      email: form["email"].value.trim(),
      text: form["text"].value.trim()
    });

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/mail");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(request);
 }

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
