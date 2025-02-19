const app = document.getElementById("app")

//como não vamos montar o banco de dados, vamos armazenar oq pegarmos em um array, objetos que eu captura serão jogamos no array 
const users = [
    {
        email: 'teste@teste.com',
        phone: '929173911',
        ref: 100,
        refBy: null
    },
    {
        email: 'teste2@teste2.com',
        phone: '929173911',
        ref: 101,
        refBy: 100
    },
    {
        email: 'teste3@teste3.com',
        phone: '929173911',
        ref: 102,
        refBy: 100
    }
]

//obter info do usuário
const getUser = (userData)=>{
    return users.find((user)=>{
        return user.email == userData.email
    })
}


const saverUser = (userData)=>{
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }

    users.push(newUser)
    console.log(users)
    return newUser

    /*
        ...userData 

        representa:

        email: userData.email,
        phone: userData.phone

    */
}

const formAction = ()=>{
    const form = document.getElementById("form")

    form.onsubmit = (event) =>{
        event.preventDefault()
       // alert("Envio bloqueado !")


        //captura de valores
        const formData = new FormData(form)

        //criação de objeto by name
        const userData = {
            email: formData.get('email'),
            phone: formData.get('telefone')
        }

        const user = getUser(userData)
        
        if(user){
            showInvite(user)
        }else{
            const newUser = saverUser(userData)
            showInvite(newUser)
          //  console.log("Usuário não encontrado !")
        }

    }
}


const getTotalSubscribers = (userData)=>{
    const subs = users.filter((user) =>{
        return user.refBy == userData.ref
    })

    return subs.length
}


const showInvite =(userData)=>{
    app.innerHTML = `
        <input type="text" name="link" id="link" value="https://event.com?ref=${userData.ref}" disabled>

            <div id="status">
                <h4>
                    ${getTotalSubscribers(userData)}
                </h4>
                <p>
                    Inscrições Feitas
                </p>
            </div>`
}

const startApp = ()=>{
    app.innerHTML = ` <form id="form">
                             <input type="email" name="email" id="email" placeholder="Email">
                             <input type="text" name="telefone" id="telefone" placeholder="Phone">
                             <button id="btn-enviar">Enviar</button>
                        </form>   `

    formAction()
}

startApp()

document.getElementById("logo").onclick = () => startApp()