//npx nodemon index.js
const Discord = require('discord.js');
const client = new Discord.Client();
const {google} = require('googleapis')
//const CONFIG = ('config.json');

client.login('NzQxODQzNTIzNTQ4MDg2Mjgz.Xy9dng.Gdjy-PqM-Fpw1FD6rg_G0s3CCkc'); //Bot oficial
//client.login('NzQxODczNTY1NDg1NDk4NTEw.Xy95mQ.VV3OYuEh15XQfw24J0e1XeQQ0tE'); //Bot de actualizaciones y pruebas

client.on('ready', () => {
    console.log(`Ya estoy conectado como: ${client.user.tag}`);
    client.user.setStatus('online');
})

let prefijo = '!';
//let prefijo = '!p ';
const prefijo_largo = prefijo.length;

client.on('message', async (msg) => {
    //console.log(msg);
    if(msg.content === prefijo+'help'){
        const embed = new Discord.MessageEmbed()
        .setTitle('Hola por el momento tenemos estas opciones:')
        .setColor("#ff0000")
        .addField(prefijo+'hola:', 'Saluda al bot')
        .addField(prefijo+'saludo:', 'Manda un saludo a todos')
        .addField(prefijo+'cls <numero (0-99)>:', 'Borra el numero de mensajes especificado')
        .addField(prefijo+'temp <tiempo en dos digitos y medida de tiempo en uno (05s / 10h / 01d / 30m> <Mensaje a recordar>:', 'Recuerda el mensaje en el tiempo establecido')
        .addField(prefijo+'play <link de youtube>: ', 'Reproduce la cancion de youtube si no se esta reproduciendo otra\npd: de momento no contamos con cola de reproduccion estamos trabajando en ello. Gracias')
        .addField(prefijo+'pause: ', 'Pausa la cancion que se esta reproduciendo')
        .addField(prefijo+'continue:', 'Reanuda la cancion pausada')
        .addField(prefijo+'delplay', 'Elimina la cancion que se esta reproduciendo')
        .setFooter('Seguimos trabajando en actualizaciones para su mayor comodidad :D')

        msg.reply(embed);
    }

    if(msg.content === prefijo+'hola'){
        msg.reply('Hola estoy para servirle');
    }

    if(msg.content === prefijo+'saludo'){
        msg.channel.send(`Saludo para todos @everyone de parte de ${msg.author}`);
    }

    if((msg.content.includes('ojitos'))){
        msg.channel.send(`Te hablan <@673397248427556887>`);
    }

    if(msg.content.includes(prefijo+'cls')){
        const entrada = msg.content.toString();
        const tamanio = prefijo.length+4;
        const nueva = entrada.slice(tamanio);
        const numero = parseInt(nueva);
        msg.channel.bulkDelete(numero+1);
    }

    if(msg.content.includes(prefijo+'cadena')){
        const entrada = msg.content.toString();
        const tamanio = prefijo_largo+7;
        const nueva = entrada.slice(tamanio);
        msg.channel.send(nueva);
    }

    if(msg.content === (prefijo+'dato')){
        msg.channel.send('<@'+msg.author+'>\nDesea continuar?\nSi: :+1: \t No: :-1:');
    }

    /* if(msg.content.includes(prefijo+'busqueda')){
        let busqueda = (msg.content.slice((prefijo_largo+9))).toString();
        let urlVideo;
        google.youtube('v3').search.list({
            key: 'AIzaSyCYoDmqWaM7LC6ElJQXKhLYQAjMd6SuCbA',
            part: 'snippet',
            q: busqueda,
            maxResults: 1,
        }).then((response) => {
            const {data} = response;
            data.items.forEach((item) => {
                urlVideo = (`https://www.youtube.com/watch?v=${item.id.videoId}`);
                console.log(urlVideo);
            });
        }).catch((err) => console.log(err));
        setTimeout(function(){
            console.log(urlVideo);
        },3000) 
    }*/

    /* if(msg.content.includes('Desea continuar?')){
        msg.react('👍');
        msg.react('👎');
        let conteo = (msg.reactions.get('👍').count);
        if(conteo == 2){
            msg.channel.send('aprobado');
        }
    } */
})

//temporalizador
client.on('message', msg => {
    let tiempo_fin;
    let unidad_completa;
    if(msg.content.includes(prefijo+'temp')){
        const entrada = msg.content.toString();
        console.log('1.- '+entrada);
        const tamanio = prefijo.length+5;
        console.log('2.- '+tamanio);
        const tiempo_razon = entrada.slice(tamanio);
        console.log('3.- '+tiempo_razon);
        const tiempo_unidad = tiempo_razon.slice(0,(3-(tiempo_razon.length).toString()));
        console.log('4.- '+tiempo_unidad);
        const unidad = tiempo_unidad.slice(2);
        console.log('5.- '+unidad);
        const tiempo = parseInt(tiempo_unidad.slice(0,-1));
        console.log('6.- '+tiempo);
        const razon = (tiempo_razon.slice(4)).toString();
        console.log('7.- '+razon);
        if(unidad.includes('s')){
            tiempo_fin = tiempo * 1000;
            unidad_completa = 'segundos';
        }else if(unidad.includes('m')){
            tiempo_fin = tiempo * 60000;
            unidad_completa = 'minutos';
        }else if(unidad.includes('h')){
            tiempo_fin = tiempo * 3600000;
            unidad_completa = 'horas';
        }else if(unidad.includes('d')){
            tiempo_fin = tiempo * 86400000;
            unidad_completa = 'dias';
        }
	msg.reply('Te avisare en: '+tiempo+' '+unidad_completa);
        setTimeout(function(){
            msg.reply(razon);
            estado = 0;
        },tiempo_fin)
    }
})

//Cronometros
let minando=0;
let explorando=0;
let trabajando=0;
let daily=0;
let claim=0;
let usuario;
client.on('message', async msg => {
    if(msg.content.includes('mine') || msg.content.includes('fish') || msg.content.includes('nuse')){
        if(msg.content.length < 10){
            usuario = msg.author;
        }
    }

    if(msg.content.includes('pet explore')){
        if(msg.content.length < 17){
            usuario = msg.author;
        }
    }

    if(((msg.content===('ndaily')) || (msg.content===('n daily')))){
        if(msg.content.length < 9){
            if(daily==0){
                msg.channel.send('Diario reclamado');
                setTimeout(function(){
                    msg.reply('Ya puedes reclamar premio diario. Recuerda que puedes votar antes');
                    daily = 0;
                }, 86400000);
                daily = 1;
            }
        }
    }
    if(((msg.content===('nclaim')) || (msg.content===('n claim')))){
        if(msg.content.length < 8){
            if(claim==0){
                msg.channel.send('Claim diario reclamado');
                setTimeout(function(){
                    msg.reply('Claim diario listo');
                    claim = 0;
                }, 86400000);
                claim = 1;
            }
        }
    }

    if((msg.content.includes('Has recolectado en'))){
        if(minando==0){
            msg.channel.send('Empezando a Minar');
            setTimeout(function(){
                msg.channel.send('<@'+usuario+'> Ya puedes minar');
                minando = 0
            }, 295000);
            minando = 1;
        }
    }

    if((msg.content.includes('¡Tu ')) && (msg.content.includes('ha iniciado su viaje! Su destino'))){
        if(explorando==0){
            msg.channel.send('La pet se fue, regresa pronto');
            setTimeout(function(){
                msg.channel.send('<@'+usuario+'> Regreso la pet');
            }, 1795000);
            explorando = 1;
        }
    }
    if(msg.content.includes('¡Tu mascota ha regresado de')){
        explorando = 0;
        setTimeout(function(){
            msg.channel.send('<@'+usuario+'> Tu mascota puede volver a salir a pasear');
        }, 895000)
    }

    if((msg.content.includes('!Has incubado un'))){
        msg.channel.send('Pronto seras padre');
        setTimeout(function(){msg.channel.send('<@'+usuario+'> Ha nacido el bebé');}, 3595000);
    }

    if((msg.content.includes('nw')) || (msg.content.includes('n w')) || (msg.content.includes('nwokr')) || (msg.content.includes('n wokr'))){
        if(msg.content.length < 9){
            if(trabajando==0){
                msg.channel.send('Descansando...');
                setTimeout(function(){
                    msg.reply('Puedes volver a trabajar');
                    trabajando = 0;
                }, 3595000);
                trabajando = 1;
            }
        }
    }
})

//Reproductor mejoras pendientes

//https://www.youtube.com/results?search_query=palabras+de+busqueda
let reproduciendo = false;
let connection, cancion, dispatcher,canalVoz,canalVozAux;
const ytdl = require('ytdl-core');
client.on('message', async msg => {
    //if(!msg.guil) return;
    if(msg.content === (prefijo+'nomusic')){
        reproduciendo = false;
    }
    if(msg.content.includes(prefijo+'play')){
        //msg.channel.bulkDelete(1);

        if(msg.member.voice.channel){
            if(!reproduciendo){
                canalVozAux = canalVoz;
                canalVoz = undefined;
            }
            if(canalVoz == undefined){
                canalVoz = msg.member.voice.channel.id
            }

            if(canalVoz === msg.member.voice.channel.id){
                if(!reproduciendo){
                    connection = await msg.member.voice.channel.join();
                    cancion = (msg.content.slice((prefijo_largo+5))).toString();
                    if(!(cancion.includes('com/watch?v='))){
                        google.youtube('v3').search.list({
                            key: 'AIzaSyCYoDmqWaM7LC6ElJQXKhLYQAjMd6SuCbA',
                            part: 'snippet',
                            q: cancion,
                            maxResults: 1,
                        }).then((response) => {
                            const {data} = response;
                            data.items.forEach((item) => {
                                cancion = (`https://www.youtube.com/watch?v=${item.id.videoId}`);
                            })
                        }).catch((err) => msg.channel.send(err));
                    }
                    setTimeout(function(){
                        if (cancion.length > 2){
                            dispatcher = connection.play(ytdl(cancion));
                            msg.reply('reproduciendo: '+cancion)
                            reproduciendo = true;
                            dispatcher.pause();
                            dispatcher.resume();
                            dispatcher.setVolume(0.5);
                            dispatcher.on('finish', ()=> {
                                msg.reply('Termino la cancion');
                                dispatcher.destroy();
                                reproduciendo = false;
                                connection = msg.member.voice.channel.leave();
                            })
                        }else{
                            msg.reply('Debes ingresar un link de youtube para poder reproducir');
                        }   
                    },3000)
                }else{
                    msg.reply('Hay una cancion reproduciendose');
                }
            }else{
                msg.reply('Debes estar en mi mismo canal de voz');
            }
        }else{
            msg.reply('Debes estar en un canal de voz primero')
        }
    }

    //Pause
    if(msg.content.includes(prefijo+'pause')){
        //msg.channel.bulkDelete(1);
        if(msg.member.voice.channel){
            if(canalVoz === msg.member.voice.channel.id){
                if(reproduciendo){
                    connection = await msg.member.voice.channel.join();
                    dispatcher.pause();
                    msg.reply('Reproduccion pausada');
                }else{
                    msg.reply('No hay ninguna cancion reproduciendose');
                }
            }else{
                msg.reply('Debes estar en mi mismo canal de voz');
            }            
        }else{
            msg.reply('Debes estar en un canal de voz primero')
        }
    }

    if(msg.content.includes(prefijo+'delplay')){
        //msg.channel.bulkDelete(1);
        if(msg.member.voice.channel){
            if(canalVoz === msg.member.voice.channel.id){
                if(reproduciendo){
                    dispatcher.pause();
                    dispatcher.destroy();
                    cancion = '';
                    msg.reply('cancion eliminada de la reproduccion');
                    reproduciendo = false
                    connection = msg.member.voice.channel.leave();
                }else{
                    msg.reply('No hay ninguna cancion reproduciendose');
                }
            }else{
                msg.reply('Debes estar en mi mismo canal de voz');
            }
        }else{
            msg.reply('Debes estar en un canal de voz primero')
        }
    }

    if(msg.content.includes(prefijo+'continue')){
        //msg.channel.bulkDelete(1);
        if(msg.member.voice.channel){
            if(canalVoz === msg.member.voice.channel.id){
                if(reproduciendo){
                    connection = await msg.member.voice.channel.join();
                    dispatcher.resume();
                    msg.reply('Reproduccion reanudada');
                }else{
                    msg.reply('No hay ninguna cancion reproduciendose');
                }
            }else{
                msg.reply('Debes estar en mi mismo canal de voz');
            }
        }else{
            msg.reply('Debes estar en un canal de voz primero');
        }
    }
})