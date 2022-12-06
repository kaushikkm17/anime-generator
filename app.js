// wrap in an IIFE

//***DOM Elements***//
const $nav = $('#navbar')
const $showBtn = $('#show-btn')
const $charBtn = $('#char-btn')
const $mainHeader = $('#main-header')
const $form = $('form')
const $retrievedImg = $('#retrieved-img')
const $retrievedData = $('#retrieved-data')

//***Functions***//


//***Event Listeners***//

//when button is clicked, get data and put in dom
$('#search-form').on('submit', (e) => {
    e.preventDefault()
    const $input = $('#search-form input').val()
    const fixedInput = $input.split(' ').join('%20')
    $.ajax({
        url: `https://kitsu.io/api/edge/anime?filter[text]=${fixedInput}`
    })
    .then(
        data => {
            console.log(data.data[0].attributes.coverImage.original)
            $retrievedImg.html(
                `<img src=
                ${data.data[0].attributes.coverImage.original}>`)
        },
        error => console.log(error)
    )
    
    
})



//**planning**//
//get data to output when someone clicks the submit button based on input

