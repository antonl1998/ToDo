//Hide all extra fields
var extraFields = document.getElementsByClassName('extraFields');
for (var i = 0; i < extraFields.length; i++) {
    extraFields[i].style.display = "none";
}

//Formi kutsuu tätä funktiota kun submit nappia painetaan ja luo uuden tehtävän
//sekä tekee virheen tarkistuksen
function newTask() {
  //Katsoo onko checkboxissa merkki, jotta tiedetään mitä tietoja tarkistetaan
  var checkBox = document.forms.newTask.extraOptions.checked;
  if(checkBox) {
    var table = document.getElementById("userTasks");
    var userInput = document.getElementById("userInput").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var priority = document.getElementById("priority").value;
    if(userInput == null || userInput == "") {
      document.forms.newTask.userInput.style.border = "1px solid red";
      alert("Fill all the fields properly");
      document.getElementById("userInput").focus();
      document.getElementById("userInput").select();
      return false;
    } else if(time == null || time == "") {
      document.forms.newTask.time.style.border = "1px solid red";
      alert("Fill all the fields properly");
      document.forms.newTask.time.focus();
      document.forms.newTask.time.select();
      return false;
    } else if(date == null || date == "") {
      document.forms.newTask.date.style.border = "1px solid red";
      document.forms.newTask.date.focus();
      document.forms.newTask.date.select();
      alert("Fill all the fields properly");
      return false;
    } else {
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = userInput;
      cell2.innerHTML = time;
      cell3.innerHTML = date;
      cell4.innerHTML = priority;
      cell5.innerHTML = "<input type='button' class='deleteButton' value='\u00D7' onclick='deleteRow(this)'>";

      //Tyhjentää kentän lisäämisen jälkeen
      document.getElementById("userInput").value = "";

      //Lasketaan rivien määrä ja tehdään jokaisesta uniikki
      //Sekä tehdään rivistä siirrettävä
      var countRows = table.getElementsByTagName("tr").length;
      row.id = "draggableRow" + countRows;
      row.draggable = "true";
      row.ondragstart = function(){
        onDragStart(event);
      }

      //luodaan kuuntelija joka kutsuu checkRow funktiota
      row.addEventListener("click", function(){
        checkRow(this);
      });
      document.forms.newTask.userInput.style.border = "none";
      document.forms.newTask.time.style.border = "none";
      document.forms.newTask.date.style.border = "none";
      return false;
    }
  } else {
    //Tarkistaa käyttäjän syöttämät tiedot
    var userInput = document.getElementById("userInput").value;
    if(userInput == null || userInput == "") {
      document.forms.newTask.userInput.style.borderColor = "red";
      alert("Fill all the fields properly");
      document.getElementById("userInput").focus();
      document.getElementById("userInput").select();
      return false;
    } else {
      //Lisää taulukko userTasks rivi, johon soluja ja rivin poisto napin
      var table = document.getElementById("userTasks");
      var row = table.insertRow(0);
      /*
      Aiheuttaa CSS bugeja kun siirrellään tehtäviä, keksi ratkaisu jos joskus jaksat
      var cell1 = row.insertCell(0);
      cell1.colSpan = 4;
      var cell2 = row.insertCell(1);
      cell2.innerHTML = "<input type='button' class='deleteButton' value='\u00D7' onclick='deleteRow(this)'>";
      */
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = userInput;
      //napin painaminen kutsuu deleteRow funktiota joka poistaa rivin
      cell5.innerHTML = "<input type='button' class='deleteButton' value='\u00D7' onclick='deleteRow(this)'>";

      //Tyhjentää kentän lisäämisen jälkeen
      document.getElementById("userInput").value = "";

      //Lasketaan rivien määrä ja tehdään jokaisesta uniikki
      //Sekä tehdään rivistä siirrettävä
      var countRows = table.getElementsByTagName("tr").length;
      row.id = "draggableRow" + countRows;
      row.draggable = "true";
      row.ondragstart = function(){
        onDragStart(event);
      }

      //luodaan kuuntelija joka kutsuu checkRow funktiota
      row.addEventListener("click", function(){
        checkRow(this);
      });
      document.forms.newTask.userInput.style.border = "none";
      return false;
    }
  }
}

//Deletes row
function deleteRow(row) {
  //hakee ja tallentaa rivin jota on klikattu
  var row = row.parentNode.parentNode.rowIndex;
  //poistaa kyseisen rivin
  document.getElementById("userTasks").deleteRow(row);
}

//Laittaa viivan rivin yli kun klikataan ja poistaa sen kun klikataan uudestaan
function checkRow(row) {
  //Tarkistetaan klikatun rivin class ja muutetaan se
  //Sen mukaan CSS tiedostossa aiheutetaan yliviivaus
  if(row.className.includes("checked")) {
    row.className = "";
  } else {
    row.className = "checked";
  }
}

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event, el) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var target = event.target.parentNode.rowIndex;
  el.insertBefore(document.getElementById(data), el.childNodes[target]);
  event.dataTransfer.clearData();
}

/*Näyttää ylimääräiset vaihtoehdot jos checkboxissa on merkki, jos ei ole piilottaa ne
muuttamalla CSS tiedoston display tyylin "none"ksi */
function showExtraOptions() {
  var checkBox = document.forms.newTask.extraOptions.checked;
  if(checkBox) {
    var extraFields = document.getElementsByClassName('extraFields');
    for (var i = 0; i < extraFields.length; i++) {
        extraFields[i].style.display = "block";
    }
  } else {
    var extraFields = document.getElementsByClassName('extraFields');
    for (var i = 0; i < extraFields.length; i++) {
        extraFields[i].style.display = "none";
    }
  }

}
