$(document).ready(function () {
  var table = $("#table").DataTable(datatableConfig.options());

  addUserModule.init();
  editUserModule.init();
  delteUserModule.init();

  $("input").attr("autocomplete", "off");
  $("#loading").fadeOut(1000);
});
