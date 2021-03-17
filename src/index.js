var table = $("#table").DataTable(datatableConfig.options());

addUserModule.init();
editUserModule.init();
delteUserModule.init();

$(document).ready(function () {
  $("input").attr("autocomplete", "off");
  $("#loading").fadeOut(1000);
  document.title = config.title;
});
