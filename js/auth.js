function login() {
  var email= document.getElementById("email").value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    // ...
  });
};

  function createUser() {
    var emailCreate= document.getElementById("email").value;
    var passwordCreate = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(emailCreate, passwordCreate).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  };
