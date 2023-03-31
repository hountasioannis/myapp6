$(document).ready(function(){

    $.ajax({
      url:'http://localhost:3000/api/product/findall',
      type:'get',
      dataType:'JSON'
    })
    .done(function(response){
      // console.log(">>", response);
      let data = response.data;
      let status = response.status
      
      if (status) { 
          createTbody(data);
      } else {
          alert(false,'Πρόβλημα στην αναζήτηση των χρηστών ('+ data.message + ')');
          // console.log(data);
      }
    });
  

  
  });
  
  function createTbody(data){
  
    $("#productTable > tbody").empty();
  
    // console.log("CreateTBody", data);
    const len = data.length;
    for (let i=0; i<len; i++){
      let product = data[i].product;
      let cost = data[i].cost;
      let description = data[i].description;
      let quantity = data[i].quantity;
     
      
      // console.log(username, name);
  
      let tr_str = "<tr>" +
        "<td>" + product + "</td>" +
        "<td>" + cost + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + quantity + "</td>" +
        "<td>" +
            "<button class='btnUpdate btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
            "<button class='btnDelete btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
        "</td>" + 
        "</tr>";
  
      $("#productTable tbody").append(tr_str);
    }
  }
  
  function alert(status, message){
    if (status){
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('alert-danger');
    } else {
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('alert-success');
    }
    $('.alert').html(message);
  }