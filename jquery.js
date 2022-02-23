$(document).ready(function () {
    let id = 1;
    let list = [];
    let isEdit = false;
    let index = -1

    regex_sdt = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

    $("#create-data").click(function () {
      const name = $("#name").val();
      const birtday = $("#birtday").val();
      const phone = $("#phone").val();
      const hometown = $("#hometown").val();

      if (name == "" || name.length > 50) {
        $("#name_message").text("Name không được để trống và quá 50 ký tự")
        return 0;
      }

      if (birtday == "") {
        $("#birtday_message").text("Birthday không được để trống")
        return 0;
      } else {
        if (Date.parse(birtday) >= new Date()) {
          $("#birtday_message").text("Birthday không được quá ngày hiện tại")
          return 0;
        }

        if (new Date().getFullYear() - new Date(birtday).getFullYear() >= 100) {
          $("#birtday_message").text("Birthday không được quá 100 tuổi")
          return 0;
        }
      }

      if (phone == "" || regex_sdt.test(phone) == false) {
        $("#phone_message").text("Phone không được để trống và định dạng")
        return 0;
      }

      if (hometown == "") {
        $("#hometown_message").text("Hometown không được để trống")
        return 0;
      }

      if (isEdit) {
        updateInfo(name, birtday, phone, hometown);
        isEdit = false;
        return;
      }

      $("#data-table").append("<tr id='" + id + "'>" +
        " <th scope=\"row\"><input class=\"form-check-input\" type=\"checkbox\" value ='" + id + "'></th scope=\"row\">" +
        "<td class='no' >" + id + "</td>" +
        "<td class='name'>" + name + "</td>" +
        "<td class='birtday'>" + birtday + "</td>" +
        "<td class='phone'>" + phone + "</td>" +
        "<td class='hometown'>" + hometown + "</td>" +
        "</tr>");
      const ob = { id, name, birtday, phone, hometown };
      list.push(ob);
      clearForm();
      id++;
    });

    $('#delete').on('click', function () {
      let text = "Bạn có chắc chắn muốn xóa sinh viên đang chọn?";
      if (confirm(text) == true) {
        for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
          if (checkbox.checked === true) {
            let index = checkbox.value;
            let rowData = $('#data-table').find('tr#' + index);
            rowData.remove();
            list.splice(index, 1);
          }
        }
      }
    });

    const indexRowIsChecked = () => {
      let index = -1;
      for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
        if (checkbox.checked === true) {
          index = checkbox.value;
          break;
        }
      }
      return index;
    }

    $('#edit').on('click', function () {
      let count = countChecked();
      console.log(count);
      if (count === 1) {
        index = indexRowIsChecked();
        let rowData = $('#data-table').find('tr#' + index);

        document.getElementById('name').value = rowData.children('.name').text();
        document.getElementById('birtday').value = rowData.children('.birtday').text();
        document.getElementById('phone').value = rowData.children('.phone').text();
        document.getElementById('hometown').value = rowData.children('.hometown').text();

        isEdit = true;
      } else {
        alert("Bạn chỉ được sửa thông tin của 1 sinh viên")
      }
    });

    $("#clear-data").on('click', function () {
      clearForm();
    })

    const countChecked = () => {
      let count = 0;
      for (const checkbox of document.querySelectorAll('input[type="checkbox"]')) {
        if (checkbox.checked === true) {
          count++;
        }
      }
      return count;
    }

    $("#data-table").change(function () {
      let count = countChecked();
      if (count === 0) {
        $("#edit").prop('disabled', true);
        $("#delete").prop('disabled', true);
      } else {
        $("#edit").prop('disabled', false);
        $("#delete").prop('disabled', false);
      }
    });

    function updateInfo(name, birtday, phone, hometown) {
      list[index].name = name;
      list[index].birtday = birtday;
      list[index].phone = phone;
      list[index].hometown = hometown;

      const rowData = $('table').find('tr#' + index);
      rowData.children('.name').text(name);
      rowData.children('.birtday').text(birtday);
      rowData.children('.phone').text(phone);
      rowData.children('.hometown').text(hometown);

      index = -1;
      clearForm();
    }


    function clearForm() {
      document.getElementById("name").value = "";
      document.getElementById("birtday").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("hometown").value = "";
    }

  });