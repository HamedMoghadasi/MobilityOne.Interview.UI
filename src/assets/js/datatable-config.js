var datatableConfig = {
  columns: [
    { data: "id" },
    { data: "name" },
    { data: "phoneNumber" },
    { data: "emailAddress" },
    { data: "password" },
    {
      data: "lastLogin",
      render: function (data) {
        return moment(data).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      data: "createDate",
      render: function (data) {
        return moment(data).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      data: "suspended",
      render: function (data) {
        if (data === true || data === 1) {
          return `<i class="fa fa-check text-success fa-lg" aria-hidden="true"></i>`;
        } else {
          return `<i class="fa fa-close text-danger fa-lg" aria-hidden="true"></i>`;
        }
      },
    },
    {
      data: null,
      render: function (data, type, full, meta) {
        return `<button  class="btn btn-sm btn-warning edit-button" data-id="${data.id}" data-row=${meta.row} onclick="editUserModule.fillInputs(${data.id},${meta.row})" type="button" data-toggle="modal" data-target="#editModal">
            <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
            </button>
            
            <button class="btn btn-sm btn-danger delete-button" data-id="${data.id}" data-row=${meta.row} onclick="delteUserModule.fillInputs(${data.id},${meta.row})" type="button" data-toggle="modal" data-target="#deleteModal">
            <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
            </button>`;
      },
      orderable: false,
    },
  ],
  getAllUsers: function () {
    let temp = [];
    $.ajax({
      url: `${config.apiUrl}/api/users`,
      type: "GET",
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        temp = response.data;
      },
    });
    return temp;
  },
  handleResponsive: function () {
    if ($(window).width() > 700) {
      $("#table").addClass("display");
    }
  },
  options: function () {
    this.handleResponsive();
    return {
      data: this.getAllUsers(),
      aoColumns: this.columns,
      responsive: true,
      // scrollY: "80vh",
      // scrollCollapse: true,
      oLanguage: {
        sSearch: "",
        sSearchPlaceholder: "Search",
        sLengthMenu: "_MENU_ ",
      },
      lengthMenu: [5, 15, 25, 50, 75, 100],
      dom:
        "<'row'<'col-sm-12 col-md-2 add-button-container'><'col-sm-12 col-md-8'f><'col-sm-12 col-md-2'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      order: [[0, "desc"]],
    };
  },
};
