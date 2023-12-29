//Adiciona os ouvintes dos dois botões iniciais
const botao_player = document.getElementById('button_player')
const botao_bot = document.getElementById('button_bot')
botao_player.addEventListener('click', function(){
    iniciar_game('player')
})
botao_bot.addEventListener('click', function(){
    iniciar_game('bot')
})

//Adiciona um ouvinte de click para cada div
let ouvinte_ativo = true; // Variavel que controla se os ouvintes estão ativos ou não
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const div = document.getElementById(`div${i}${j}`)
        div.addEventListener("click", function(){
            if (ouvinte_ativo) {
                clique(`div${i}${j}`)
            }
        })
        div.addEventListener("mouseenter", function(){
            if (ouvinte_ativo){
                mouse_entrou(`div${i}${j}`)
            }
        })
        div.addEventListener("mouseleave", function(){
            if (ouvinte_ativo){
                mouse_saiu(`div${i}${j}`)
            }
        })
    }
}


// Criando uma matriz do tabuleiro do jogo
let matriz = [
    ["00","01","02"],
    ["10","11","12"],
    ["20","21","22"]
    ]
    
// Define o Player atual
let atual = 'X'


// Modo do jogo
let modo_jogo = ''

function iniciar_game(tipo){
    const container_botoes = document.getElementById('container_botoes')
    const container_jogo = document.getElementById('container_jogo')
    const jogador_atual = document.getElementById('container_info')
    container_botoes.style.display = 'none'
    jogador_atual.style.display = 'flex'
    container_jogo.style.display = 'grid'
    modo = tipo
}

function clique(div){
    let div_selecionada = document.getElementById(div)
    if (div_selecionada.innerHTML != 'X' && div_selecionada.innerHTML != 'O'){
        div_selecionada.innerHTML = atual
        atualizar_matriz(div)
        if (verificar_se_venceu(matriz,atual)){
            alterar_jogador()
            if(modo_jogo === 'bot'){
                desativar_ouvinte()
                setTimeout(function(){
                    jogada_bot()
                },2000)
            }
        }else{
            desativar_ouvinte()
            let container_info = document.getElementById('container_info')
            let botao = document.createElement('button')
            botao.innerHTML = 'Reiniciar'
            botao.addEventListener('click',function(){
                reiniciar(botao)
            })
            setTimeout(function(){
                container_info.appendChild(botao)
            },3000)
        }
    }
}


function jogada_bot(){
    let jogadas_possiveis = []
    for (let lista of matriz){
        for (let item of lista) {
            if (item != 'X' && item != 'O'){
                jogadas_possiveis.push(item)
            }
        }
    }
    let jogada = jogadas_possiveis[Math.floor(Math.random() * jogadas_possiveis.length)]
    let div_escolhida = document.getElementById(`div${jogada}`)
    atualizar_matriz(`div${jogada}`)
    div_escolhida.innerHTML = atual
    alterar_jogador()
    ativar_ouvinte()
}

function alterar_jogador(){
    let jogador_atual = document.getElementById('jogador_atual')
    if (atual === 'X'){
        atual = 'O'
        jogador_atual.innerHTML = 'Jogando: <strong>O</strong>'
    }
    else{
        atual = 'X'
        jogador_atual.innerHTML = `Jogando: <strong>X</strong>` 
    }
}

function verifica_empate(matriz){
    for (let lista of matriz){
        for (let item of lista) {
            if (item != 'X' && item != 'O') {
                return false
            }
        }
    }
    return true
}

function verificar_se_venceu(matriz,atual) {
    let linha1 = matriz[0]
    let linha2 = matriz[1]
    let linha3 = matriz[2]
    let msg = document.getElementById('jogador_atual')

    if(
        linha1[0] === atual && linha2[0] === atual && linha3[0] === atual||
        linha1[1] === atual && linha2[1] === atual && linha3[1] === atual||
        linha1[2] === atual && linha2[2] === atual && linha3[2] === atual
    ){
        msg.innerHTML = `Jogador <strong>${atual}</strong> venceu`
        return false
    }
    else if(
        linha1[0] === atual && linha1[1] === atual && linha1[2] === atual||
        linha2[0] === atual && linha2[1] === atual && linha2[2] === atual||
        linha3[0] === atual && linha3[1] === atual && linha3[2] === atual
    ){
        msg.innerHTML = `Jogador <strong>${atual}</strong> venceu`
        return false
    }
    else if(
        linha1[0] === atual && linha2[1] === atual && linha3[2] === atual||
        linha1[2] === atual && linha2[1] === atual && linha3[0] === atual
    ){
        msg.innerHTML = `Jogador <strong>${atual}</strong> venceu`
        return false
    }
    else if(
        verifica_empate(matriz)
    ){
        msg.innerHTML = `<strong>Empate</strong>`
        return false
    }
    return true
}

function mouse_entrou(div){
    let div_selecionada = document.getElementById(div)
    if (div_selecionada.innerHTML === ''){
        div_selecionada.innerHTML = `<span>${atual}</span>`
    }
}

function mouse_saiu(div){
    let div_selecionada = document.getElementById(div)
    if (div_selecionada.innerHTML !== 'X' && div_selecionada.innerHTML !== 'O'){
        div_selecionada.innerHTML = ''
    }
}

function atualizar_matriz(div_escolhida){
    switch (div_escolhida
        ){
        case "div00":
            matriz[0][0] = atual
            break
        case "div01":
            matriz[0][1] = atual
            break
        case "div02":
            matriz[0][2] = atual
            break
        case "div10":
            matriz[1][0] = atual
            break
        case "div11":
            matriz[1][1] = atual
            break
        case "div12":
            matriz[1][2] = atual
            break
        case "div20":
            matriz[2][0] = atual
            break
        case "div21":
            matriz[2][1] = atual
            break
        case "div22":
            matriz[2][2] = atual
            break        
    }
}

function desativar_ouvinte() {
    ouvinte_ativo = false;
}

// Função para ativar o ouvinte
function ativar_ouvinte() {
    ouvinte_ativo = true;
}

function reiniciar(botao){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const div = document.getElementById(`div${i}${j}`)
            div.innerHTML = ''
        }
    }
    matriz = [["00","01","02"],["10","11","12"],["20","21","22"]]
    botao.remove()
    alterar_jogador()
    ativar_ouvinte()
}