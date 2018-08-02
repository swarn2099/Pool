

function queryResults() {
  console.log("The fucntion ran");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var displayName = user.displayName;
      console.log(displayName);
      var welcome = document.getElementById("welcomeMessage");
      var welcomeMessage = '<span class="white-text">Welcome ' + displayName + '</span><i class="material-icons right white-text">arrow_drop_down</i></a>';
      welcome.innerHTML = welcomeMessage;
      // User is signed in.
      db.collection("potentialEvents").where("author", "==", user.uid).get().then(function(querySnapshot) {
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

function editCardRender(latPoint, lon) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      var cardToEdit = document.getElementById("optionArea");
      var cardToEditSelected = cardToEdit.options[cardToEdit.selectedIndex].value;
      var docRef = db.collection("potentialEvents").doc(cardToEditSelected);

      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          console.log(doc.id);

          //IMAGE
          var image = doc.data().imageURL;
          var imagePreview = '<img class="reduceheight" src="'+image+'">';
          var imageValuePreview = document.getElementById("imgValuePreview");
          imageValuePreview.innerHTML = imagePreview;
          var imageUrl = document.getElementById("imageUpdate");
          imageUrl.value = image;
          //
          //CATEGORY
          var category = doc.data().category;
          console.log(category);
          var categoryPreview = document.getElementById("category");
          categoryPreview.options[categoryPreview.selectedIndex].value = category;

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
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  });
};

function updateEvent(latPoint, lon) {
  console.log("The fucntion ran");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var docUpdate = document.getElementById("document");
      var category = document.getElementById("category");
      var categorySelected = category.options[category.selectedIndex].value;

      db.collection("potentialEventsUpdates").doc(docUpdate.value).set({
            name: document.getElementById("eventname").value,
            location: document.getElementById("us2-address").value,
            startTime: document.getElementById("starttime").value,
            category: categorySelected,
            endTime: document.getElementById("endtime").value,
            date: document.getElementById("date").value,
            description: document.getElementById("textarea1").value,
            imageURL: document.getElementById("imageUpdate").value,
            author: user.uid,
            id: docUpdate.value,
            population: document.getElementById("population").value,
        })
        .then(function(docRef) {
          console.log("Document written");
          M.toast({
            html: 'Event Update submitted for review',
            classes: ' amber white-text'
          });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      // Set the "capital" field of the city 'DC'
      return db.collection('potentialEvents').doc(docUpdate.value).set({
        name: document.getElementById("eventname").value,
        location: document.getElementById("us2-address").value,
        startTime: document.getElementById("starttime").value,
        category: categorySelected,
        endTime: document.getElementById("endtime").value,
        date: document.getElementById("date").value,
        description: document.getElementById("textarea1").value,
        imageURL: document.getElementById("imageUpdate").value,
        author: user.uid,
        id: docUpdate.value,
        population: document.getElementById("population").value,
          // geoPosition: coords,
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
      var washingtonRef = db.collection("potentialEvents").doc(docUpdate.value).delete().then(function() {
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
    window.location.href="../index.html";

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
