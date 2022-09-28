root = document.getElementById("root");
const starimgs = [
    'img/Luke-skywalker.jpeg',
    'img/C-3PO.jpeg',
    'img/R2-D2.jpeg',
    'img/Darth Vader.jpeg',
    'img/Leia Organa.jpeg',
    'img/Owen Lars.jpeg',
    'img/beru-lars.jpeg',
    'img/R5-D4.jpeg',
    'img/Biggs Darklighter.jpeg',
    'img/Obi-Wan Kenobi.jpeg',
];

//fetches data from the API
async function fetchPeople() {
    let response = await fetch("https://swapi.dev/api/people");
    const {results} = await response.json();

    return results;
}

//creates the views for image, name, height, gender
function main( img, name, height, gender, clicked) {
    if(clicked == "y") {
        let removeDiv = document.getElementsByClassName("character-display")[0];
        removeDiv.remove();
    }

    let displayDiv = document.createElement('div');
        displayDiv.className = ["character-display container row grid-container"];
        // displayDiv.className = "container";
        // displayDiv.className = "row";

    let imgDiv = document.createElement('div');
        imgDiv.className = "col-md-8 p-5";

    let displayImg = document.createElement('img');
        displayImg.setAttribute("src", img);

        imgDiv.appendChild(displayImg)

    let textDiv = document.createElement('div');
        textDiv.className = "col-md-4 p-5 h1";

    let displayh2 = document.createElement('h2');
    let h2Txt = document.createTextNode(`Name:  ${name}`);
    displayh2.appendChild(h2Txt)

    let displayHt = document.createElement('p');
    let pHgtTxt = document.createTextNode(`Height: ${height}`);
    displayHt.appendChild(pHgtTxt)

    let displayGen = document.createElement('p');
    let pGenTxt = document.createTextNode(`Gender: ${gender}`);
    displayGen.appendChild(pGenTxt);

    
    displayDiv.appendChild(imgDiv)
    displayDiv.appendChild(textDiv)
    textDiv.appendChild(h2Txt)
    textDiv.appendChild(displayHt)
    textDiv.appendChild(displayGen)
    root.appendChild(displayDiv);

}

//
async function display(data) {
        let navDiv = document.createElement('div');
            navDiv.className = "main-page";
            
        let navUl = document.createElement('ul');
            data.forEach(charStar => {
            
        let navLi = document.createElement('li');
            
        let txtNode = document.createTextNode(charStar.name)
            navLi.appendChild(txtNode);
            navUl.appendChild(navLi);
            
    });

    navDiv.appendChild(navUl)
    root.appendChild(navDiv);

    //initializes the value for the image, name, height and gender to be displayed in main
    main(starimgs[0], data[0].name,data[0].height,data[0].gender,"n");

    //console.log("data1", data)
}

//request data from the starwar api fetchPeople above, loops through all the list and adds a click event to each list to display associated image, name, height and gender when clicked by calling the main function
(async () => {
    let data = await fetchPeople();
    await display(data)
    let allLi = document.getElementsByTagName("li");

    for(let i = 0; i < allLi.length; i++) {
        allLi[i].addEventListener("click", () => {
            main(starimgs[i], data[i].name,data[i].height,data[i].gender,"y");
        })
    }
    
})()

module.exports = { main }
