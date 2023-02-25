function cronometro() {

    const timer = document.querySelector('.timer-cronometro');

    // Variáveis Globais
    let segundos;
    let controle = true;
    let cronometroIntervalo;

    // Cria o tempo com base nos minutos recebido
    const cronometroTempo = (tempo) => {
        const data = new Date(tempo * 1000);
        return data.toLocaleTimeString('pt-br', {
            hour12: false,
            timeZone: 'UTC'
        });
    }


    // FUNCÕES //

    // Função cronometra o tempo quando chamada
    const cronometrar = () => {
        cronometroIntervalo = setInterval(() => {
            segundos++
            timer.innerHTML = cronometroTempo(segundos)
            salvarCronometro();
            return segundos
        }, 1000)
    }
    // Função que salva o tempo para ser recuperado quando a página for recarregada
    const salvarCronometro = () => {
        let tempo = segundos
        localStorage.setItem('tempoCronometro', JSON.stringify(tempo));
    }
    // Função adiciona o tempo recuperado no timer quando a página ser iniciada
    const adicionarCronometroSalvo = () => {
        const pegaTempo = localStorage.getItem('tempoCronometro');
        const tempoSalvoCronometro = JSON.parse(pegaTempo);
        if (!tempoSalvoCronometro) {
            segundos = 0
            timer.innerHTML = cronometroTempo(segundos);
        } else if (tempoSalvoCronometro > 0) {
            segundos = tempoSalvoCronometro
            timer.innerHTML = cronometroTempo(segundos);
            return;
        }
    }
    adicionarCronometroSalvo() // Chama a função quando inicia a página

    // Eventos de Click do mouse
    document.addEventListener('click', function (e) {
        let evento = e.target.className // Evento de click que recebe o elemento e sua classe; 

        // Ativa se for clicado no botão INICIAR
        if (evento === 'botao-iniciar-cronometro' && controle) {
            cronometrar()
            controle = false;
            timer.className = 'timer-cronometro'
        }
        // Ativa se for clicado no botão PAUSAR
        if (evento === 'botao-pausar-cronometro') {
            clearInterval(cronometroIntervalo)
            controle = true;
            timer.className = 'timer-cronometro-pausado'
        }
        // Ativa se for clicado no botão REINICIAR
        if (evento === 'resetar-cronometro') {
            segundos = 0
            clearInterval(cronometroIntervalo);
            timer.innerHTML = cronometroTempo(segundos);
            controle = true;
            timer.className = 'timer-cronometro-pausado';
            salvarCronometro()
        }
        // Ativa se for clicado no timer e então executa a tela cheia do elemento
        if (evento === 'timer-cronometro' || evento === 'timer-cronometro-pausado' || evento === 'timer-cronometro-telaCheia') {
            document.addEventListener('fullscreenchange', () => { //O evento fullscreenchange é disparado sempre que há uma mudança no estado de tela cheia (fullscreen) do documento. Ele é acionado quando um documento entra ou sai do modo de tela cheia
                if (!document.fullscreenElement) {
                    timer.title = 'Abrir tela cheia'
                    timer.className = 'timer-cronometro'
                }
            })

            if (!document.fullscreenElement) { // Ativa se a tela cheia não estiver ativa;
                timer.requestFullscreen();
                timer.title = ''
                timer.className = 'timer-cronometro-telaCheia'
            }
        }
    })
}
cronometro() // Coloca as funções e variáveis em um escopo de função para não entrar em conflito com outras variáveis da aplicação.
