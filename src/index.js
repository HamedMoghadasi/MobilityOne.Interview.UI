const apiUrl = "https://localhost:5001";
let data = [];
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
      return `<button  class="btn btn-sm btn-warning edit-button" data-id="${data.id}" data-row=${meta.row} onclick="fillEditModalInputs(${data.id})" type="button" data-toggle="modal" data-target="#editModal">
      <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      
      <button class="btn btn-sm btn-danger delete-button" data-id="${data.id}" data-row=${meta.row} type="button" data-toggle="modal" data-target="#deleteModal">
      <i class="fa fa-trash" aria-hidden="true"></i>
      </button>`;
    },
    orderable: false,
  },
];

var getAllUsers = $.ajax({
  url: `${apiUrl}/api/users`,
  type: "GET",
  async: false,
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (response) {
    data = response;
  },
});

var table = $("#table").DataTable({
  data: data,
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
});

$(".add-button-container").append(
  `<button id='add-button' class='add-button btn btn-sm btn-success' type="button" data-toggle="modal" data-target="#addModal">
      <i class='fa fa-plus' aria-hidden='true'></i> Add
    </button>`
);

$("#update-button").on("click", function () {
  var editedUser = getEditModalObject();
  $.ajax({
    url: `${apiUrl}/api/users`,
    type: "PUT",
    async: false,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(editedUser),
    success: function (response) {
      console.log("response", response);
      $("#editModal").modal("toggle");
    },
  });
});
function fillEditModalInputs(id) {
  var row = table.data().filter((user) => user.id === id)[0];
  $("#editId").val(row.id);
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
    Id: Number($("#editId").val()),
    Name: $("#editName").val(),
    PhoneNumber: $("#editPhoneNumber").val(),
    EmailAddress: $("#editEmail").val(),
    Password: $("#editPassword").val(),
    LastLogin: $("#editLastLogin").val(),
    CreateDate: $("#editCreateDate").val(),
    Suspended: $("#editSuspend").prop("checked"),
  };

  return editedUser;
}
