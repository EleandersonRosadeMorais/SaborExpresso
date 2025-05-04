import { db } from './firebaseConfig.js';
import { collection, getDocs, deleteDoc, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// R - Read = Ler
async function buscarPedidos() {
    const colecao = await getDocs(collection(db, "teste"));
    const pedidos = [];
    for (const doc of colecao.docs) {
        pedidos.push({ id: doc.id, ...doc.data() });
    }
    return pedidos;
}
const listarPedidosCaixa = document.getElementById("listar-pedidos-caixa");

async function carregarPedidos() {
    listarPedidosCaixa.innerHTML = "<p> Carregando pedidos...</p>";
    try {
        const pedidos = await buscarPedidos();
        console.log(pedidos)
        renderizarPedidos(pedidos);
    } catch (erro) {
        console.log("Erro ao carregar a lista de pedidos: ", erro);
        listarPedidosCaixa.innerHTML = "<p> Erro ao carregar a lista de pedidos</p>";
    }
}

function renderizarPedidos(pedidos) {
    listarPedidosCaixa.innerHTML = "";
    let pedidoTotal = 0;
    if (pedidos.length === 0) {
        listarPedidosCaixa.innerHTML = "<p> Nenhum pedido foi cadastrado ainda</p>";
        return;
    }
    for (let pedido of pedidos) {
        function precoTotal() {
            return pedido.preco * pedido.quantidade;
        }
        function converterReal(valor) {
            return `R$ ${valor.toFixed(2).replace('.', ',')}`;
        }
        const pedidoCaixa = document.createElement("div");
        pedidoCaixa.classList.add("pedido-renderizar");
        pedidoCaixa.innerHTML = `
            <strong> Nome: </strong> ${pedido.nome} <br>
            <strong> Descrição: </strong> ${pedido.descricao} <br>
            <strong> Preço: </strong> ${converterReal(pedido.preco)} <br>
            <strong> Quantidade: </strong> ${pedido.quantidade} <br>
             <strong> Preço total: </strong> ${converterReal(precoTotal())} <br>
            <button class="deletar-botao" data-id="${pedido.id}"> Deletar </button>
            <button class="editar-botao" data-id="${pedido.id}"> Editar </button> <br>
            <button class="aumentar-quantidade" data-id="${pedido.id}"> Aumentar 1 </button>
            <button class="diminuir-quantidade" data-id="${pedido.id}"> Diminuir 1 </button>
        `;

        pedidoTotal += precoTotal();
        listarPedidosCaixa.appendChild(pedidoCaixa);
        let precoTotalizado = pedidoTotal + 9;
        const totalDiv = document.getElementById("finalizar-caixa");
        totalDiv.innerHTML =
            `
            <label>Selecionar endereço:</label>
            <label>
                <input type="radio" name="opcao">
                Endereço padrão
            </label>

            <label>
                <input type="radio" name="opcao">
                Adicionar Endereço
            </label><br>
            <p><strong>Pedidos:</strong> ${converterReal(pedidoTotal)}</p>
            <p><strong>Frete:</strong> R$ 9,00</p>
            <p><strong>Preço total da entrega:</strong> ${converterReal(precoTotalizado)}</p>
            <button id="finalizar-botao">Finalizar Pedido</button>
    `
    }
    adicionarAcaoClique();
}













// D - Delete = Deletar
async function deletarPedido(numeroPedido) {
    try {
        const deletarPedido = doc(db, "teste", numeroPedido);
        await deleteDoc(deletarPedido);
        console.log("Pedido com ID" + numeroPedido + "foi excluído.");
        return true;
    } catch (erro) {
        console.log("Erro ao excluir o pedido", erro);
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Ocorreu um erro ao deletar um pedido. Tente novamente!`
        });
        return false;
    }
}

async function executarClique(clique) {
    const botaoDeletar = clique.target.closest(".deletar-botao");
    if (botaoDeletar) {
        document.getElementById("editar-pedidos-caixa").style.display = 'none';
        const confirmar = await Swal.fire({
            icon: "warning",
            title: "Você tem certeza?",
            text: "Você deseja realmente deletar este pedido?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não"
        });

        if (confirmar.isConfirmed) {
            const numeroPedido = botaoDeletar.dataset.id;
            const deletarComSucesso = await deletarPedido(numeroPedido);
            if (deletarComSucesso) {
                carregarPedidos();
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "Pedido deletado com sucesso!"
                }).then(function () {
                    window.location.reload();
                });
            }
        } else {
            Swal.fire({
                icon: "info",
                title: "Cancelado",
                text: "Deletamento interrompido"
            });
        }
    }

    document.addEventListener("click", async function (clique) {
        const botaoDiminuir = clique.target.closest(".diminuir-quantidade");
        if (botaoDiminuir) {
            const pedidoId = botaoDiminuir.dataset.id;
            const pedido = await buscarPedidoPorNumero(pedidoId);
            if (pedido) {
                let novaQuantidade = pedido.quantidade - 1;
                if (novaQuantidade < 1) {{novaQuantidade = 1; }}
                await atualizarQuantidade(pedidoId, novaQuantidade);
            }
        }
    
        const botaoAdicionar = clique.target.closest(".aumentar-quantidade");
        if (botaoAdicionar) {
            const pedidoId = botaoAdicionar.dataset.id;
            const pedido = await buscarPedidoPorNumero(pedidoId);
            if (pedido) {
                let novaQuantidade = pedido.quantidade + 1;
                await atualizarQuantidade(pedidoId, novaQuantidade);
            }
        }
    });
    
    async function atualizarQuantidade(pedidoId, novaQuantidade) {
        try {
            const pedidoDoc = doc(db, "teste", pedidoId);
            const pedidoAtual = await getDoc(pedidoDoc);
            if (!pedidoAtual.exists()) {
                console.log("Pedido não encontrado");
                return;
            }
    
            const dadosAtualizados = {
                ...pedidoAtual.data(),
                quantidade: novaQuantidade
            };
    
            await setDoc(pedidoDoc, dadosAtualizados);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: `Quantidade atualizada para ${novaQuantidade} com sucesso!`
            });
    
            carregarPedidos();  // Atualiza a lista de pedidos
        } catch (erro) {
            console.log("Erro ao atualizar quantidade:", erro);
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: "Ocorreu um erro ao atualizar a quantidade."
            });
        }
    }
    

    const botaoEditar = clique.target.closest(".editar-botao");
    if (botaoEditar) {
        const numeroPedido = botaoEditar.dataset.id;
        const pedido = await buscarPedidoPorNumero(numeroPedido);
        const editar = getValoresEditar();
        editar.editarQuantidade.value = pedido.quantidade;
        editar.editarId.value = pedido.id;
        editar.editarPedidos.style.display = "block";
    }

}




// U - Update - Editar
function getValoresEditar() {
    return {
        editarQuantidade: document.getElementById("editar-quantidade"),
        editarId: document.getElementById("editar-id"),
        editarPedidos: document.getElementById("editar-pedidos-caixa")
    };
}

async function buscarPedidoPorNumero(id) {
    try {
        const pedidoDoc = doc(db, "teste", id);
        const coletaPedido = await getDoc(pedidoDoc);
        if (coletaPedido.exists()) {
            return {
                id: coletaPedido.id, ...coletaPedido.data()
            }
        } else {
            console.log("Pedido não encontrado com o ID:", id)
        }
    } catch (erro) {
        console.log("Erro ao buscar pedido por ID: ", erro)
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Ocorreu um erro ao buscar o pedido. Tente novamente!`
        });
        return null;
    }
}

document.getElementById("salvar-botao").addEventListener("click", async function () {
    const edicao = getValoresEditar();
    const id = edicao.editarId.value;
    const novaQuantidade = parseInt(edicao.editarQuantidade.value);

    try {
        const pedidoDoc = await getDoc(doc(db, "teste", id));
        if (!pedidoDoc.exists()) {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Pedido não encontrado.'
            });
            return;
        }

        const pedidoAtual = pedidoDoc.data();
        const dadosAtualizados = {
            ...pedidoAtual,
            quantidade: novaQuantidade
        };

        await setDoc(doc(db, "teste", id), dadosAtualizados);
        Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: `Quantidade atualizada com sucesso!`
        });

        edicao.editarPedidos.style.display = "none";
        carregarPedidos();
    } catch (erro) {
        console.log("Erro ao salvar a edição", erro);
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Erro ao atualizar a quantidade"
        });
    }
});

document.getElementById("cancelar-botao").addEventListener("click", function () {
    document.getElementById("editar-pedidos-caixa").style.display = "none";
});


function adicionarAcaoClique() {
    listarPedidosCaixa.addEventListener("click", executarClique);

}
document.addEventListener("DOMContentLoaded", carregarPedidos);

// Finalizar Pedido
async function finalizarPedidos() {
    try {
        const colecao = await getDocs(collection(db, "teste"));
        if (colecao.empty) {
            Swal.fire({
                icon: "info",
                title: "Sem pedidos!",
                text: "Não há pedidos para finalizar."
            });
            return;
        }
        for (const pedido of colecao.docs) {
            await deleteDoc(doc(db, "teste", pedido.id));
        }
        console.log("Banco de dados apagado com sucesso!");
        Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Você finalizou seu pedido, agora só esperar chegar"
        }).then(function () {
            window.location.reload();
        });
    } catch (erro) {
        console.error("Erro ao finalizar o pedido: ", erro);
        Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Ocorreu um erro ao finalizar o pedido. Tente novamente."
        });
    }
}
document.addEventListener("click", async function (clique) {
    const botaoFinalizar = clique.target.closest('#finalizar-botao');
    if (botaoFinalizar) {
        const colecao = await getDocs(collection(db, "teste"));
        if (colecao.empty) {
            Swal.fire({
                icon: "info",
                title: "Nenhum pedido!",
                text: "Não há pedidos para finalizar."
            });
            return;
        }
        const confirmar = await Swal.fire({
            icon: "warning",
            title: "Finalizar pedido?",
            text: "Isso irá enviar seus pedidos. Deseja continuar?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não"
        });
        if (confirmar.isConfirmed) {
            await finalizarPedidos();
        }
    }
});