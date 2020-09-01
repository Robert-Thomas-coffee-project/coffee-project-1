"use strict"
// create innerHTML
function renderCoffee(coffee) {
    var html = '<div class="coffee col-6">';
    html += '<h3 class="d-inline-block px-1">' + coffee.name +  '</h3>'
    html += '<p class="d-inline-block px-1 text-muted">' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

// puts items in ascending order
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// updates coffee menu
function updateCoffees() {
    var selectedRoast = roastSelection.value;
    coffees.forEach(function (coffee) {
        if(selectedRoast === "all") filteredCoffees.push(coffee);
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    })
    coffeeMenu.innerHTML = renderCoffees(filteredCoffees);
}

// coffee array
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];


// variables
let filteredCoffees = [...coffees];
let coffeeMenu = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let nameSearch = document.getElementById("nameSearch");
// create coffee vars
let newCoffee = document.getElementById("newCoffee")
let newRoast = document.getElementById("new-selection")
let submit = document.getElementById("user-submit")
//sets the HTML
coffeeMenu.innerHTML = renderCoffees(coffees);

//text input search for coffee
const coffeeValue = function(){
    let searchName = nameSearch.value;
    coffeeMenu.innerHTML = renderCoffees(
        filteredCoffees.filter(function(coffee) {
            if (coffee.name.toLowerCase().includes(searchName.toLowerCase())) {
                return coffee;
            }
        })
    )
}

//adds user search query input to menu
const userCoffee = function () {
    coffees.push({id: coffees.length+1, name: newCoffee.value, roast: newRoast.value},)
    filteredCoffees = [];
    updateCoffees();
}

//searches while typing
nameSearch.addEventListener("keyup", coffeeValue) ;
roastSelection.addEventListener('change', ()=> {
    filteredCoffees = [];
    updateCoffees();
})

// search submit button
submitButton.addEventListener('click', ()=> {
    filteredCoffees = [];
    updateCoffees();
})
// create coffee submit button
submit.addEventListener("click",userCoffee)