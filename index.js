// Function to set element active
function setButtonActive(ind){
    var homebtn = document.getElementsByClassName("home-btn");
    if(ind===1){
        a = homebtn[1];
        b = homebtn[0];
        document.getElementById("selecttask").classList.remove("show");
        document.getElementById("selecttask").classList.add("hide");
        document.getElementsByClassName("submit-btn")[0].value =  "Add Task";
    }else{
        a = homebtn[0];
        b = homebtn[1];
        document.getElementById("selecttask").classList.add("show");
        document.getElementById("selecttask").classList.remove("hide");
        document.getElementsByClassName("submit-btn")[0].value =  "Update Task";
    }
    a.classList.add("active-btn");
    b.classList.remove("active-btn");
}

// Script to load at start of the page
$("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
});

setButtonActive(1);