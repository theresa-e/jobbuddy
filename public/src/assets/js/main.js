$(document).ready(function () {
  $("#show-login").click(function () {
    console.log('you clicked le button')
    $("#regist-form").hide();
    $("#login-form").fadeIn("slow");
  });
  $("#show-regist").click(function () {
    $("#login-form").hide();
    $("#regist-form").fadeIn("slow");
  })
});
