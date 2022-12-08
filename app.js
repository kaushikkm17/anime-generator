// wrap in an IIFE

//***DOM Elements***//
const $nav = $("#navbar");
const $showBtn = $("#show-btn");
const $charBtn = $("#char-btn");
const $mainHeader = $("#main-header");
const $form = $("form");
const $retrievedImg = $("#retrieved-img");
const $retrievedData = $("#retrieved-data");
const $generateBtn = $("#generate-btn");

//***Functions***//
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//***Event Listeners***//

//when button is clicked, get data and put in dom
$("#search-form").on("submit", (e) => {
    e.preventDefault();
    const $input = $("#search-form input").val();
    const fixedInput = $input.split(" ").join("%20");
    $.ajax({
        url: `https://kitsu.io/api/edge/anime?filter[text]=${fixedInput}`,
    }).then(
        (data) => {
            console.log(data.data[0].attributes.coverImage.original);
            $retrievedImg.html(
                `<img src=${data.data[0].attributes.coverImage.original}>`
            );
        },
        (error) => console.log(error)
    );
});

$showBtn.on("click", (e) => {
    $charBtn.css("color", "black");
    e.target.style.color = "white";
    $mainHeader.text("Generate Random Anime");
    $generateBtn.attr("class", "generating-anime");
});
$charBtn.on("click", (e) => {
    $showBtn.css("color", "black");
    e.target.style.color = "white";
    $mainHeader.text("Generate Random Character");
    $generateBtn.attr("class", "generating-char");
});

$generateBtn.on("click", () => {
    if ($generateBtn.attr("class") === "generating-anime") {
        let animeName = "";
        let imgUrl = "";
        let summary = "";
        $.ajax({
            url: `https://kitsu.io/api/edge/anime/${getRandomInt(1, 14268)}`,
        }).then(
            (res) => {
                animeName = res.data.attributes.canonicalTitle;
                imgUrl = res.data.attributes.posterImage.original;
                summary = res.data.attributes.synopsis;
                $retrievedImg.html(`<img src='${imgUrl}' alt='anime image'>`);
                $retrievedData.html(
                    `<strong>Title:</strong> ${animeName}<strong>  Summary:</strong> ${summary}`
                );
            },
            (error) => console.log(error)
        );
    } else if ($generateBtn.attr("class") === "generating-char") {
        let charName = "";
        let imgUrl = "";
        let description = "";
        $.ajax({
            url: `https://kitsu.io/api/edge/characters/${getRandomInt(
                1,
                105893
            )}`,
        }).then(
            (res) => {
                charName = res.data.attributes.name;
                imgUrl = res.data.attributes.image.original;
                summary = res.data.attributes.description;
                $retrievedImg.html(`<img src='${imgUrl}' alt='anime image'>`);
                $retrievedData.html(
                    `<strong>Name: </strong>${charName}<strong>  Description: </strong>${summary}`
                );
            },
            (error) => console.log(error)
        );
    }
});
