var addUserModule = {
  getObject: function () {
    var addedUser = {
      name: $("#addName").val(),
      phoneNumber: $("#addPhoneNumber").val(),
      emailAddress: $("#addEmail").val(),
      password: $("#addPassword").val(),
      suspended: $("#addSuspend").prop("checked"),
    };
    return { data: addedUser };
  },
  render: function () {
    $(".add-button-container").append(
      `<button id='add-button' class='add-button btn btn-sm btn-success' type="button" data-toggle="modal" data-target="#addModal">
                    <i class='fa fa-plus fa-xs' aria-hidden='true'></i> Add new user
                  </button>`
    );
  },
  handleSubmit: function () {
    let addModule = this;
    $("#save-button").on("click", function () {
      var addedUser = addModule.getObject();
      $.ajax({
        url: `${config.apiUrl}/api/users`,
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(addedUser.data),
        success: function (response) {
          $("#addModal").modal("toggle");
          table.row.add(response.data).draw(false, null);
          addModule.clearInputs();
        },
      });
    });
  },
  clearInputs: function () {
    $("#addName").val(""),
      $("#addPhoneNumber").val(""),
      $("#addEmail").val(""),
      $("#addPassword").val(""),
      $("#addSuspend").prop("checked", false);
  },
  init: function () {
    this.render();
    this.handleSubmit();
  },
};
