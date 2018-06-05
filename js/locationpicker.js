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

function initMap() {
  var uluru = {
    lat: latPoint,
    lng: lon
  };
  var map = new google.maps.Map(
    document.getElementById('map'), {
      center: uluru,
      disableDefaultUI: true
    });
}

function getPreviewEvent() {
  //IMAGE
  var image = document.getElementById("imageLink");
  var imagePreview = '<img src="' + image.value + '" id="imgCard" class="center">';
  var imageValuePreview = document.getElementById("imgValuePreview");
  imageValuePreview.innerHTML = imagePreview;

  //CATEGORY
  var category = document.getElementById("category");
  var categorySelected = category.options[category.selectedIndex].value;
  var categoryPreview = document.getElementById("categoryPreview");
  categoryPreview.innerHTML = categorySelected;

  //EVENT NAME
  var eventName = document.getElementById("eventname");
  var eventPreview = '<h4><b>' + eventName.value + '</b></h4>';
  var eventNamePreview = document.getElementById("eventNamePreview");
  eventNamePreview.innerHTML = eventPreview;

  //DATE
  var date = document.getElementById("date");
  var datePreview = '<h5>' + date.value + '</h5>';
  var dateValuePreview = document.getElementById("dateValuePreview");
  dateValuePreview.innerHTML = datePreview;

  //TIME
  var startTime = document.getElementById("starttime");
  var endTime = document.getElementById("endtime");
  var timePreview = '<h6>' + startTime.value + ' - ' + endTime.value + '</h6><h6>' + date.value + '</h6>';
  var timeValuePreview = document.getElementById("timeValuePreview");
  timeValuePreview.innerHTML = timePreview;

  //Description
  var description = document.getElementById("description");
  var descriptionPreview = description.value;
  var descriptionValuePreview = document.getElementById("descriptionValuePreview");
  descriptionValuePreview.innerHTML = descriptionPreview;

};
(function() {
  var markDownEl = document.querySelector(".markdown");
  new MediumEditor(document.querySelector(".editor"), {
    extensions: {
      markdown: new MeMarkdown(function(md) {
        markDownEl.textContent = md;
      })
    }
  });
})();

/** Add an event to Firebase database */
function getFormEvent() {
  var eventName = document.getElementById("eventname");
  var tag = document.getElementById("tag");
  var category = document.getElementById("category");
  var categorySelected = category.options[category.selectedIndex].value;
  var checkbox = document.getElementById("featured").checked;
  var strDescription = document.getElementById("description");
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
  db.collection("events").add({
      name: eventName.value,
      // category: categorySelected.value,
      featured: checkbox,
      description: strDescription.value,
      imageURL: imgsrc.value,
      startTime: startTime.value,
      endTime: endTime.value,
      location: location.value,
      date: date.value,
      geoPosition: coords

    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
