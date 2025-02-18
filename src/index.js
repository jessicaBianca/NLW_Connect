/*const mensagem = (nome) => {
    return alert("Seja bem-vindo(a) "+nome)
}*/

//mensagem("Jessica")

const app = document.getElementById("app")

const formAction = ()=>{
    const form = document.getElementById("form")
    
    //quando acontece um evento ele bloqueia o submit que é o modo default
    form.onsubmit = (event)=>{

        //evita o padrão de submit
        event.preventDefault()
        alert("Bloqueio do evento")
    }
}


const startApp = ()=>{

    const content =
        `<form id="form">
        <input type="email" name="email" id="email" placeholder="email@email.com"/>
        <input type="text" name="phone" id="email" placeholder="(xx) 90000-0000"/>
        <button id="btn_confirmar">Confirmar</button>
        </form>`

    app.innerHTML = content    
    formAction()
}

startApp()