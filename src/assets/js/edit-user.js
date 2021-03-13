var editUserModule = {
  getObject: function () {
    var editedUser = {
      id: Number($("#editId").val()),
      name: $("#editName").val(),
      phoneNumber: $("#editPhoneNumber").val(),
      emailAddress: $("#editEmail").val(),
      password: $("#editPassword").val(),
      lastLogin: $("#editLastLogin").val(),
      createDate: $("#editCreateDate").val(),
      suspended: $("#editSuspend").prop("checked"),
    };
    let rowNumber = $("#editRowNumber").val();
    return { data: editedUser, rowNumber: rowNumber };
  },

  fillInputs: function (id, rowNumber) {
    var row = table.data().filter((user) => user.id === id)[0];
    $("#editId").val(row.id);
    $("#editRowNumber").val(rowNumber);
    $("#editName").val(row.name);
    $("#editPhoneNumber").val(row.phoneNumber);
    $("#editEmail").val(row.emailAddress);
    $("#editPassword").val(row.password);
    $("#editLastLogin").val(row.lastLogin);
    $("#editCreateDate").val(row.createDate);
    $("#editSuspend").prop("checked", row.suspended);
  },

  handleSubmit: function () {
    let editModule = this;
    $("#update-button").on("click", function () {
      var editedUser = editModule.getObject();
      console.log("editedUser", editedUser);
      $.ajax({
        url: `${config.apiUrl}/api/users`,
        type: "PUT",
        async: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(editedUser.data),
        success: function (response) {
          table
            .row(editedUser.rowNumber)
            .data(editedUser.data)
            .draw(false, null);
          $("#editModal").modal("toggle");
        },
      });
    });
  },

  init: function () {
    this.handleSubmit();
  },
};
