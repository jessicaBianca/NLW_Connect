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
   /* app.innerHTML = `
        <input type="text" name="link" id="link" value="https://event.com?ref=${userData.ref}" disabled>

            <div id="status">
                <h4>
                    ${getTotalSubscribers(userData)}
                </h4>
                <p>
                    Inscrições Feitas
                </p>
            </div>`*/


            app.innerHTML = ` <main>
                <h3>Inscrição confirmada</h3>
                <p>Convide mais pessoas e concorra a prêmios!<br/> Compartilhe o link e acompanhe as inscrições:</p>

                <div class="input-group">
                    <label for="link">
                        <img src="link.svg" alt="Link icon">
                    </label>

                    <input type="text" name="link" id="link" value="https://event.com?ref=${userData.ref}" disabled>
                </div>
            </main>


            <section class="status">
                    <h4>
                    ${getTotalSubscribers(userData)}
                </h4>
                <p>Inscrições feitas</p>
            </section>`

            app.setAttribute('class', 'page-invite')
            updateImageLinks()

}

/*const updateImageLinks = ()=>{

    document.querySelectorAll('img').forEach((img)=>{
            img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${img.src}`
    })

}*/



  const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute("src"); 
      if (src && !src.startsWith("http")) {  
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
      }
    });
  };
  

const startApp = ()=>{
    app.innerHTML = ` 
            <main>
                <section class="about">
                    <div class="section-header">
                        <h2>
                            Sobre o evento
                        </h2>
                        <span class="badge">AO VIVO</span>
                    </div>

                    <p>Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                        <br/><br/>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito </p>
                </section>

                <section class="registration">
                    <h2>Inscrição</h2>
                    <form id="form">
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="email">
                                    <img src="mail.svg" alt="Email icon">
                                </label>
                                <input type="email" name="email" id="email" placeholder="E-mail">
                            </div>

                            <div class="input-group">
                                <label for="phone">
                                    <img src="phone.svg" alt="Phone icon">
                                </label>
                                <input type="text" name="phone" id="phone" placeholder="Telefone">
                            </div>
                        </div>


                        <button>Confirmar
                            <img src="arrow.svg" alt="Arrow right">
                        </button>
                    </form>
                </section>
            </main> `
    
    app.setAttribute('class', 'page-start')

    updateImageLinks()
    formAction()
}

startApp()

document.querySelector("header").onclick = () => startApp()
//document.getElementById("logo").onclick = () => startApp()