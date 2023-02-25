function relogio() {

    const foco = document.querySelector('#foco');
    const pausa = document.querySelector('#pausa');
    const descanso = document.querySelector('#descanso')
    const timer = document.querySelector('.timer');
    const alarme = new Audio('assets/audioAlarme.mp3')
    const alarmeComplete = new Audio('assets/AudioComquista.mp3')
    timer.className = 'timer'


    let criaHoraSegundos = function (segundos) {
        data = new Date(segundos * 1000)
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC' // Serve para não considerar o timezone do computador, assim fazendo com que o horário fique zerado;
        });
    }

    //////////// Caixa de diálogo personalisada /////////////
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
    ////////////////////////////////////////////////////////

    let temporizador;
    let segundosRestantes;
    let segundosIntervalo;
    let contador = 0;

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

let alarmInterval;

let playAlarm = () => {
    alarmInterval = setInterval(function () {
        alarme.play()
    }, 1000);
}

let stopAlarm = () => {
    alarme.pause();
    alarme.currentTime = 0;
    clearInterval(alarmInterval);
}

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

    let emExecucao = false;
    let emExecucaoTempo = 1;

    document.addEventListener('click', function (evento) {
        const elemento = evento.target.classList;
        if (!emExecucao) {
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
        if (elemento.contains('pausar')) {
            clearInterval(temporizador);
            timer.className = 'pausado';
            emExecucao = false;
        }

        const confirmar = document.querySelector('.confirmar');
        const Redefinir = document.querySelector('.redefinir');


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

        if (elemento.contains('redefinir')) {
            confirmar.disabled = false;
            Redefinir.disabled = true;
            foco.disabled = false
            pausa.disabled = false
            descanso.disabled = false
            clearInterval(temporizador)
            contador = 0
            emExecucao = true;
            for (let i = 0; i < 4; i++) {
                document.getElementsByClassName('pomo')[i].src = 'assets/maca.png';
            }
        }
    });

}
relogio();

///////////////////// Lista de Tarefas /////////////////////////////////
///////////////////////////////////////////////////////////////////////

function listaDeTarefas() {

    const inputTarefa = document.querySelector('.input-tarefa');
    const botaoTarefa = document.querySelector('.add-tarefa');
    const tarefas = document.querySelector('.tarefas');
    const tarefasConcluidas = document.querySelector('.tarefas-concluidas');

    const criaLista = function () {
        const listas = document.createElement('li');
        return listas;
    }

    const criaTarefaConcluida = function (textoInserido) {
        const listaCriada = criaLista();
        listaCriada.innerText = textoInserido;
        listaCriada.classList.add('tarefaConcluida');
        tarefasConcluidas.appendChild(listaCriada);
        CriaBotaoApagar(listaCriada)
        salvarTarefa();
    }
    const criaTarefa = function (textoInserido) {
        const listaCriada = criaLista();
        listaCriada.innerText = textoInserido;
        listaCriada.classList.add('tarefa');
        tarefas.appendChild(listaCriada);
        CriaBotaoApagar(listaCriada)
        CriaBotaoConcluir(listaCriada);
        salvarTarefa();
    }

    const limpaImput = function () {
        inputTarefa.value = '';
        inputTarefa.focus();
    }

    const CriaBotaoApagar = function (lista) {
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.setAttribute('class', 'apagar');
        botaoApagar.setAttribute('title', 'Apagar Tarefa');
        lista.appendChild(botaoApagar)
    }

    const CriaBotaoConcluir = function (lista) {
        const botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluir';
        botaoConcluir.setAttribute('class', 'concluir');
        botaoConcluir.setAttribute('title', 'Concluir Tarefa');
        lista.appendChild(botaoConcluir);
    }

    const verificaTarefaRepete = function () {
        const listaTarefas = localStorage.getItem('tarefas');
        const arrayListaTarefa = JSON.parse(listaTarefas);

        if (listaTarefas) {
            return arrayListaTarefa.indexOf(inputTarefa.value) !== -1;
        }

    }

    const DeletarTudoLista = function () {
        const pegaTodaLista = tarefasConcluidas.querySelectorAll('li');
        const tarefasJSON = localStorage.getItem('tarefasConcluidas');
        const listaDeTarefasJSOM = JSON.parse(tarefasJSON);

        for (let deletar in listaDeTarefasJSOM) {
            pegaTodaLista[deletar].remove(); // remove todas as listas e seus conteúdos de maneira iterada
        }
    }

    // Função muda cor de fundo de lista

    const mudaCorLista = () => {
        const tarefa = tarefas.querySelectorAll('li');
        const tarefaConcluida = tarefasConcluidas.querySelectorAll('li');
        for (let i in tarefa) {
            tarefa[i].className = (i % 2 !== 0) ? 'tabelaCinza' : undefined;
        }
        for (let i in tarefaConcluida) {
            tarefaConcluida[i].className = (i % 2 !== 0) ? 'Cor-concluido-1' : 'Cor-concluido-2';
        }
    }
    ///////////// Salvar o conteúdo das tarefas ////////////

    const salvarTarefa = function () {
        const liTarefas = tarefas.querySelectorAll('li');
        const pegaListaConcluida = tarefasConcluidas.querySelectorAll('li');
        const listaDeTarefas = [];
        const listaConcluida = [];

        for (let lista of liTarefas) {
            let tarefaTexto = lista.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').replace('Concluir', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }

        for (let lista of pegaListaConcluida) {
            let tarefaTexto = lista.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaConcluida.push(tarefaTexto);
        }

        localStorage.setItem('tarefasConcluidas', JSON.stringify(listaConcluida));
        localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
    }

    const adicionaTarefaSalvas = function () {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas)
        const tarefasConcluidas = localStorage.getItem('tarefasConcluidas');
        const listaDeTarefasConcluidas = JSON.parse(tarefasConcluidas)

        if (listaDeTarefas) {
            for (let tarefa of listaDeTarefas) {
                criaTarefa(tarefa)
            }
        }
        if (listaDeTarefasConcluidas) {
            for (let tarefas of listaDeTarefasConcluidas) {
                criaTarefaConcluida(tarefas)
            }
        }
        mudaCorLista()
    }
    adicionaTarefaSalvas();

    ///////////////// Eventos ///////////////////
    inputTarefa.addEventListener('keypress', function (eventoDaTecla) {
        // Com isto dá para ver os atrubutos do evento de pressionar a tecla. 
        
        if (eventoDaTecla.keyCode === 13) { // O keyCode é um atributo do objeto keyBoardEvet, por isso dá para acessar ele por .nomeDoAtributo;
            if (!inputTarefa.value) return;

            if (!verificaTarefaRepete()) {
                criaTarefa(inputTarefa.value);
                limpaImput();
            } else {
                alert('Esta tarefa já está registrada');
            }
        }
        mudaCorLista()
    })

    botaoTarefa.addEventListener('click', function (evento) {
        if (!inputTarefa.value) return; // retornará nada se o input estiver vazio;

        if (!verificaTarefaRepete()) {
            criaTarefa(inputTarefa.value);
            limpaImput();
        } else {
            alert('Esta tarefa já está registrada')
        }
        mudaCorLista()
    })

    document.addEventListener('click', function (botaoClicado) {

        elemento = botaoClicado.target;
        if (elemento.classList.contains('apagar')) {
            elemento.parentElement.remove();
            mudaCorLista();
            salvarTarefa();
        }
        if (elemento.classList.contains('remove-all')) {
            DeletarTudoLista();
            salvarTarefa();
        }
        if (elemento.classList.contains('concluir')) {
            tarefasConcluidas.appendChild(elemento.parentElement);
            elemento.parentElement.removeChild(elemento);
            mudaCorLista();
            salvarTarefa();
        }
    })
}
listaDeTarefas()

