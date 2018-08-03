  $("#create-job-form").hide();
  console.log('in the js fileeee')
  // show/hide modal in jobs component
  $("#show-create-job").click(function () {
    console.log('show jobs was clicked')
    $("#create-job-form").show("slow");
    $("#all-jobs-main").fadeOut("slow");
  });
