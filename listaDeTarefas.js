////////// Lista de Tarefas ///////////
function listaDeTarefas() {

    // Pega os inputs, lista e botões da lista de tarefas
    const inputTarefa = document.querySelector('.input-tarefa');
    const botaoTarefa = document.querySelector('.add-tarefa');
    const tarefas = document.querySelector('.tarefas');
    const tarefasConcluidas = document.querySelector('.tarefas-concluidas');

    let createParagrafo; // Variável global

    // Cria um elemento html 'li'
    const criaLista = function () {
        const listas = document.createElement('li');
        return listas;
    }

    // Cria a tarefa quando for concluída a tarefa atribuída 
    const criaTarefaConcluida = function (textoInserido) {
        const listaCriada = criaLista();
        listaCriada.innerText = textoInserido;
        listaCriada.classList.add('tarefaConcluida');
        tarefasConcluidas.appendChild(listaCriada);
        CriaBotaoApagar(listaCriada)
        criaHoraTarefa(listaCriada)
        salvarTarefa();
    }

    // Adiciona uma tarefa que estiver inserida no input
    const criaTarefa = function (textoInserido) {
        const listaCriada = criaLista();
        listaCriada.innerText = textoInserido;
        listaCriada.classList.add('tarefa');
        tarefas.appendChild(listaCriada);
        CriaBotaoApagar(listaCriada)
        CriaBotaoConcluir(listaCriada);
        criaHoraTarefa(listaCriada)
        salvarTarefa();
    }

    // Adiciona o tempo de quando a tarefa foi criada
    const criaHoraTarefa = (lista) => {
        const data = new Date();
        const dataLocal = data.toLocaleDateString()
        const horaLocal = data.toLocaleTimeString('pt-br',{hour: 'numeric', minute: 'numeric'})// Deixa o horário sem os segundos
        createParagrafo = document.createElement('h6');
        createParagrafo.innerHTML = `criação: ${dataLocal} ${horaLocal}`;
        createParagrafo.setAttribute('class', 'data-Hora');
        lista.appendChild(createParagrafo)   
    }

    // Quando for submetida a tarefa ele limpa a caixa de input
    const limpaImput = function () {
        inputTarefa.value = '';
        inputTarefa.focus();
    }

    // Cria Dimamicante um botão 'apagar' para cada nova tarefa criada
    const CriaBotaoApagar = function (lista) {
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.setAttribute('class', 'apagar');
        botaoApagar.setAttribute('title', 'Apagar Tarefa');
        lista.appendChild(botaoApagar)
    }
    
    // Cria Dimamicante um botão 'concluir' para cada nova tarefa criada
    const CriaBotaoConcluir = function (lista) {
        const botaoConcluir = document.createElement('button');
        botaoConcluir.innerText = 'Concluir';
        botaoConcluir.setAttribute('class', 'concluir');
        botaoConcluir.setAttribute('title', 'Concluir Tarefa');
        lista.appendChild(botaoConcluir);
    }

    // Verifica se a tarefa já foi criada
    const verificaTarefaRepete = function () {
        const listaTarefas = localStorage.getItem('tarefas');
        const arrayListaTarefa = JSON.parse(listaTarefas);

        if (listaTarefas) {
            return arrayListaTarefa.indexOf(inputTarefa.value) !== -1;
        }

    }

    // Pega todo o conteúdo contido na aplicação da memória local e remove todos os elementos do array
    const DeletarTudoLista = function () {
        const pegaTodaLista = tarefasConcluidas.querySelectorAll('li');
        const tarefasJSON = localStorage.getItem('tarefasConcluidas');
        const listaDeTarefasJSOM = JSON.parse(tarefasJSON);

        for (let deletar in listaDeTarefasJSOM) {
            pegaTodaLista[deletar].remove(); // remove todas as listas e seus conteúdos de maneira iterada
        }
    }

    
    // Função muda cor de fundo de lista de forma alternada
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
    
    // Salvar o conteúdo das tarefas em armazenameno local do browser //
    const salvarTarefa = function () {
        const lisTarefas = tarefas.querySelectorAll('li');
        const pegaListaConcluida = tarefasConcluidas.querySelectorAll('li');
        const listaDeTarefas = [];
        const listaConcluida = [];

        for (let lista of lisTarefas) { // Coloca a lista de tarefas não conluídas em um array
            let tarefaTexto = lista.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').replace('Concluir', '').replace(createParagrafo.innerHTML,'').trim(); // Retira todos os '/n' e conteúdos indesejados do array e retira o espaço de cada elemento
            listaDeTarefas.push(tarefaTexto);
        }

        for (let lista of pegaListaConcluida) { // Coloca a lista de tarefas concluídas em um array
            let tarefaTexto = lista.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').replace(createParagrafo.innerHTML, '').trim(); // idem
            listaConcluida.push(tarefaTexto);
        }

        localStorage.setItem('tarefasConcluidas', JSON.stringify(listaConcluida)); // Salva no armazenamento local as tarefas submetidas
        localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas)); // Salva no armazenamento local as tarefas concluídas
    }

    // Adiciona as tarefas quando for recarregada a página ou quando ela for iniciada
    const adicionaTarefaSalvas = function () {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas)
        const tarefasConcluidas = localStorage.getItem('tarefasConcluidas');
        const listaDeTarefasConcluidas = JSON.parse(tarefasConcluidas)

        if (listaDeTarefas) { // Adiciona a lista não concluída
            for (let tarefa of listaDeTarefas) {
                criaTarefa(tarefa)
            }
        }
        if (listaDeTarefasConcluidas) {
            for (let tarefas of listaDeTarefasConcluidas) { // Adiciona a lista concluída
                criaTarefaConcluida(tarefas)
            }
        }
        mudaCorLista() // Executa as cores alternadas
    }
    adicionaTarefaSalvas(); // Executa ao iniciar a página


    // Eventos do pressionar do botão do teclado //
    inputTarefa.addEventListener('keypress', function (eventoDaTecla) {
        
        // Verifica se a tecla pressionada foi o 'enter'
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

    // Evento do click do mouse no botão de adicionar a tarefa//
    botaoTarefa.addEventListener('click', function () {
        if (!inputTarefa.value) return; // retornará nada se o input estiver vazio;

        if (!verificaTarefaRepete()) {
            criaTarefa(inputTarefa.value);
            limpaImput();
        } else {
            alert('Esta tarefa já está registrada')
        }
        mudaCorLista()
    })

    // Evento de click dos botões de apagar, remover-tudo e concluir //
    document.addEventListener('click', function (botaoClicado) {

        elemento = botaoClicado.target; // Verifica o elemento ou sua tag html clicada 

        // Verifica se o botão apagar foi clicado
        if (elemento.classList.contains('apagar')) {
            elemento.parentElement.remove(); // 'node.parentElement' é uma propriedade em JavaScript que retorna o elemento pai do nó especificado
            mudaCorLista();
            salvarTarefa();
        }

        // Verifica se o botão remover todos foi clicado
        if (elemento.classList.contains('remove-all')) {
            DeletarTudoLista();
            salvarTarefa();
        }

        // Verifica se o botão concluir foi clicado
        if (elemento.classList.contains('concluir')) {
            tarefasConcluidas.appendChild(elemento.parentElement); // idem
            elemento.parentElement.removeChild(elemento);
            mudaCorLista();
            salvarTarefa();
        }
    })
}
listaDeTarefas()