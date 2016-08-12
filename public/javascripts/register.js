'use strict';

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function validateRegister() {
  var name = $('input#name').val() || '';
  var email = $('input#email').val() || '';
  var password = $('input#password').val() || '';
  var confirmation = $('input#confirmation').val() || '';
  var validForm = true;

  validForm = validForm && (name.length > 0);
  if (!validForm) {
    $('.error').html('The name can not be empty').show();
    return validForm;
  }

  validForm = validForm && (email.length > 0) && isEmail(email);
  if (!validForm) {
    $('.error').html('The email is not valid').show();

    return validForm
  }

  validForm = validForm && (password.length > 0) && (password === confirmation);
  if (!validForm) {
    $('.error').html('The password empty or wrong confirmation. Please repeat again').show();
  }

  return validForm;
}

$('.error').hide();
$(document).on('submit', 'form.register', validateRegister);
