var delteUserModule = {
  fillInputs: function (id, rowNumber) {
    $("#deleteId").val(id);
    $("#deleteRowNumber").val(rowNumber);
  },
  handleSubmit: function () {
    $("#delete-button").on("click", function () {
      var rowNumber = $("#deleteRowNumber").val();
      var id = $("#deleteId").val();
      $.ajax({
        url: `${config.apiUrl}/api/users/${id}`,
        type: "DELETE",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
          $("#deleteModal").modal("toggle");
          table.row(rowNumber).remove().draw(false, null);
        },
      });
    });
  },
  init: function () {
    this.handleSubmit();
  },
};
