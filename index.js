function afterready(){
    var lists = []

    let btn = document.getElementById("submitBtn");
    let selec = document.getElementsByTagName("select")[0];

    function updateall(){
        update();
        optionchange();
    }

    function changecard(ind){
        lists[ind].childNodes[0].childNodes[0].childNodes[0].innerHTML = document.forms[0].elements["task-name"].value;
        lists[ind].childNodes[0].childNodes[1].childNodes[0].innerHTML = document.forms[0].elements["task-description"].value;
    }

    function changetask(ind){
        changecard(ind);
        updateall();
    }

    function update(){
        
        const parent = document.getElementsByClassName("row")[0];
        parent.innerHTML = "";
        for(var i=0;i<lists.length;i++){
            lists[i].id = i;
            lists[i].childNodes[1].childNodes[0].id = "icon0"+String(i);
            parent.appendChild(lists[i]);
        }
    }

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

    function changearea(ind){
        if(ind != -1){
            nameopt = lists[ind].childNodes[0].childNodes[0].childNodes[0].innerHTML;
            descopt = lists[ind].childNodes[0].childNodes[1].childNodes[0].innerHTML;
        }else{
            nameopt = "";
            descopt = "";
        }
        document.forms[0].elements["task-name"].value = nameopt;
        document.forms[0].elements["task-description"].value = descopt;
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

            const icon0 = document.createElement("i");
            icon0.classList.add("fa");
            icon0.classList.add("fa-arrow-left");
            const icon1 = document.createElement("i");
            icon1.classList.add("fa");
            icon1.classList.add("fa-pencil");
            const icon2 = document.createElement("i");
            icon2.classList.add("fa");
            icon2.classList.add("fa-trash");
            const icon3 = document.createElement("i");
            icon3.classList.add("fa");
            icon3.classList.add("fa-arrow-right");
            
            icon0.addEventListener("click", ()=>{
                let clickediconid = icon0.id.slice(5);
                if(clickediconid != "0"){
                    let l = lists[clickediconid].id;
                    let n = lists[clickediconid-1].id;

                    lists[clickediconid].id = "aid";
                    lists[clickediconid-1].id = "bid";

                    let m = lists[clickediconid];
                    lists[clickediconid] = lists[clickediconid-1];
                    lists[clickediconid-1] = m;

                    lists[clickediconid].id = n;
                    lists[clickediconid-1].id = l;

                    updateall();
                }
            })

            icon1.addEventListener("click", ()=>{
                let clickediconid = icon0.id.slice(5);
                let selecttask = document.getElementsByTagName("select")[0];
                setButtonActive(0);
                selecttask.value = clickediconid;
                $("#task-name").removeAttr("disabled");
                $("#task-description").removeAttr("disabled");
                $("#task-name").css("cursor", "text");
                $("#task-description").css("cursor", "text");
                changearea(clickediconid);
                window.scrollTo(0,0);

            })

            icon2.addEventListener("click", ()=>{
                let clickediconid = icon0.id.slice(5);
                lists.splice(clickediconid,1);
                updateall();
            })

            icon3.addEventListener("click", ()=>{
                let clickediconid = Number(icon0.id.slice(5));
                if(clickediconid != lists.length-1){
                    let l = lists[clickediconid].id;
                    let n = lists[clickediconid+1].id;

                    lists[clickediconid].id = "aid";
                    lists[clickediconid+1].id = "bid";

                    let m = lists[clickediconid];
                    lists[clickediconid] = lists[clickediconid+1];
                    lists[clickediconid+1] = m;

                    lists[clickediconid].id = n;
                    lists[clickediconid+1].id = l;

                    updateall();
                }
            })
            
            const optcard = document.createElement("div");
            optcard.classList.add("optcard");
            optcard.appendChild(icon0);
            optcard.appendChild(icon1);
            optcard.appendChild(icon2);
            optcard.appendChild(icon3);

            
            newcard.appendChild(cardinner);
            newcard.appendChild(optcard);
            lists.push(newcard);
        }
    }

    function changecolors(i){
        nameopt = document.forms[0].elements["task-name"].value;
        descopt = document.forms[0].elements["task-description"].value;
        let k = 0;
        if(nameopt != ""){
            $("#task-name").removeClass("notfilled");
        }else{
            $("#task-name").addClass("notfilled");
            k++;
        }
        if(descopt != ""){
            $("#task-description").removeClass("notfilled");
        }else{
            $("#task-description").addClass("notfilled");
            k++;
        }
        if(i === 0){
            btn.removeEventListener("mouseleave", mouseleft);
        }else{
            btn.addEventListener("mouseleave", mouseleft);
        }
        return k;
    };

    function submitted(){
        let f = changecolors(0);
        if(f === 0){
            if(btn.value == 'add'){
                taskcard();
                updateall();
            }else{
                if(selec.value != -1){
                    changetask(selec.value);
                }
            }
            document.forms[0].elements["task-name"].value = "";
            document.forms[0].elements["task-description"].value = "";
            document.forms[0].elements["task-description"].style.height = "70px";
        }
    }

    function mouseleft(){
        $("#task-name").removeClass("notfilled");
        $("#task-description").removeClass("notfilled");
    }

    function Selection(i){
        if(i == 0){
            document.getElementById("task-name").disabled = "disabled";
            document.getElementById("task-name").value = "";
            document.getElementById("task-name").style.cursor = "not-allowed";
            document.getElementById("task-description").disabled = "disabled";
            document.getElementById("task-description").value = "";
            document.getElementById("task-description").style.cursor = "not-allowed";
        }else{
            document.getElementById("task-name").disabled = "";
            document.getElementById("task-name").style.cursor = "text";
            document.getElementById("task-description").disabled = "";
            document.getElementById("task-description").style.cursor = "text";
        }
    }

    btn.addEventListener("click",()=>{
        submitted();
    });
    
    btn.addEventListener("enter",()=>{
        submitted();
    });
    

    btn.addEventListener("mouseover", ()=>{
        nameopt = document.forms[0].elements["task-name"].value;
        descopt = document.forms[0].elements["task-description"].value;
        if(nameopt!="" && descopt!=""){
            btn.style.cursor = "pointer";
        }else{
            changecolors(1);
            btn.style.cursor = "not-allowed";
        }
    });

    selec.addEventListener("click", ()=>{
        selec.addEventListener("change", ()=>{
            ind = selec.value;
            if(ind == -1){
                Selection(0);
            }else{
                Selection(1);
                changearea(ind);
            }
        })
    })

    // Script to load at start of the page
    $("textarea").each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    }).on("input", function () {
        this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
    });

    let inputval = document.getElementsByClassName("inputarea");
    for(let i=0;i<inputval.length;i++){
        inputval[i].addEventListener("click", ()=>{
            if(inputval[i].childNodes[1].classList.contains("notfilled")){
                inputval[i].childNodes[1].classList.remove("notfilled");
            }
        })
    }

    setButtonActive(1);
}

$(document).ready(afterready);

function emptyall(){
    document.forms[0].elements["task-name"].value = "";
    document.forms[0].elements["task-description"].value = "";
}

function clearall(){
    let inputval = document.getElementsByClassName("inputarea");
    for(let i=0;i<inputval.length;i++){
        inputval[i].click();
    }
    emptyall();
}

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
        $("#task-name").removeAttr("disabled");
        $("#task-description").removeAttr("disabled");
        $("#task-name").css("cursor", "text");
        $("#task-description").css("cursor", "text");
    }else{
        a = homebtn[0];
        b = homebtn[1];
        document.getElementById("selecttask").classList.add("show");
        document.getElementById("selecttask").classList.remove("hide");
        document.getElementsByClassName("submit-btn")[0].innerHTML =  "Update Task";
        document.getElementsByClassName("submit-btn")[0].value = "upd";
        $("#task-name").attr("disabled", "disabled");
        $("#task-description").attr("disabled", "disabled");
        $("#task-name").css("cursor", "not-allowed");
        $("#task-description").css("cursor", "not-allowed");
    }
    a.classList.add("active-btn");
    b.classList.remove("active-btn");
    clearall();
}