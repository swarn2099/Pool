var lon, latPoint, privateCheckVar, orgName;
var privateArray = [];
var population = 0;


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



function signOut() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    window.location.href = "signin.html";

  }, function(error) {
    window.location.href = "../index.html";
  });
}

function renderOrganizationCard() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("orgs").doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          console.log(doc.id);
          document.getElementById("name").value = doc.data().name;
          document.getElementById("image").value = doc.data().imageURL;
          document.getElementById("story").value = doc.data().description;


        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  });
  }

  function organizationCard() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var author = user.uid;
        var name = document.getElementById("name");
        var category = document.getElementById("category");
        var categorySelected = category.options[category.selectedIndex].value;
        var imgsrc = document.getElementById("image");
        var query = document.querySelector('pre').innerHTML;
        db.collection("orgs").doc(author).set({
            name: name.value,
            category: categorySelected,
            description: query,
            imageURL: imgsrc.value,
            author: author,
          })
          .then(function(docRef) {
            console.log("Document written");
            M.toast({
              html: 'Card Added',
              classes: ' green white-text'
            });
          })
      }
    });
  }

  function getPreviewEvent() {
    //IMAGE
    var image = document.getElementById("imageLink");
    var imagePreview = '<img class="reduceheight" src="' + image.value + '">';
    var imageValuePreview = document.getElementById("imgValuePreview");
    imageValuePreview.innerHTML = imagePreview;

    //LOCATION
    var location = document.getElementById("us2-address");
    var locationSelected = '<h6>' + location.value + '</h6>';
    var locationPreview = document.getElementById("locationPreview");
    locationPreview.innerHTML = locationSelected;

    //EVENT NAME
    var eventName = document.getElementById("eventname");
    var eventPreview = '<span class="card-title">' + eventName.value + '</span>';
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
    //
    //Description
    var description = document.querySelector('pre').innerHTML;
    var descriptionValuePreview = document.getElementById("descriptionValuePreview");
    descriptionValuePreview.innerHTML = description.value;
  };



  function addOrgEvent() {
    var eventName = document.getElementById("eventname");
    var tag = document.getElementById("tag");
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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var docRef = db.collection("orgs").doc(user.uid);
        docRef.get().then(function(doc) {
          if (doc.exists) {
            var orgName = doc.data().name;
            db.collection("orgEvents").doc(eventName.value).set({
                name: eventName.value,
                category: orgName,
                city: user.photoURL,
                description: queryDescription,
                imageURL: imgsrc.value,
                startTime: startTime.value,
                endTime: endTime.value,
                location: location.value,
                date: date.value,
                geoPosition: coords,
                author: user.uid,
                id: eventName.value,
                population: 0,
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
                  html: 'Something went wrong',
                  classes: ' red white-text'
                });
              });
            db.collection("approvedEvents").doc(eventName.value).set({
                name: eventName.value,
                category: orgName,
                city: user.photoURL,
                description: queryDescription,
                imageURL: imgsrc.value,
                startTime: startTime.value,
                endTime: endTime.value,
                location: location.value,
                date: date.value,
                geoPosition: coords,
                author: user.uid,
                id: eventName.value,
                population: 0,
              })
              .then(function(docRef) {
                console.log("Document written to Approved");
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
                M.toast({
                  html: 'Something went wrong',
                  classes: ' red white-text'
                });
              });
          }
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

  }

  function queryOrgEvents() {
    console.log("The fucntion ran");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var displayName = user.displayName;
        console.log(displayName);
        var welcome = document.getElementById("welcomeMessage");
        var welcomeMessage = '<span class="white-text">Welcome ' + displayName + '</span><i class="material-icons right white-text">arrow_drop_down</i></a>';
        welcome.innerHTML = welcomeMessage;
        // User is signed in.
        db.collection("orgEvents").where("author", "==", user.uid).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // var option = '<a href="#!" class="collection-item" id="' + doc.id + '">' + doc.data().name + '</a>';
            var option = '<option value="' + doc.id + '">' + doc.data().name + '</option>';
            console.log(option);
            var optionPreview = document.getElementById("optionArea");
            optionPreview.innerHTML += option;
          });
        });
      }
    });
  };

  function editCardRender() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        var cardToEdit = document.getElementById("optionArea");
        var cardToEditSelected = cardToEdit.options[cardToEdit.selectedIndex].value;
        var docRef = db.collection("orgEvents").doc(cardToEditSelected);

        docRef.get().then(function(doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log(doc.id);

            //IMAGE
            var image = doc.data().imageURL;
            var imagePreview = '<img class="reduceheight" src="' + image + '">';
            var imageValuePreview = document.getElementById("imgValuePreview");
            imageValuePreview.innerHTML = imagePreview;
            var imageUrl = document.getElementById("imageUpdate");
            imageUrl.value = image;


            //LOCATION
            var location = doc.data().location;
            var locationPreview = document.getElementById("us2-address");
            locationPreview.value = location;

            //EVENT NAME
            var eventName = doc.data().name;
            console.log(eventName);
            var eventNamePreview = document.getElementById("eventname");
            eventNamePreview.value = eventName;

            //docID
            var docID = doc.data().id;
            var docIDPreview = document.getElementById("document");
            docIDPreview.value = docID;

            //TIME and DATE
            var startTime = doc.data().startTime;
            var endTime = doc.data().endTime;
            var date = doc.data().date;
            var population = doc.data().population;
            var starttimeValuePreview = document.getElementById("starttime");
            var endtimeValuePreview = document.getElementById("endtime");
            var dateValuePreview = document.getElementById("date");
            var populationPreview = document.getElementById("population");

            starttimeValuePreview.value = startTime;
            endtimeValuePreview.value = endTime;
            dateValuePreview.value = date;
            populationPreview.value = population;

            //Description
            var description = doc.data().description;
            var descriptionPreview = '<textarea id="textarea1" class="materialize-textarea"  rows="5">' + description + '</textarea>';
            var descriptionValuePreview = document.getElementById("descriptionValuePreview");
            descriptionValuePreview.innerHTML = descriptionPreview;
          } else {
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
      }
    });
  };

  function updateEvent(population) {
    console.log("The fucntion ran");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var docUpdate = document.getElementById("document");

        // Set the "capital" field of the city 'DC'
        return db.collection('orgEvents').doc(docUpdate.value).set({
            name: document.getElementById("eventname").value,
            location: document.getElementById("us2-address").value,
            startTime: document.getElementById("starttime").value,
            endTime: document.getElementById("endtime").value,
            date: document.getElementById("date").value,
            description: document.getElementById("textarea1").value,
            imageURL: document.getElementById("imageUpdate").value,
            author: user.uid,
            id: docUpdate.value,
            population: document.getElementById("population").value,
            })
          .then(function() {
            console.log("Document successfully updated!");
            M.toast({
              html: 'Event Updated!',
              classes: 'rounded teal white-text'
            });
            location.reload();

          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      } else {
        // No user is signed in.
      }
    });

  }

  function deleteEvent() {
    console.log("The fucntion ran");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var docUpdate = document.getElementById("document");
        var washingtonRef = db.collection("orgEvents").doc(docUpdate.value).delete().then(function() {
          console.log("Document successfully deleted!");
          M.toast({
            html: 'Event Deleted',
            classes: 'rounded red white-text'
          });
          location.reload();

        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      } else {
        // No user is signed in.
      }
    });

  }

  function signOut() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
      window.location.href = "../index.html";

    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
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
