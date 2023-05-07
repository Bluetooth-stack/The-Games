const baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
	method: config.method,
	headers: config.headers
};
const cardContainer = document.querySelector('.card-container');
const input = document.getElementById('search');
const srchBtn = document.getElementById('srch-btn');
const container = document.querySelector('.game-info-container');
const category = document.querySelector('#catg');
const platform = document.querySelector('#platfrom');
const sort = document.querySelector('#sort');
const modal = document.querySelector('.modal');
const pending = document.querySelector('.pending');
const errorMsg = document.querySelector('.error');

let gameName = [];
let categoryAry = new Set();
let platformAry = new Set();



function createCard(obj){
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = `${obj.thumbnail}`;
    card.appendChild(img);

    const details = document.createElement('div');
    details.className ='details';
    const h2 = document.createElement('h2');
    h2.innerText = `${obj.title}`;
    const p = document.createElement('p');
    p.className = 'info';
    p.innerText = `${obj.short_description}`;
    limitChar(p);
    details.appendChild(h2);
    details.appendChild(p);

    const btns = document.createElement('div');
    btns.className = 'btns';

    const view = document.createElement('div');
    view.className = 'view';
    const anchor = document.createElement('a');
    anchor.href = `${obj.game_url}`;
    anchor.innerHTML = '<span class="material-icons">add_box</span>';
    view.appendChild(anchor);

    const type = document.createElement('div');
    type.className = 'type';
    const span1 = document.createElement('span');
    span1.className = 'type1';
    span1.innerText = `${obj.genre}`;
    const span2 = document.createElement('span');
    span2.className = 'type2';
    span2.innerText = `${obj.platform}`;
    type.appendChild(span1);
    type.appendChild(span2);

    btns.appendChild(view);
    btns.appendChild(type);

    card.appendChild(details);
    card.appendChild(btns);

    cardContainer.appendChild(card);
    
    // console.log(cardContainer);
    card.addEventListener('click', function(){
        let gName = obj.title.toLowerCase();
        // console.log(gName);
        gameName.forEach((object)=>{
            if(object.hasOwnProperty(gName)){
                try{
                    let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${object[gName]}`
                    fetchGameData(url);
                }
                catch(error){
                    alert(`Time out, couldn't find ${error}`);
                }
            }
        })
    })

    let name = obj.title.toLowerCase();
    let game = {};
    game[name] = obj.id;
    gameName.push(game);
}

function limitChar(info) {
    let maxL = 60;
    let text = info.textContent;
    if(text.length > maxL) { 
        let begin = text.substring(0, maxL);
        info.textContent = `${begin} . . .`;
    }
}

function dislayGameDetails(obj){
    // cardContainer.style.display = 'none';

    // const container = document.createElement('div')
    // container.className = 'game-info-container';
    container.innerHTML = '';

    container.style.display = 'block';
    const close = document.createElement('span');
    close.className = 'close-btn';
    close.classList.add('material-symbols-outlined');
    close.innerText = 'close';
    container.appendChild(close);

    const top = document.createElement('div')
    top.className = 'top';

    const imgContainer = document.createElement('div')
    imgContainer.className = 'image-container'
    const img = document.createElement('div');
    img.className = 'image';
    img.style.backgroundImage = `url(${obj.thumbnail})`;
    imgContainer.appendChild(img);

    const gameInfo = document.createElement('div');
    gameInfo.className = 'game-info';
    const h1 = document.createElement('h1');
    h1.innerText = `${obj.title}`;
    const p = document.createElement('p');
    p.innerText = `${obj.short_description}`;
    const status = document.createElement('span');
    status.className = 'status';
    status.innerText = `${obj.status}`;
    gameInfo.appendChild(h1);
    gameInfo.appendChild(p);
    gameInfo.appendChild(status);

    top.appendChild(imgContainer);
    top.appendChild(gameInfo);

    const minDetails = document.createElement('div');
    minDetails.className = 'small-details';
    const span1 = document.createElement('span');
    span1.innerText = `Genre: ${obj.genre}`;
    const span2 = document.createElement('span');
    span2.innerText = `Platform: ${obj.platform}`;
    const span3 = document.createElement('span');
    span3.innerText = `Publisher: ${obj.publisher}`;
    const span4 = document.createElement('span');
    span4.innerText = `Developer: ${obj.developer}`;
    const span5 = document.createElement('span');
    span5.innerText = `Release: ${obj.release_date}`;
    minDetails.appendChild(span1);
    minDetails.appendChild(span2);
    minDetails.appendChild(span3);
    minDetails.appendChild(span4);
    minDetails.appendChild(span5);

    const description = document.createElement('div');
    description.className = 'description';
    const desc = document.createElement('p');
    desc.innerText = `${obj.description}`;
    description.appendChild(desc);

    let requirements;
    if(obj.hasOwnProperty('minimum_system_requirements')){
        requirements = document.createElement('div');

        requirements.className = 'requirements';
        const span6 = document.createElement('span');
        span6.innerText = `OS: ${obj.minimum_system_requirements.os}`
        const span7 = document.createElement('span');
        span7.innerText = `Processor: ${obj.minimum_system_requirements.processor}`
        const span8 = document.createElement('span');
        span8.innerText = `Memory: ${obj.minimum_system_requirements.memory}`
        const span9 = document.createElement('span');
        span9.innerText = `Graphics: ${obj.minimum_system_requirements.graphics}`
        const span0 = document.createElement('span');
        span0.innerText = `Storage: ${obj.minimum_system_requirements.storage}`
        requirements.appendChild(span6);
        requirements.appendChild(span7);
        requirements.appendChild(span8);
        requirements.appendChild(span9);
        requirements.appendChild(span0);
    }

    const anchor = document.createElement('a');
    anchor.href = `${obj.game_url}`;
    anchor.innerHTML = `<span class="material-symbols-outlined">stadia_controller</span>`;
    
    const snaps = document.createElement('div')
    snaps.className = 'snaps';

    for(let i = 0; i<obj.screenshots.length; i++){
        let div = document.createElement('div');
        div.style.backgroundImage =  `url(${obj.screenshots[i].image})`;
        snaps.appendChild(div);
    }
    container.appendChild(top);
    container.appendChild(minDetails);
    container.appendChild(description);
    if(requirements){
        container.appendChild(requirements);
    }
    container.appendChild(anchor);
    container.appendChild(snaps);

    // const close = document.querySelector('.close-btn');
    close.addEventListener('click',()=>{
        if(container.style.display=='block'){
            container.style.display='none';
        }
    })
}

async function fetchGameData(url){
    try{
        modal.style.display = 'flex';
        pending.style.display = 'block'
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        dislayGameDetails(data);
        window. scrollTo(980, 900);
        modal.style.display = 'none';
        pending.style.display = 'none'
    }
    catch(error){
        pending.style.display = 'none';
        errorMsg.style.display = 'block';
        errorMsg.innerText = error;
        // alert('Somethig went wrong!! \n'+error);
    }
   
}

function searchGame(){
    if(input.value===''){
        alert('Enter a valid name of the game you want!!');
        return;
    }
    let searchText = input.value.toLowerCase();
    // console.log(hasKey(searchText));
    console.log(searchText);
    // let flag = false;
    gameName.forEach((object)=>{
        if(object.hasOwnProperty(searchText)){
        //    flag = true;
            try{
                let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${object[searchText]}`
                fetchGameData(url);  
            }
            catch(error){
                alert(`Time out, couldn't find ${error}`);
            }
        }
        else{
            modal.style.display='flex'
            errorMsg.style.display = 'block';
            errorMsg.innerText = 'Sorry, Game not found!!';
            const close = document.createElement('span');
            close.className = 'close-btn';
            close.classList.add('material-symbols-outlined');
            close.innerText = 'close';
            errorMsg.appendChild(close);
            close.addEventListener('click',()=>{
                if(modal.style.display=='flex'){
                    errorMsg.style.display = 'none';
                    modal.style.display='none';
                }
            })
        }
    })
}


function platformFilter(data){
    cardContainer.innerHTML = '';
    if(platform.value===""){
        data.forEach((obj)=>{
            createCard(obj);
        })
        return
    }
    
    let filtered = data.filter((obj)=>{
        return (obj.platform === platform.value);
    })
    filtered.forEach((obj)=>{
        createCard(obj);
    })
    return filtered;
    
}

function catFilter(data){
    cardContainer.innerHTML = '';
    if(category.value===""){
        data.forEach((obj)=>{
            createCard(obj);
        })
        return
    }
    
    let filtered = data.filter((obj)=>{
        return (obj.genre === category.value);
    })
    filtered.forEach((obj)=>{
        createCard(obj);
    })
    return filtered;
    
}

function sortData(data){
    cardContainer.innerHTML = '';
    if(sort.value == 'alphabetical'){
        let copyed = [...data]
        copyed.sort((a,b)=>{
            let t1 = a.title.toLowerCase(); 
            let t2 = b.title.toLowerCase();
            if(t1>t2){
                return 1
            }
            if(t1<t2){
                return -1
            }
            return 0;
        })
        copyed.forEach((obj)=>{
            createCard(obj);
        })
        return copyed;
    }
   if(sort.value == 'date'){
        let dates = data.map(obj=>{
            return {...obj, release_date: new Date(obj.release_date)}
        })
        dates.sort((a,b)=>{
            return Number(a.release_date) - Number(b.release_date);
        })
        dates.forEach((obj)=>{
            createCard(obj);
        })
        return dates;
    }
    
    data.forEach((obj)=>{
        createCard(obj);
    })
    return;
}


document.body.onload = async ()=>{
    try{
        modal.style.display = 'flex';
        pending.style.display = 'block';

        let response = await fetch(baseUrl, options);
        let data = await response.json();
        // console.log(data);
        data.forEach((obj)=>{
            createCard(obj);
            categoryAry.add(obj.genre);
            platformAry.add(obj.platform);
        })
        // console.log(categoryAry);
        // console.log(platformAry);
        categoryAry.forEach((cat)=>{
            let opt = document.createElement('option');
            opt.value = cat;
            opt.innerText = cat;
            category.appendChild(opt);
        })
        platformAry.forEach((plat)=>{
            let opt = document.createElement('option');
            opt.value = plat;
            opt.innerText = plat;
            platform.appendChild(opt);
        })
        // console.log(gameName[0]);

        srchBtn.addEventListener('click',searchGame);

        category.addEventListener('change', ()=>{
            let catFilteredData = catFilter(data);
            
            platform.addEventListener('change', ()=>{
                let platformFiteredData = platformFilter(catFilteredData);

                sort.addEventListener('change', ()=>{
                    sortData(platformFiteredData);
                })
            })
        })
        
        platform.addEventListener('change', ()=>{
            platformFilter(data);
        })

        sort.addEventListener('change', ()=>{
            sortData(data);
        })

        let slideInd = 0;
        (function carousel(){
            let slides = document.querySelectorAll('.mySlides');
            for(let i = 0; i<slides.length; i++){
                slides[i].style.display = 'none';
            }
            slideInd++;
            if(slideInd>slides.length){
                slideInd = 1;
            }
            slides[slideInd-1].style.display = 'block';
            setTimeout(carousel, 5200);
        }())

        modal.style.display = 'none';
        pending.style.display = 'none'
    }
    catch(error){
        pending.style.display = 'none';
        errorMsg.style.display = 'block';
        errorMsg.innerText = error;
        // alert(`Something went wrong!! \n ${error}`);
    }
}
