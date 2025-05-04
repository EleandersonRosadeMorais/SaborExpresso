import { auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"

const emailCadastroInput = document.getElementById("emailCadastrar");
const senhaCadastroInput = document.getElementById("senhaCadastrar");
const btnCadastro = document.getElementById("btnCadastrar");
const mensagemCadastro = document.getElementById("mensagemCadastrar");

async function cadastrarUsuario(email, senha) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        return userCredential;
    } catch (error) {
        console.error("Erro ao cadastrar: ", error.code, error.message);
        let mensagemErro = "Ocorreu um erro ao cadastrar, tente novamente";
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
        }
        throw { message: mensagemErro }
    }
}
if (btnCadastro) {
    btnCadastro.addEventListener("click", async function () {
        const email = emailCadastroInput.value;
        const senha = senhaCadastroInput.value;
        mensagemCadastro.textContent = "";
        console.log(email, senha);
        if (!email || !senha) {
            mensagemCadastro.textContent = "Por favor, preencha todos os campos";
            return;
        }
        try {
            const user = await cadastrarUsuario(email, senha);
            console.log("Usuário cadastro", user);
            mensagemCadastro.textContent = "Cadastro realizado com sucesso";
            setTimeout(function () {
                window.location.href = "./../html/logar.html"
            }, 3000);
        } catch (error) {
            mensagemCadastro.textContent = `Erro no cadastro: ${error.message}`;
        }
    });
}