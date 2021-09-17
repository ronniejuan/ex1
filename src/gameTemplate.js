import smily from "./assets/images/smily.jpg";
import image_1 from "./assets/images/1.jpg";
import image_2 from "./assets/images/2.jpg";
import image_3 from "./assets/images/3.jpg";
import image_4 from "./assets/images/4.jpg";
import image_5 from "./assets/images/5.jpg";
import image_6 from "./assets/images/6.jpg";
import image_7 from "./assets/images/7.jpg";
import image_8 from "./assets/images/8.jpg";

//to create html element with their attributes
export function elemCreator(elem, attrs) {
  let element = document.createElement(elem);
  for (let key in attrs) {
    if (key.startsWith("data")) {
      element.setAttribute(`data-${key}`, attrs[key]);
    }

    element.setAttribute(key, attrs[key]);
  }

  return element;
}




// to create the template for every image card
export function createCard(img) {
  // create card template
  let card      = elemCreator("div", { class: "flip-card", id: "card", dataURL:img });
  let cardInner = elemCreator("div", {class: "flip-card-inner",id: "card-inner"});
  let cardFront = elemCreator("div", { class: "flip-card-front" });
  let imgFront  = elemCreator("img", {src: smily,alt: "avatar",style: "width:100%;height:100%;"});
  let cardBack  = elemCreator("div", { class: "flip-card-back" });
  let imgBack   = elemCreator("img", {src: img,alt: "avatar",style: "width:100%;height:100%"});

  cardFront.append(imgFront);
  cardBack.append(imgBack);
  cardInner.append(cardFront);
  cardInner.append(cardBack);

  card.append(cardInner);

  return card;
}


let firstCard      = undefined;
export let points  = 0;
let consWrongGuess = 0;

export function flipCard(card) {
    card.classList.toggle("flip-card-hover");
    card.firstElementChild.classList.toggle("flip-card-inner-rotate");
    
    //if user select the second card
    if (firstCard) {
        if (card.dataset.dataurl === firstCard.dataset.dataurl) {
            // if 2 cards matched
            points          += 12.5;
            consWrongGuess   = 0
            firstCard        = undefined;
        } else {
            //if 2 cards not matched
            setTimeout(() => {
                if (consWrongGuess === 3) {
                    consWrongGuess = 0;
                    points = 0;
                } else {
                    consWrongGuess++;
                }

                console.log('not matched', points, consWrongGuess);
                card.classList.toggle("flip-card-hover");
                card.firstElementChild.classList.toggle("flip-card-inner-rotate");
                
                firstCard.classList.toggle('flip-card-hover');
                firstCard.firstElementChild.classList.toggle("flip-card-inner-rotate");
                firstCard = undefined;
            }, 1000)

        }
        //if user select the first card.
    } else {
        firstCard = card;
        console.log('first card data added.');
    }
}





//generate 16 cards
export function generateAllCards() {
  let images = [
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    image_7,
    image_8,
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    image_7,
    image_8,
  ];
  let cards = [];
    
    for (let i = 0; i < 16; i++) {
        //shuffle images between cards
        let randomIndex = Math.floor(Math.random() * images.length);
        cards.push(createCard(images[randomIndex]));
        images.splice(randomIndex, 1);
  }

  return cards;
}




export function addListenerToCards() {
    let cards = document.querySelectorAll("#card");
    for (let card of Array.from(cards)) {
        card.addEventListener(
        "click",
        (event) => {
            let element = event.currentTarget;
            if (element.id === "card") {
            // console.log(element);
            flipCard(element);
            }
        },
        true
        );
    }
}