// $(document).ready(function(){
  document.getElementById("reg_button").click(function(){
    // $.ajax({
    //   type: 'GET',
    //   url: '/register',
    //   success: function(data){
    //     $("#reg_Div").html(data);
    //   }
    // });
    console.log('yes this works');
  });

  $("#login_button").click(function(){
    $.ajax({
      type: 'GET',
      url: '/login',
      success: function(data){
        $('#login_Div').html(data);
      }
    });
  });

  //login form request
  $("#loginForm").click(function(){
    var username = $("#username").val();
    var password = $("#password").val();
    var login_Data = {'name': username, 'password': password};
    $.ajax({
      type: 'POST',
      url: '/demo',
      data: login_Data,
      success: function(data){
        $('#mainDiv').html(data);
      }
    });
  });

  //register form request
  $('#regForm').click(function(){
    var username = $("#username").val();
    var password = $("#password").val();
    var reg_Data = {'name': username, 'password': password};
    $.ajax({
      type : 'POST',
      url : '/register_to_db',
      data : reg_Data,
      success: function(data){
        $("#mainDiv").html(data);
       }
    });
  });
  //save info to database
  $('#saveBtn').click(function(){
    var email = $("#email").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var location = $("#location").val();
    var gender = $("#gender").val();
    var age = $("#age").val();
    var profile_Data = {'email': email, 'name': username, 'password': password, 'location': location, 'gender': gender, 'age': age};
    $.ajax({
      type : 'POST',
      url : '/completeprofile',
      data : profileData,
      success : function(data){
         $("#mainDiv").html(data);
    }
  });
// });
