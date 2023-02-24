// const inputTarefa = document.querySelector('.input-tarefa');
// const botaoTarefa = document.querySelector('.add-tarefa');
// const tarefas = document.querySelector('.tarefas');
// const tarefasConcluidas = document.querySelector('.tarefas-concluidas');

// const criaLista = function () {
//     const listas = document.createElement('li');
//     return listas;
// }

// const criaTarefaConcluida = function (textoInserido) {
//     const listaCriada = criaLista();
//     listaCriada.innerText = textoInserido;
//     listaCriada.classList.add('tarefaConcluida');
//     tarefasConcluidas.appendChild(listaCriada);
//     CriaBotaoApagar(listaCriada)
//     salvarTarefa();
// }
// const criaTarefa = function (textoInserido) {
//     const listaCriada = criaLista();
//     listaCriada.innerText = textoInserido;
//     listaCriada.classList.add('tarefa');
//     tarefas.appendChild(listaCriada);
//     CriaBotaoApagar(listaCriada)
//     CriaBotaoConcluir(listaCriada);
//     salvarTarefa();
// }

// const limpaImput = function () {
//     inputTarefa.value = '';
//     inputTarefa.focus();
// }

// const CriaBotaoApagar = function (lista) {
//     const botaoApagar = document.createElement('button');
//     botaoApagar.innerText = 'Apagar';
//     botaoApagar.setAttribute('class', 'apagar');
//     botaoApagar.setAttribute('title', 'Apagar Tarefa');
//     lista.appendChild(botaoApagar)
// }

// const CriaBotaoConcluir = function (lista) {
//     const botaoConcluir = document.createElement('button');
//     botaoConcluir.innerText = 'Concluir';
//     botaoConcluir.setAttribute('class', 'concluir');
//     botaoConcluir.setAttribute('title', 'Concluir Tarefa');
//     lista.appendChild(botaoConcluir);
// }

// const verificaTarefaRepete = function () {
//     const listaTarefas = localStorage.getItem('tarefas');
//     const arrayListaTarefa = JSON.parse(listaTarefas);

//     if (listaTarefas) {
//         return arrayListaTarefa.indexOf(inputTarefa.value) !== -1;
//     }

// }

// const DeletarTudoLista = function () {
//     const pegaTodaLista = tarefasConcluidas.querySelectorAll('li');
//     const tarefasJSON = localStorage.getItem('tarefasConcluidas');
//     const listaDeTarefasJSOM = JSON.parse(tarefasJSON);

//     for (let deletar in listaDeTarefasJSOM) {
//         pegaTodaLista[deletar].remove(); // remove todas as listas e seus conteúdos de maneira iterada
//     }
// }

// // Função muda cor de fundo de lista

// const mudaCorLista = () => {
//     const tarefa = tarefas.querySelectorAll('li');
//     const tarefaConcluida = tarefasConcluidas.querySelectorAll('li');
//     for (let i in tarefa) { 
//         tarefa[i].className = (i % 2 !== 0)? 'tabelaCinza' : undefined;        
//     }
//     for(let i in tarefaConcluida){
//         tarefaConcluida[i].className = (i % 2 !== 0)? 'Cor-concluido-1' : 'Cor-concluido-2';
//     } 
// }
// ///////////// Salvar o conteúdo das tarefas ////////////

// const salvarTarefa = function () {
//     const liTarefas = tarefas.querySelectorAll('li');
//     const pegaListaConcluida = tarefasConcluidas.querySelectorAll('li');
//     const listaDeTarefas = [];
//     const listaConcluida = [];

//     for (let lista of liTarefas) {
//         let tarefaTexto = lista.innerText;
//         tarefaTexto = tarefaTexto.replace('Apagar', '').replace('Concluir', '').trim();
//         listaDeTarefas.push(tarefaTexto);
//     }

//     for (let lista of pegaListaConcluida) {
//         let tarefaTexto = lista.innerText;
//         tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
//         listaConcluida.push(tarefaTexto);
//     }

//     localStorage.setItem('tarefasConcluidas', JSON.stringify(listaConcluida));
//     localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
// }

// const adicionaTarefaSalvas = function () {
//     const tarefas = localStorage.getItem('tarefas');
//     const listaDeTarefas = JSON.parse(tarefas)
//     const tarefasConcluidas = localStorage.getItem('tarefasConcluidas');
//     const listaDeTarefasConcluidas = JSON.parse(tarefasConcluidas)

//     if (listaDeTarefas) {
//         for (let tarefa of listaDeTarefas) {
//             criaTarefa(tarefa)
//         }
//     }
//     if (listaDeTarefasConcluidas) {
//         for (let tarefas of listaDeTarefasConcluidas) {
//             criaTarefaConcluida(tarefas)
//         }
//     }
//     mudaCorLista()
// }
// adicionaTarefaSalvas();

// ///////////////// Eventos ///////////////////
// inputTarefa.addEventListener('keypress', function (eventoDaTecla) {
//     // Com isto dá para ver os atrubutos do evento de pressionar a tecla. 
//     if (eventoDaTecla.keyCode === 13) { // O keyCode é um atributo do objeto keyBoardEvet, por isso dá para acessar ele por .nomeDoAtributo;
//         if (!inputTarefa.value) return;
        
//         if (!verificaTarefaRepete()) {
//             criaTarefa(inputTarefa.value);
//             limpaImput();
//         } else {
//             alert('Esta tarefa já está registrada');
//         }
//     }
//     mudaCorLista()
// })

// botaoTarefa.addEventListener('click', function (evento) {
//     if (!inputTarefa.value) return; // retornará nada se o input estiver vazio;
    
//     if (!verificaTarefaRepete()) {
//         criaTarefa(inputTarefa.value); 
//         limpaImput();
//     } else {
//         alert('Esta tarefa já está registrada')
//     }
//     mudaCorLista()
// })

// document.addEventListener('click', function (botaoClicado) {

//     elemento = botaoClicado.target;
//     if (elemento.classList.contains('apagar')) {
//         elemento.parentElement.remove();
//         mudaCorLista();
//         salvarTarefa();
//     }
//     if (elemento.classList.contains('remove-all')) {
//         DeletarTudoLista();
//         salvarTarefa();
//     }
//     if (elemento.classList.contains('concluir')) {
//         tarefasConcluidas.appendChild(elemento.parentElement);
//         elemento.parentElement.removeChild(elemento);
//         mudaCorLista();
//         salvarTarefa();
//     }
// })
