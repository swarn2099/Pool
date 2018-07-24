var lon, latPoint;

$('#us2').locationpicker({
  location: {
    latitude: 0,
    longitude: 0,
  },
  addressFormat: 'street_address',
  enableAutocomplete: true,
  enableReverseGeocode: true,
  inputBinding: {
    locationNameInput: $('#us2-address')
  },
  onchanged: function(currentLocation) {
    var addressComponents = $(this).locationpicker('map').location.addressComponents;
    lon = currentLocation.longitude;
    latPoint = currentLocation.latitude;
  }

});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var uid = user.uid;
    console.log(displayName);
    console.log(uid);
    var welcome = document.getElementById("welcomeMessage");
    var welcomeMessage = '<span class="white-text">Welcome ' + displayName + '</span><i class="material-icons right white-text">arrow_drop_down</i></a>';
    welcome.innerHTML = welcomeMessage;

  } else {
    // User is signed out.
    // ...
  }
});

function signOut() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    window.location.href = "signin.html";

  }, function(error) {
    window.location.href = "../index.html";
  });
}
function getPreviewEvent() {
  //IMAGE
  var image = document.getElementById("imageLink");
  var imagePreview = '<img class="reduceheight" src="'+image.value+'">';
  var imageValuePreview = document.getElementById("imgValuePreview");
  imageValuePreview.innerHTML = imagePreview;
  //
  // //CATEGORY
  // var category = document.getElementById("category");
  // var categorySelected = category.options[category.selectedIndex].value;
  // var categoryPreview = document.getElementById("categoryPreview");
  // categoryPreview.innerHTML = categorySelected;

  //LOCATION
  var location = document.getElementById("us2-address");
  var locationSelected = '<h6>' + location.value + '</h6>';
  var locationPreview = document.getElementById("locationPreview");
  locationPreview.innerHTML = locationSelected;

  //EVENT NAME
  var eventName = document.getElementById("eventname");
  var eventPreview = '<span class="card-title">'+eventName.value+'</span>';
  var eventNamePreview = document.getElementById("eventNamePreview");
  eventNamePreview.innerHTML = eventPreview;

  //TIME
  var startTime = document.getElementById("starttime");
  var endTime = document.getElementById("endtime");
  var date = document.getElementById("date");
  var starttimeValuePreview = document.getElementById("starttimePreview");
  var endtimeValuePreview = document.getElementById("endtimePreview");
  var dateValuePreview = document.getElementById("datePreview");
  starttimeValuePreview.value = startTime.value;
  endtimeValuePreview.value = endTime.value;
  dateValuePreview.value = date.value;

  //Description
  var description = document.getElementById("description");
  var descriptionPreview = description.value;
  var descriptionValuePreview = document.getElementById("descriptionValuePreview");
  descriptionValuePreview.innerHTML = descriptionPreview;

};


/** Add an event to Firebase database */
function getFormEvent() {
  var eventName = document.getElementById("eventname");
  var tag = document.getElementById("tag");
  var category = document.getElementById("category");
  var categorySelected = category.options[category.selectedIndex].value;
  console.log(categorySelected);
  var strDescription = document.getElementById("description");
  var queryDescription = document.querySelector('pre').innerHTML;

  var link = document.getElementById("info");
  var imgsrc = document.getElementById("imageLink");
  var date = document.getElementById("date");
  var startTime = document.getElementById("starttime");
  var endTime = document.getElementById("endtime");
  var location = document.getElementById("us2-address");
  var coords = {
    latPoint,
    lon
  };
  // Add a second document with a generated ID.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("potentialEvents").doc(eventName.value).set({
          name: eventName.value,
          category: categorySelected,
          city: user.photoURL,
          description: queryDescription,
          imageURL: imgsrc.value,
          startTime: startTime.value,
          endTime: endTime.value,
          location: location.value,
          date: date.value,
          geoPosition: coords,
          author: user.uid,
          id: eventName.value

        })
        .then(function(docRef) {
          console.log("Document written");
          M.toast({
            html: 'Event Added',
            classes: ' green white-text'
          });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          M.toast({
            html: 'Something went AIzaSyCvM4gKXyUW58BrDOnqU3bJBGnCNiexCzI',
            classes: ' red white-text'
          });
        });

        db.collection("potentialEventsTraveler").doc(eventName.value).set({
            name: eventName.value,
            category: categorySelected,
            city: user.photoURL,
            description: strDescription.value,
            imageURL: imgsrc.value,
            startTime: startTime.value,
            endTime: endTime.value,
            location: location.value,
            date: date.value,
            geoPosition: coords,
            author: user.uid,
            id: eventName.value

          })
          .then(function(docRef) {
            console.log("Document written");
            // M.toast({
            //   html: 'Event Added',
            //   classes: ' green white-text'
            // });
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
            // M.toast({
            //   html: 'Event Added',
            //   classes: ' red white-text'
            // });
          });
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}
function uploadStory() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
console.log(user);
      var storyName = document.getElementById("title");
      var categoryStory = document.getElementById("category");
      var categoryStorySelected = categoryStory.options[categoryStory.selectedIndex].value;
      var imgsrcStory = document.getElementById("image");
      var query = document.querySelector('pre').innerHTML;
      db.collection("stories").doc(storyName.value).set({
          name: storyName.value,
          city: user.photoURL,
          category: categoryStorySelected,
          description: query,
          imageURL: imgsrcStory.value,
          author: user.uid,
          id: storyName.value

        })
        .then(function(docRef) {
          console.log("Document written");
          M.toast({html: 'Story Added', classes: ' green white-text'});
        })

    }
  });
}
