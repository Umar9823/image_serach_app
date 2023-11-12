const accesskey = "Aju20PPvhuwvg32O2pR2Z5d2zihcHSNtxKk2-rYBE4s";

const formElement = document.querySelector("form");
const inputElement = document.querySelector("#search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");


let inputData = "";
let page_no = 1;

 async function serachImage(){
    inputData = inputElement.value
    const url = `https://api.unsplash.com/search/photos?page=${page_no}&query=${inputData}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page_no === 1){
        searchResult.innerHTML = "";
    }

    results.map((result)=>{
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("search-result");

        const image = document  .createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLinks = document.createElement("a");
        imageLinks.href = result.links.html;
        imageLinks.target = "_blank";
        imageLinks.textContent = result.alt_description;


        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLinks);
        searchResult.appendChild(imagewrapper);
    });
    page_no++
    if(page_no>1){
        showMore.style.display = "block"
    }
}

formElement.addEventListener("submit",(event)=>{
    event.preventDefault()
    page_no = 1
    serachImage()
})

showMore.addEventListener("click",(event)=>{
    serachImage()
})