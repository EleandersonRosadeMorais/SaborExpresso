async function carregarSobrepor() {
    const pegarCabecalho = await fetch("./../sobrepor/cabecalho.html");
    const conteudoCabecalho = await pegarCabecalho.text();
    document.getElementById("cabecalho-caixa").innerHTML = conteudoCabecalho;
    
    const pegarRodape = await fetch("./../sobrepor/rodape.html");
    const conteudoRodape = await pegarRodape.text();
    document.getElementById('rodape-caixa').innerHTML = conteudoRodape;
}
carregarSobrepor();