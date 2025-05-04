import { db } from "./firebaseConfig.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const cardapio = [
    {
        nome: "Pizza Margherita",
        descricao: "Clássica com tomate e manjericão",
        preco: 32.90,
        quantidade: 1
    },
    {
        nome: "Hambúrguer Artesanal",
        descricao: "Pão brioche com carne Angus",
        preco: 25.50,
        quantidade: 2
    },
    {
        nome: "Salada Caesar",
        descricao: "Alface, frango grelhado e molho caesar",
        preco: 19.90,
        quantidade: 1
    },
    {
        nome: "Lasanha Bolonhesa",
        descricao: "Tradicional com carne e queijo",
        preco: 29.00,
        quantidade: 1
    },
    {
        nome: "Strogonoff de Frango",
        descricao: "Acompanhado de arroz e batata palha",
        preco: 27.50,
        quantidade: 2
    },
    {
        nome: "Panqueca de Carne",
        descricao: "Panqueca recheada com carne e molho vermelho",
        preco: 21.90,
        quantidade: 2
    },
    {
        nome: "Risoto de Camarão",
        descricao: "Cremoso com toque de limão",
        preco: 36.00,
        quantidade: 1
    },
    {
        nome: "Feijoada Completa",
        descricao: "Feijão preto com carnes e acompanhamentos",
        preco: 31.50,
        quantidade: 2
    },
    {
        nome: "Alaminuta",
        descricao: "Feijão, arroz, frango com verduras",
        preco: 42.00,
        quantidade: 1
    }
];

async function verificarDuplicacao(nomeDoItem) {
    const colecao = collection(db, "pedidos");
    const consulta = query(colecao, where("nome", "==", nomeDoItem));
    const resultadoConsulta = await getDocs(consulta);
    return !resultadoConsulta.empty;
}

async function enviarPedido(indice) {
    const nomeItem = cardapio[indice].nome;
    const existe = await verificarDuplicacao(nomeItem);

    if (existe) {
        Swal.fire({
            icon: 'error',
            title: 'Pedido já adicionado!',
            text: 'Este item já está em Meus Pedidos.',
        });
        return;
    }

    try {
        const ref = await addDoc(collection(db, "pedidos"), cardapio[indice]);
        console.log("ID do documento", ref.id);
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: `Pedido ${cardapio[indice].nome} adicionado`
        });
    } catch (error) {
        console.log("Erro ao adicionar um pedido", error)
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Ocorreu um erro ao adicionar o seu pedido, tente novamente!`
        });
    }
}

document.getElementById("selecionar1").addEventListener("click", function () {
    enviarPedido(0);
});

document.getElementById("selecionar2").addEventListener("click", function () {
    enviarPedido(1);
});

document.getElementById("selecionar3").addEventListener("click", function () {
    enviarPedido(2);
});

document.getElementById("selecionar4").addEventListener("click", function () {
    enviarPedido(3);
});

document.getElementById("selecionar5").addEventListener("click", function () {
    enviarPedido(4);
});

document.getElementById("selecionar6").addEventListener("click", function () {
    enviarPedido(5);
});

document.getElementById("selecionar7").addEventListener("click", function () {
    enviarPedido(6);
});

document.getElementById("selecionar8").addEventListener("click", function () {
    enviarPedido(7);
});

document.getElementById("selecionar9").addEventListener("click", function () {
    enviarPedido(8);
});

