const apiUrl = "https://localhost:5001";

const columns = [
  { data: "id" },
  { data: "name" },
  { data: "phoneNumber" },
  { data: "emailAddress" },
  { data: "password" },
  { data: "lastLogin" },
  { data: "createDate" },
  { data: "suspended" },
  {
    data: null,
    render: function (data, type, full, meta) {
      return `<button  class="btn btn-sm btn-warning edit-button" data-id="${data.id}" data-row=${meta.row} onclick="fillEditModalInputs(${data.id},${meta.row})" type="button" data-toggle="modal" data-target="#editModal">
      <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      
      <button class="btn btn-sm btn-danger delete-button" data-id="${data.id}" data-row=${meta.row} onclick="fillDeleteModalInputs(${data.id},${meta.row})" type="button" data-toggle="modal" data-target="#deleteModal">
      <i class="fa fa-trash" aria-hidden="true"></i>
      </button>`;
    },
    orderable: false,
  },
];

var getAllUsers = function () {
  let temp = [];
  $.ajax({
    url: `${apiUrl}/api/users`,
    type: "GET",
    async: false,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      temp = response;
    },
  });
  return temp;
};

var table = $("#table").DataTable({
  data: getAllUsers(),
  aoColumns: columns,
  responsive: true,
  scrollY: "50vh",
  scrollCollapse: true,
  oLanguage: {
    sSearch: "",
    sSearchPlaceholder: "Search",
  },
  lengthMenu: [5, 15, 25, 50, 75, 100],
  dom:
    "<'row'<'col-sm-12 col-md-2 add-button-container'><'col-sm-12 col-md-8'f><'col-sm-12 col-md-2'l>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
  order: [[0, "desc"]],
});
console.log("table", table);
$(".add-button-container").append(
  `<button id='add-button' class='add-button btn btn-sm btn-success' type="button" data-toggle="modal" data-target="#addModal">
      <i class='fa fa-plus' aria-hidden='true'></i> Add
    </button>`
);

$("#update-button").on("click", function () {
  var editedUser = getEditModalObject();
  console.log("editedUser", editedUser);
  $.ajax({
    url: `${apiUrl}/api/users`,
    type: "PUT",
    async: false,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(editedUser.data),
    success: function (response) {
      console.log("response", response);
      table.row(editedUser.rowNumber).data(editedUser.data).draw(false, null);
      $("#editModal").modal("toggle");
    },
  });
});

$("#save-button").on("click", function () {
  var addedUser = getAddModalObject();
  console.log("addedUser", addedUser);
  $.ajax({
    url: `${apiUrl}/api/users`,
    type: "POST",
    async: false,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(addedUser.data),
    success: function (response) {
      console.log("response", response);
      $("#addModal").modal("toggle");
      table.row.add(response).draw(false, null);
    },
  });
});

$("#delete-button").on("click", function () {
  var rowNumber = $("#deleteRowNumber").val();
  var id = $("#deleteId").val();
  $.ajax({
    url: `${apiUrl}/api/users/${id}`,
    type: "DELETE",
    async: false,
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      console.log("response", response);
      $("#deleteModal").modal("toggle");
      table.row(rowNumber).remove().draw(false, null);
    },
  });
});

function fillDeleteModalInputs(id, rowNumber) {
  $("#deleteId").val(id);
  $("#deleteRowNumber").val(rowNumber);
}

function fillEditModalInputs(id, rowNumber) {
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
}

function getEditModalObject() {
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
}

function getAddModalObject() {
  var addedUser = {
    name: $("#addName").val(),
    phoneNumber: $("#addPhoneNumber").val(),
    emailAddress: $("#addEmail").val(),
    password: $("#addPassword").val(),
    suspended: $("#addSuspend").prop("checked"),
  };
  return { data: addedUser };
}
