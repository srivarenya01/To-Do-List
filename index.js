// Function to set element active
function setButtonActive(ind){
    var homebtn = document.getElementsByClassName("home-btn");
    if(ind===1){
        a = homebtn[1];
        b = homebtn[0];
        document.getElementById("selecttask").classList.remove("show");
        document.getElementById("selecttask").classList.add("hide");
        document.getElementsByClassName("submit-btn")[0].innerHTML =  "Add Task";
        document.getElementsByClassName("submit-btn")[0].value =  "add";
    }else{
        a = homebtn[0];
        b = homebtn[1];
        document.getElementById("selecttask").classList.add("show");
        document.getElementById("selecttask").classList.remove("hide");
        document.getElementsByClassName("submit-btn")[0].innerHTML =  "Update Task";
        document.getElementsByClassName("submit-btn")[0].value = "upd";
    }
    a.classList.add("active-btn");
    b.classList.remove("active-btn");
}

var lists = []

let btn = document.getElementById("submitBtn");
let selec = document.getElementsByTagName("select")[0];
btn.addEventListener("click", event=>{
    if(btn.value == 'add'){
        taskcard();
        update();
        optionchange();
    }else{
        if(selec.value != -1){
            changecard(selec.value);
            update();
            optionchange();
        }
    }
    document.forms[0].elements["task-name"].value = "";
    document.forms[0].elements["task-description"].value = "";
    document.forms[0].elements["task-description"].style.height = "70px";
})

function changecard(ind){
    lists[ind].childNodes[0].childNodes[0].childNodes[0].innerHTML = document.forms[0].elements["task-name"].value;
    lists[ind].childNodes[0].childNodes[1].childNodes[0].innerHTML = document.forms[0].elements["task-description"].value;
}

selec.addEventListener("click", ()=>{
    selec.addEventListener("change", ()=>{
        ind = selec.value;
        if(ind != -1){
            nameopt = lists[ind].childNodes[0].childNodes[0].childNodes[0].innerHTML;
            descopt = lists[ind].childNodes[0].childNodes[1].childNodes[0].innerHTML;
        }else{
            nameopt = "";
            descopt = "";
        }
        document.forms[0].elements["task-name"].value = nameopt;
        document.forms[0].elements["task-description"].value = descopt;
    })
})

function optionchange(){
    var sel = document.getElementById("updatetask");
    sel.innerHTML = "";
    const newopt = document.createElement("option");
    newopt.value = -1;
    newopt.innerHTML = "--- select ---"
    sel.appendChild(newopt);
    for(var i=0;i<lists.length;i++){
        const newopt = document.createElement("option");
        newopt.value = i;
        newopt.innerHTML = lists[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        sel.appendChild(newopt);
    }
}

function update(){
    const parent = document.getElementsByClassName("row")[0];
    parent.innerHTML = "";
    for(var i=0;i<lists.length;i++){
        lists[i].id = i;
        parent.appendChild(lists[i]);
    }
}

function taskcard(){
    const name = document.forms[0].elements["task-name"].value;
    const desc = document.forms[0].elements["task-description"].value;

    if(name != "" && desc != ""){
        const textin1 = document.createElement("div");
        textin1.classList.add("innertext");
        textin1.innerHTML = name;
        const textin2 = document.createElement("div");
        textin2.classList.add("innertext");
        textin2.innerHTML = desc;

        const newcard = document.createElement("div");
        newcard.classList.add("flip-card");
        newcard.classList.add("col-lg-3");
        newcard.classList.add("col-md-6");
        newcard.classList.add("col-sm-12");
        newcard.classList.add("col-12");
        
    
        const cardinner = document.createElement("div");
        cardinner.classList.add("flip-card-inner");
    
        const cardfront = document.createElement("div");
        cardfront.classList.add("flip-card-front");
        cardfront.appendChild(textin1);
    
        const cardback = document.createElement("div");
        cardback.classList.add("flip-card-back");
        cardback.appendChild(textin2);
    
        cardinner.appendChild(cardfront);
        cardinner.appendChild(cardback);

        newcard.appendChild(cardinner);
        lists.push(newcard);
    }
}

// Script to load at start of the page
$("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
});

setButtonActive(1);