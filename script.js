// MENU TOGGLE
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if(menuToggle && mainNav){
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });
}

// CARRINHO
const carrinho = [];

// ADICIONAR PRODUTO AO CARRINHO
function adicionarProduto(){
    const selectProduto = document.getElementById("produto");
    const produtoNome = selectProduto.options[selectProduto.selectedIndex].text.split(" - ")[0];
    const preco = Number(selectProduto.value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if(quantidade <= 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    carrinho.push({nome: produtoNome, preco, quantidade});

    mostrarCarrinho();
    calcularTotal();
}

// MOSTRAR CARRINHO
function mostrarCarrinho() {
    if(carrinho.length === 0){
        document.getElementById("carrinho").innerHTML = "<p>O carrinho está vazio.</p>";
        return;
    }

    let html = "<h4>Carrinho:</h4>";
    carrinho.forEach((item, index) => {
        html += `<p>${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>`;
    });
    document.getElementById("carrinho").innerHTML = html;
}

// CALCULAR TOTAL, DESCONTO, TROCO E PONTOS
function calcularTotal(){
    if(carrinho.length === 0){
        alert("Adicione algum produto ao carrinho primeiro!");
        return;
    }

    let total = 0;
    let desconto = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        if(item.quantidade >= 10){
            desconto += item.preco * item.quantidade * 0.1;
        }
    });

    let totalFinal = total - desconto;

    // Valor pago
    const pago = Number(document.getElementById("pago").value);
    let troco = pago - totalFinal;

    // Pontos de fidelidade (1 ponto = 1 real)
    let pontos = Math.floor(totalFinal);

    // Conversão para dólar (R$ 5,10 = $1)
    let totalDolar = (totalFinal / 5.1).toFixed(2);

    document.getElementById("resultado").innerHTML = `
        <p>Subtotal: R$ ${total.toFixed(2)}</p>
        <p>Desconto: R$ ${desconto.toFixed(2)}</p>
        <p><strong>Total: R$ ${totalFinal.toFixed(2)}</strong> (~$${totalDolar})</p>
        <p>Troco: R$ ${troco.toFixed(2)}</p>
        <p>Pontos de fidelidade: ${pontos}</p>`;
}

// LIMPAR CARRINHO
function limparCarrinho(){
    carrinho.length = 0;
    document.getElementById("carrinho").innerHTML = "<p>O carrinho está vazio.</p>";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("pago").value = 0;
    document.getElementById("quantidade").value = 1;
    document.getElementById("produto").selectedIndex = 0;
}
