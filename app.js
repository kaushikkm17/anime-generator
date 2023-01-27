
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
                    `<h3>${animeName}</h3>
                    <p>${summary}</p>`
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
