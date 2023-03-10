
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
    e.target.style.color = "white";
    e.target.style.opacity = 1
    $charBtn.css("opacity", 0.7)
    $mainHeader.text("Generate Random Anime");
    $generateBtn.attr("class", "generating-anime");
});
$charBtn.on("click", (e) => {
    e.target.style.color = "white";
    e.target.style.opacity = 1
    $showBtn.css("opacity", 0.7)
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
                $retrievedData.css("border", "0.2rem solid rgba(0,0,0,0.3)")
                $retrievedImg.html(`<img src='${imgUrl}' alt='anime image'>`);
                $retrievedData.html(
                    `<h3 class='retrieved-title'>${animeName}</h3>
                    <p class='retrieved-summary'>${summary}</p>`
                );
                $retrievedData.hide().delay(1000).fadeIn();
                $retrievedImg.hide().delay(1000).fadeIn();

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
                $retrievedData.css("border", "0.2rem solid rgba(0,0,0,0.3)")
                $retrievedImg.html(`<img src='${imgUrl}' alt='anime image'>`);
                $retrievedData.html(
                    `<h3 class='retrieved-title'>${charName}</h3>
                    <p class='retrieved-summary'>${summary}</p>`
                )

                $retrievedData.hide().delay(1000).fadeIn();
                $retrievedImg.hide().delay(1000).fadeIn();
            },
            (error) => console.log(error)
        );
    }
});
