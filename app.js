function iniciarJogo() {
    document.getElementById("botaoIniciar").style.display = "none";
    document.getElementById("botoes").style.display = "block";

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h2>Escolha uma opção abaixo para adicionar, remover ou sortear países:</h2>";

    let paises = [];
    atualizarListaPaises(paises);

    document.getElementById("botaoAdicionar").addEventListener("click", function() {
        const inputPais = document.getElementById("inputPais").value.trim();
        if (inputPais !== "") {
            paises.push(inputPais);
            atualizarListaPaises(paises);
            document.getElementById("inputPais").value = "";
        }
    });

    document.getElementById("botaoNao").addEventListener("click", function() {
        if (paises.length > 0) {
            resultadoDiv.innerHTML = "<h2>Clique no botão abaixo para sortear o próximo destino:</h2>";

            const botaoSortear = document.createElement("button");
            botaoSortear.textContent = "Sortear País";

            botaoSortear.addEventListener("click", function() {
                const paisAleatorio = paises[Math.floor(Math.random() * paises.length)];
                resultadoDiv.innerHTML = `<h3 id="paisSorteado">O país sorteado é: ${paisAleatorio}</h3>`;
            
                // Adiciona animação de destaque
                document.getElementById("paisSorteado").style.animation = "fadeIn 0.8s ease-in-out";
            
                // Efeito de confete
                confetti({
                    particleCount: 150,
                    spread: 90,
                    colors: ['#ff0', '#f00', '#0f0', '#00f'],
                    origin: { y: 0.6 }
                });
            });
            
            resultadoDiv.appendChild(botaoSortear);
        } else {
            resultadoDiv.innerHTML = "<p>Nenhum país na lista para sortear.</p>";
        }
    });

    document.getElementById("botaoRemover").addEventListener("click", function() {
        if (paises.length === 0) {
            alert("A lista está vazia. Não há nada para remover.");
        } else {
            const remover = prompt(`Lista de Países: ${paises.join(", ")}\nQual deseja remover?`);
            const index = paises.indexOf(remover);
            if (index !== -1) {
                paises.splice(index, 1);
                alert(`${remover} foi removido da sua lista.`);
                atualizarListaPaises(paises);
            } else {
                alert("País não encontrado na lista.");
            }
        }
    });
}

function atualizarListaPaises(paises) {
    const listaDiv = document.getElementById("lista");
    listaDiv.innerHTML = `
        <h2>Lista de Países:</h2>
        <ul>${paises.map(pais => `<li>${pais}</li>`).join("")}</ul>
    `;
}

document.getElementById("botaoIniciar").addEventListener("click", iniciarJogo);
