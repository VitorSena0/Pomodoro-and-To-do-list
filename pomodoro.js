function relogio() {

    // Pega os inputs do cronômetro 
    const foco = document.querySelector('#foco');
    const pausa = document.querySelector('#pausa');
    const descanso = document.querySelector('#descanso')
    const timer = document.querySelector('.timer');
    const alarme = new Audio('assets/audioAlarme.mp3')
    const alarmeComplete = new Audio('assets/AudioComquista.mp3')
    timer.className = 'timer'

    // Transforma os segundos em tempo com horas, minutos e segundos
    let criaHoraSegundos = function (segundos) {
        data = new Date(segundos * 1000)
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC' // Serve para não considerar o timezone do computador, assim fazendo com que o horário fique zerado;
        });
    }

    /// Caixa de diálogo personalisada ///
    let continuarFoco = async () => {
        const resultado = await Swal.fire({
            title: 'Continuar no foco?',
            showDenyButton: true,
            backdrop: 'static',// impede que o usuário clique fora da caixa de diálogo
            allowOutsideClick: false, // impede que o usuário clique fora da caixa de diálogo
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
        })
        clearInterval(temporizador)
        if (resultado.isConfirmed) {
            stopAlarm();
            segundosRestantes = segundosInputs()[0];
            iniciarCronometro()
            contador++
        } else if (resultado.isDenied) {
            // usuário clicou no botão "Não"
            stopAlarm()
        }
    }

    let iniciarPausa = async () => {
        const resultado = await Swal.fire({
            title: 'Iniciar pausa?',
            backdrop: 'static',// impede que o usuário clique fora da caixa de diálogo
            allowOutsideClick: false, // impede que o usuário clique fora da caixa de diálogo
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
        })

        if (resultado.isConfirmed) {
            segundosRestantes = segundosIntervalo[1];
            clearInterval(temporizador);
            iniciarCronometro()
            document.getElementById('pomo' + contador).src = "assets/maca-mordida.png"
            contador++
            stopAlarm()
        } else if (resultado.isDenied) {
            // usuário clicou no botão "Não"
            stopAlarm();
        }
    }

    let iniciarDescanso = async () => {
        const resultado = await Swal.fire({
            title: 'Iniciar descanso?',
            showDenyButton: true,
            backdrop: 'static',// impede que o usuário clique fora da caixa de diálogo
            allowOutsideClick: false, // impede que o usuário clique fora da caixa de diálogo
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
        })

        if (resultado.isConfirmed) {
            segundosRestantes = segundosIntervalo[2]
            iniciarCronometro()
            document.getElementById('pomo' + contador).src = "assets/maca-mordida.png"
            contador++
            stopAlarm();
        } else if (resultado.isDenied) {
            stopAlarm()
        }
    }

    // Declara as variáveis globais
    let temporizador;
    let segundosRestantes;
    let segundosIntervalo;
    let contador = 0;
    let alarmInterval;

    // Função para calcular o temporizador 
    let iniciarCronometro = function () {
        temporizador = setInterval(function () {
            while (segundosRestantes > -1) {
                segundosRestantes--;
                timer.innerHTML = criaHoraSegundos(segundosRestantes + 1);
                return segundosRestantes; ///// Pega os segundos restantes, reutilizar ele para uma função que fará a condicional quando o tempo terminar
            }
            clearInterval(temporizador);
            timer.className = 'timer'
            if (contador % 2 !== 0 && contador < 7) {
                clearInterval(temporizador)
                playAlarm();
                continuarFoco();
            } else {
                Descanso();
            }
        }, 1000);
    }


// Toca o alarme quando aparecer uma caixa de diálogo
let playAlarm = () => {
    alarmInterval = setInterval(function () {
        alarme.play()
    }, 1000);
}

// Para o alarme quando a caixa de diálogo for fechada
let stopAlarm = () => {
    alarme.pause();
    alarme.currentTime = 0;
    clearInterval(alarmInterval);
}

// Função que verifica se o tempo de foco foi finalizado e então aplica 3 pausas e 1 descanso por ciclo
    let Descanso = () => {
        playAlarm()
        segundosIntervalo = segundosInputs()
        if (contador % 2 === 0 && contador < 5) {
            iniciarPausa()
        } else if (contador === 6) {
            iniciarDescanso()
        } else {
            if (confirm('Pomodoro finalizado')) {
                stopAlarm()
                alarmeComplete.play()
                contador = 0
            }
        }
    }

// Verifica os valores dos inputs e decide se aplica o valor de tempo padrão ou o tempo inserido no input e então transforma os minutos em segundos.
    let segundosInputs = () => {
        if (!foco.value) { foco.value = 30; }
        if (!pausa.value) { pausa.value = 5; }
        if (!descanso.value) { descanso.value = 10; }

        const segundosFoco = (foco.value <= 1440) ? foco.value * 60 : alert('O valor máximo de tempo em minutos é de 1440 ');
        const segundosPausa = (pausa.value <= 1440) ? pausa.value * 60 : alert('O valor máximo de tempo em minutos é de 1440 ');
        const segundosDescanso = (descanso.value <= 1440) ? descanso.value * 60 : alert('O valor máximo de tempo em minutos é de 1440 ');
        const segundosArray = [segundosFoco, segundosPausa, segundosDescanso];
        segundosRestantes = segundosFoco;
        return segundosArray
    }

    // variável de controle para os botões 
    let emExecucao = false;
    let emExecucaoTempo = 1;

    // Evento de click
    document.addEventListener('click', function (evento) {
        const elemento = evento.target.classList; // Atribui a classe do elemento clicado à constante
        if (!emExecucao) {

            // Evento do botão iniciar
            if (elemento.contains('iniciar')) { // Retorna true ou false a depender se contém ou não
                if (emExecucaoTempo) {
                    segundosInputs();
                    emExecucaoTempo = 0;
                }
                timer.className = 'timer';
                iniciarCronometro();
                emExecucao = true
            }
        }

        // Evento do botão pausar
        if (elemento.contains('pausar')) {
            clearInterval(temporizador);
            timer.className = 'pausado';
            emExecucao = false;
        }

        // Botões do formulário
        const confirmar = document.querySelector('.confirmar');
        const Redefinir = document.querySelector('.redefinir');

        // Evento do botão confirmar
        if (elemento.contains('confirmar')) {
            segundosInputs()
            confirmar.disabled = true;
            Redefinir.disabled = false;
            foco.disabled = true
            pausa.disabled = true
            descanso.disabled = true
            clearInterval(temporizador)
            emExecucao = false;
        }

        // Evento do botão redefinir
        if (elemento.contains('redefinir')) {
            confirmar.disabled = false;
            Redefinir.disabled = true;
            foco.disabled = false
            pausa.disabled = false
            descanso.disabled = false
            clearInterval(temporizador)
            contador = 0
            emExecucao = true;
            for (let i = 0; i < 4; i++) { // Quando redefinido ele reseta as maçãs para o início
                document.getElementsByClassName('pomo')[i].src = 'assets/maca.png';
            }
        }
    });

}
relogio();