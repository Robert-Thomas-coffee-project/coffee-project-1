"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee col-6">';
    html += '<h3>' + coffee.name +  '</h3>'
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

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

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
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
var filteredCoffees = [];
var coffeeMenu = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

coffeeMenu.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', ()=> {
    filteredCoffees = [];
    updateCoffees();
})

var nameSearch = document.getElementById("nameSearch");

var coffeeValue = function(){
    let searchName = nameSearch.value;

    coffeeMenu.innerHTML = renderCoffees(
        filteredCoffees.filter(function(coffee) {
            if (coffee.name.toLowerCase().startsWith(searchName.toLowerCase())) {
                return coffee;
            }
        })
    )
}

nameSearch.addEventListener("keyup", coffeeValue) ;
roastSelection.addEventListener('change', ()=> {
    filteredCoffees = [];
    updateCoffees();
})

                                     // creating users coffee

var userCoffee = function () {
    console.log(newCoffee.value);
    coffees.push({id: coffees.length+1, name: newCoffee.value, roast: newRoast.value},)
    updateCoffees();
}

var newCoffee = document.getElementById("newCoffee")
var newRoast = document.getElementById("new-selection")
var submit = document.getElementById("user-submit")

submit.addEventListener("click",userCoffee)