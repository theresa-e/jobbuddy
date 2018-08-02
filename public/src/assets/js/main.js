$(document).ready(function () {

  // show/hide login and register form in landing component
  $("#show-login").click(function () {
    $("#regist-form").hide();
    $("#login-form").fadeIn("slow");
  });
  $("#show-regist").click(function () {
    $("#login-form").hide();
    $("#regist-form").fadeIn("slow");
  })

  // show/hide modal in jobs component
  $("#show-create-job").click(function () {
    $(".modal").addClass("is-active");
    console.log('howdy')
  });
  $(".modal-close").click(function () {
    $(".modal").removeClass("is-active");
  });
  $("#add-job-form").submit(function() {
    $(".modal").removeClass("is-active");
  })
})

