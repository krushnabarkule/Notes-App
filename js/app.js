console.log("This is pure javascript project")
showNotes();

//if user adds a notes ,add it to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
      }
      notesObj.push(myObj);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      addTxt.value = "";
      addTitle.value = "";
    // console.log(notesObj);
    showNotes();
})

//Function to show your added notes from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}" onclick = "deletenote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>
        </div>
         `;
    });
    let notesElem = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show ,use 'Add a Notes ' above section to add notess`
    }
}

//Function to delete notes
function deletenote(index) {
    // console.log("I am deleting ", index);
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log("Input Event fired", inputVal)
    let notecards = document.getElementsByClassName("notecard")
    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);

    })
})

