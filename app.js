let listItem = document.getElementById('list-item');
let db = firebase.firestore();

function addList() {
    let listItemDetails = {
        item: listItem.value,
        timeStamp: new Date()
    }

    db.collection("taskList").add(listItemDetails)
        .then((savedItem) => {
            console.log(savedItem, 'savedItem');
        });

}













function fetchAllLists() {

    
    db.collection("taskList")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let taskObj = change.doc.data()
                    taskObj.id = change.doc.id
                    showListInDOM(change.doc.data(), taskObj.id)
                }


                if (change.type === "removed") {
                    console.log("Removed Cities: " + change.doc.id);
                    removingListDataRealTime(change.doc.id)
                }

                if (change.type === "modified") {
                    console.log("Modified city: ", change.doc.id);
                    updateLiOnDom(change.doc.id)
                }
            });
        });
}

let allTasksUl = document.getElementById('all-tasks');

function showListInDOM(task, taskID) {


    // console.log(task, taskID);
    let li = document.createElement('li');
    li.setAttribute("id", taskID)
    let taskText = document.createTextNode(task.item);
    let btn = document.createElement("button")
    btn.setAttribute("onClick", "deleteListItem(this)")
    let btnText = document.createTextNode("DELETE")
    let btnUpdate = document.createElement("button")
    btnUpdate.setAttribute("onClick", "updateRealTimeData(this)")
    let btnUpdateTxt = document.createTextNode("UPDATE")
    btnUpdate.appendChild(btnUpdateTxt);
    btn.appendChild(btnText)
    li.appendChild(taskText)
    li.appendChild(btn)
    li.appendChild(btnUpdate)

    allTasksUl.appendChild(li);

}

function deleteListItem(btnElement){
    console.log(btnElement.parentNode.id)
    let docId = btnElement.parentNode.id
    let li = btnElement.parentNode

    db.collection("taskList").doc(docId).delete()
    .then(()=>{
        // let ul = btnElement.parentNode.parentNode
        // ul.removeChild(li)
        // // console.log(li)
    });
}



function removingListDataRealTime(docId){
    // db.collection("taskList").doc(docId).remove()
    let li = document.getElementById(docId);
    li.remove()
}




function updateRealTimeData(updatelement){
    var liText = updatelement.parentNode.firstChild
    var liID = updatelement.parentNode.id
    console.log(liText, liID)


    db.collection("taskList").doc(liID).update({"item": liText}); //promise
}



function updateLiOnDom(docId){
    console.log("HELLO FROM UPDATE FUNCTION")
}

























var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000,
    regions: ["west_coast", "norcal"]
});
citiesRef.doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    capital: false,
    population: 3900000,
    regions: ["west_coast", "socal"]
});
citiesRef.doc("DC").set({
    name: "Washington, D.C.",
    state: null,
    country: "USA",
    capital: true,
    population: 680000,
    regions: ["east_coast"]
});
citiesRef.doc("TOK").set({
    name: "Tokyo",
    state: null,
    country: "Japan",
    capital: true,
    population: 9000000,
    regions: ["kanto", "honshu"]
});
citiesRef.doc("BJ").set({
    name: "Beijing",
    state: null,
    country: "China",
    capital: true,
    population: 21500000,
    regions: ["jingjinji", "hebei"]
});