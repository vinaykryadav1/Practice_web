let currentQ=""

function loadQ(id,text){
    currentQ=id
    document.getElementById("qtext").innerText=text
    document.getElementById("answerText").innerText=""
    document.getElementById("pyout").innerText = ""
}

fetch("/get_tables")
.then(r=>r.json())
.then(data=>{
    let div=document.getElementById("tables")
    data.forEach(t=>{
        div.innerHTML += `<div class="titem" onclick="showSchema('${t}')">${t}</div>`
    })
})

function runSQL(){
    let q=document.getElementById("query").value

    fetch("/run_sql",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({query:q})
    })
    .then(r=>r.json())
    .then(res=>{
        let table=document.getElementById("out")
        table.innerHTML=""

        if(res.error){
            table.innerHTML="<tr><td>"+res.error+"</td></tr>"
            return
        }

        let head="<tr>"
        res.cols.forEach(c=> head+=`<th>${c}</th>`)
        head+="</tr>"
        table.innerHTML+=head

        res.data.forEach(row=>{
            let r="<tr>"
            row.forEach(v=> r+=`<td>${v}</td>`)
            r+="</tr>"
            table.innerHTML+=r
        })
    })
}

function runPython(){
    fetch("/run_python",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            code:document.getElementById("pycode").value
        })
    })
    .then(r=>r.json())
    .then(res=>{
        document.getElementById("pyout").innerText =
            (res.output || "") + (res.error || "")
    })
}


function reveal(){
    fetch("/solution/sql/"+currentQ)
    .then(r=>r.json())
    .then(res=>{
        document.getElementById("answerText").innerText=res.answer
    })
}
/* PYTHON */
function revealPython(){
    fetch("/solution/python/"+currentQ)
    .then(r=>r.json())
    .then(res=>{
        document.getElementById("answerText").innerText=res.answer
    })
}

/* POWER BI */
function revealPowerBI(){
    fetch("/solution/powerbi/"+currentQ)
    .then(r=>r.json())
    .then(res=>{
        document.getElementById("answerText").innerText=res.answer
    })
}

/* INTERVIEW */
function revealInterView(){
    fetch("/solution/interview/"+currentQ)
    .then(r=>r.json())
    .then(res=>{
        document.getElementById("answerText").innerText=res.answer
    })
}