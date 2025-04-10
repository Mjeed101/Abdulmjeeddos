// letters 

const letters = ["أ","ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي","ة"
];


//get array from letters

let lettersArray = Array.from(letters);

//select letters container 
let lettersContainer = document.querySelector(".letters");

// generate letters 

lettersArray.forEach(letter => {

    //create span 
    let span = document.createElement("span");

    //create letter text node 
    let theLetter = document.createTextNode(letter);

    //append the letter to span 
    span.appendChild(theLetter);

    //add class on span 
    span.className= 'letter-box';

    // append span to the letters container
    lettersContainer.appendChild(span);
});

//object of words + categories

const words = {
    افلام: ["الخلاص", "البداية", "طفيلي", "بين النجوم", "صفعة", "تذكار", "كوكو", "أب", "أفاتار", "المصارع", "الجوكر", "تايتانيك"],

    أشخاص: ["ألبرت أينشتاين", "كريستيانو رونالدو", "هتلر", "توماس إديسون", "تايلور سويفت", "ويل سميث", "إيلون ماسك", "ستيف جوبز", "مايكل جاكسون", "ليوناردو دافنشي"],

    دول: ["سوريا", "السعودية", "روسيا", "الصين", "البرازيل", "كندا", "جرينلاند", "النرويج", "جامايكا", "مصر", "فرنسا", "ألمانيا", "اليابان", "أستراليا"],

    حيوانات: ["أسد", "نمر", "فيل", "زرافة", "باندا", "كنغر", "دلفين", "بطريق", "فهد", "حمار وحشي", "تمساح"],

    رياضات: ["كرة القدم", "كرة السلة", "تنس", "كريكت", "ريشة طائرة", "رجبي", "كرة الطائرة", "بيسبول", "هوكي", "سباحة", "ملاكمة"],

    شركات: ["نايكي", "أديداس", "أبل", "سامسونج", "مايكروسوفت", "جوجل", "أمازون", "بي إم دبليو", "تويوتا", "كوكا كولا", "بيبسي"],

    الفضاء: ["المريخ", "الزهرة", "المشتري", "زحل", "نبتون", "مجرة", "كويكب", "ثقب أسود", "مذنب", "درب التبانة", "جاذبية"],

    موسيقى: ["بيانو", "جيتار", "كمان", "طبول", "ناي", "ساكسفون", "ميكروفون", "أوركسترا", "باس", "سنثسايزر"],

    اكلات: ["بيتزا", "برجر", "سوشي", "باستا", "برياني", "شوكولاتة", "بان كيك", "تشيز كيك", "سباغيتي", "تاكو", "ستيك"],

    مدن: ["نيويورك", "باريس", "طوكيو", "لندن", "دبي", "موسكو", "بكين", "ريو دي جانيرو", "روما", "إسطنبول", "مدريد","بريدة"],

    أبطال: ["باتمان", "سوبرمان", "سبايدرمان", "آيرون مان", "ثور", "هالك", "وولفرين", "الأرملة السوداء", "أكوامان", "فلاش"],

    تكنلوجيا: ["حاسوب", "إنترنت", "هاتف ذكي", "روبوت", "بلوك تشين", "الذكاء الاصطناعي", "الأمن السيبراني", "برمجيات", "خوارزمية", "قاعدة بيانات"],

    عناصر : ["هيدروجين", "أوكسجين", "كربون", "هيليوم", "ذهب", "فضة", "حديد", "بلاتين", "نحاس", "نيتروجين"],

    مركبات: ["سيارة", "طائرة", "قطار", "دراجة", "دراجة نارية", "هليكوبتر", "غواصة", "مركبة فضائية", "قارب", "شاحنة"],

    مهن: ["طبيب", "مهندس", "معلم", "عالم", "طيار", "محامي", "طاهٍ", "رائد فضاء", "فنان", "رجل إطفاء"]
};


// get random property 

let allKeys = Object.keys(words);
//random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//category
let randomPropName = allKeys[randomPropNumber];
//category words
let randomPropValue = words[randomPropName];

// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// the chosen word 
let randomValueValue = randomPropValue[randomValueNumber]

// set category info 

document.querySelector(".game-info .category span").innerHTML = randomPropName ;


// select letters guess element
let letterGuessContainer = document.querySelector(".letters-guess");

// conver chosen word to array 
let lettersAndSpace = Array.from(randomValueValue);

//create spans depend on words 
lettersAndSpace.forEach( letter => {
    //create empty span
    let emptySpan = document.createElement("span");

    // if letter is space 
    if (letter === ' '){

        //add class to the span 
        emptySpan.className = 'with-space' ;

    }

    //append spans to the letters guess container
    letterGuessContainer.appendChild(emptySpan);


});



//select guess spans

let guessSpans = document.querySelectorAll(".letters-guess span");

// wrong attempts
let wrongAttempts =0; 

// the draw element
let theDraw = document.querySelector(".hangman-draw");

// set timer for each round 
let timeSet= 60 ;
const timerElement = document.getElementById("timer");
const pauseButton = document.querySelector("button");
const winMessage = document.getElementById("win-message");

let countdown ; 
let isPaused = false ;

function startTimer(){

    countdown = setInterval ( () => {

        if (!isPaused){
            timeSet--;
            timerElement.textContent = timeSet;

            if (timeSet <= 0 ) {
                clearInterval(countdown) ;
                endGame("أنتهى الوقت , حظ أوفر ");
            }
        }

    },1000);
}

pauseButton.addEventListener("click", () => {
    if(isPaused) {
        pauseButton.textContent = "إيقاف" ;
        isPaused = false ;
        startTimer();
    } else {

        pauseButton.textContent = "إستمرار "; 
        isPaused = true ; 
        clearInterval(countdown);

    }
});

startTimer();

function checkWin(){

    let allGuessed =true ;

    document.querySelectorAll(".letters-guess span").forEach(span => {

        if (span.innerHTML === "" || span.innerHTML === "&nbsp;"){
            allGuessed = false ;
        }

    });

    if(allGuessed){
        clearInterval(countdown);
        winMessage.classList.remove("hidden");
        document.querySelectorAll(".letter-box").forEach(button => button.classList.add("disabled"));
    }
}


// handle click on letter

document.addEventListener("click",(e) =>{

    if(e.target.className === 'letter-box'){

        e.target.classList.add("clicked");

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        let theStatus = false;

        lettersAndSpace.forEach((wordletter, WordIndex ) => {

            //if the clicked letter equal the one of the chosen word letter  
            if(theClickedLetter === wordletter){

                
                //set status correct
                theStatus=true;

                //loop on all guess spans
                guessSpans.forEach( (span, spanIndex) => {

                    if(WordIndex === spanIndex ){

                        span.innerHTML = wordletter;

                    }

                });

                
            }
            
        });

        // if letter is wrong
        if (theStatus !== true ){

        // increase the wrong attempts
        wrongAttempts++;

        // add class wrong on the draw element
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        // play fail sound 
        document.getElementById("fail").play();

        if (wrongAttempts === 8 ){

           endGame();

            lettersContainer.classList.add("finished");


        }


        }else {

            
            //play success sound
            document.getElementById("success").play(); 
            checkWin();
        }
        
        
    } 

});

function endGame(){

    //create popup div 

    let div = document.createElement("div");
    //create text 

    let divText = document.createTextNode(`أنتهى الوقت , الكلمة هي  ${randomValueValue}`);
    //append Text to div 
    div.appendChild(divText);

    //add class on div 
    div.className= "popup";

    //appent to the body 

    document.body.appendChild(div);

    

}

