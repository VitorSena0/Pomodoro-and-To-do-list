function cronometro(){

    const timer = document.querySelector('.timer-cronometro');

let segundos;
let controle = true;
let cronometroIntervalo;

    const cronometroTempo = (tempo) => {
        const data = new Date(tempo * 1000);
        return data.toLocaleTimeString('pt-br',{
            hour12: false,
            timeZone: 'UTC'
        });
    }
    
    const cronometrar = () => {
        cronometroIntervalo = setInterval(()=>{
            segundos++
            timer.innerHTML = cronometroTempo(segundos)
            salvarCronometro();
            return segundos
        },1000)
    }
    
    const salvarCronometro = () => {
        let tempo = segundos
        localStorage.setItem('tempoCronometro', JSON.stringify(tempo));
    }

    const adicionarCronometroSalvo = () => {
        const pegaTempo = localStorage.getItem('tempoCronometro');
        const tempoSalvoCronometro = JSON.parse(pegaTempo);
        if(!tempoSalvoCronometro){
             segundos = 0
             timer.innerHTML = cronometroTempo(segundos);
            }else if(tempoSalvoCronometro > 0){
                segundos = tempoSalvoCronometro
                timer.innerHTML = cronometroTempo(segundos);
                return;
            }
    } 
    adicionarCronometroSalvo()
    
    document.addEventListener('click', function(e){
        let evento = e.target.className
        if(evento === 'botao-iniciar-cronometro' && controle){
            cronometrar()
            controle = false;
            timer.className = 'timer-cronometro'
        }
        if(evento === 'botao-pausar-cronometro'){
            clearInterval(cronometroIntervalo)
            controle = true;
            timer.className = 'timer-cronometro-pausado'
        }
        if(evento === 'resetar-cronometro'){
            segundos = 0
            clearInterval(cronometroIntervalo);
            timer.innerHTML = cronometroTempo(segundos);
            controle = true;
            timer.className = 'timer-cronometro-pausado';
            salvarCronometro()
        }
        if(evento === 'timer-cronometro' || evento === 'timer-cronometro-pausado' || evento === 'timer-cronometro-telaCheia'){
   document.addEventListener('fullscreenchange', () => { //O evento fullscreenchange é disparado sempre que há uma mudança no estado de tela cheia (fullscreen) do documento. Ele é acionado quando um documento entra ou sai do modo de tela cheia
       if(!document.fullscreenElement){
           timer.title = 'Abrir tela cheia'
           timer.className = 'timer-cronometro'
       }
   })         
                
            if(!document.fullscreenElement){
                timer.requestFullscreen();
                timer.title = ''
                timer.className = 'timer-cronometro-telaCheia'
            }
        }
    })
}
cronometro()
