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


  // jobs component
  $("#create-job-form").hide();
  $("#cancel-create-job").hide();

  $("#show-create-job").click(function () {
    $("#create-job-form").slideToggle();
    $("#show-create-job").hide();
    $("#cancel-create-job").fadeIn("slow");
    $("#all-jobs-main").fadeOut("slow");
  });

  // cancel create job form, show all jobs
  $("#cancel-create-job").click(function () {
    $("#create-job-form").slideToggle();
    $("#show-create-job").show();
    $("#all-jobs-main").slideToggle();
    $("#cancel-create-job").hide();
  })

  // new job is added, show all jobs
  $("#add-job-form").submit(function () {
    $("#create-job-form").slideToggle();
    $("#all-jobs-main").slideToggle();
  });
})
