import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"

const emailLoginInput = document.getElementById("emailLogar");
const senhaLoginInput = document.getElementById("senhaLogar");
const btnLogin = document.getElementById("btnLogar");
const mensagemLogin = document.getElementById("mensagemLogar");

async function logarUsuario(email, senha) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao logar: ", error.code, error.message);
        let mensagemErro = "Ocorreu um erro ao logar, tente novamente";
        switch (error.code) {
            case "auth/user-not-found":
                mensagemErro = "Usuário não encontrado";
                break;
            case "auth/wrong-password":
                mensagemErro = "Senha incorreta";
                break;
            case "auth/invalid-email":
                mensagemErro = "Formato de email inválido";
                break;
            default:
                mensagemErro = "Erro desconhecido: " + error.message;
                break;
        }
        throw { message: mensagemErro };
    }
}
if (btnLogin) {
    btnLogin.addEventListener("click", async function () {
        const email = emailLoginInput.value;
        const senha = senhaLoginInput.value;
        mensagemLogin.textContent = "";
        console.log(email, senha);
        if (!email || !senha) {
            mensagemLogin.textContent = "Por favor, preencha todos os campos";
            return;
        }
        try {
            const user = await logarUsuario(email, senha);
            console.log("Usuário login", user);
            mensagemLogin.textContent = "Login realizado com sucesso";
            setTimeout(function () {
                window.location.href = "./../html/cardapio.html"
            }, 3000);
        } catch (error) {
            mensagemLogin.textContent = `Erro no login: ${error.message}`;
        }
    });
}

document.getElementById("btn-logar").addEventListener("click", function () {
    try {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Não dá para ter tudo ;(`,
            background: '#FFCC00',
            color: '#eb7171', 
            confirmButtonColor: '#eb7171', 
            confirmButtonText: 'Ok'
        })
    }
    catch (error) {
        console.log("Ocorreu um erro!", error)
    }
});