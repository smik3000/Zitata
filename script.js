const img = document.getElementById("image");
const zitata = document.getElementById("zitata");
const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png"
]
const begining = [
    'Кто рано встает, ',
    'Не бойся ошибаться, ',
    'Когда меня рожали, ',
    'Каждый может кинуть камень в волка, ',
    'Нельзя стоять, когда другие работают, ',
    'Иногда, жизнь - это жизнь, ',
] 

const ending = [
    'тот потом пожалеет о своем решении.',
    'собственно, тогда я и родился.',
    'но не каждый может кинуть волка в камень.',
    'надо лежать.',
    'а ты в ней - иногда.',
    'бойся не ошибаться.',
]
generateZitat()

// genriruem zitatu
function generateZitat(){
    const randombeginer = getRanomElement(begining,begining.length);
    const randomending = getRanomElement(ending,ending.length);
    const randomimeges = getRanomElement(images,images.length);
    const randomZitat = randombeginer + " " + randomending

    hide();

    function hide() {
        image.classList.remove("show");
        zitata.classList.remove("show");

        setTimeout(show,500);
    }

    function show() {
        image.src = "images/" + randomimeges;

        if(randomZitat.length<=48)
        {
            zitata.style.fontSize="42px";
            zitata.style.justifyContent="center";
        }
        else{
            zitata.style.fontSize="";
            zitata.justifyContent="";
        }
        zitata.textContent=randomZitat;
        image.classList.add("show");
        zitata.classList.add("show");
        
    }

    function getRanomElement(arr,endindex) {
        return arr[Math.floor(Math.random()*endindex)]
        
    }
}