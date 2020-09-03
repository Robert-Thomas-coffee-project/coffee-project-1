"use strict"
// create innerHTML
function renderCoffee(coffee) {
    let html = '<div class="coffee col-6 d-flex align-items-baseline">';
    html += '<a onclick="coffeeLog(this)" class="finalCoffee" href="#">';
    html += '<h3 class="d-inline-block px-1">'+ coffee.name + '</h3>';
    html += '<p class="d-inline-block px-1 text-muted">' + coffee.roast + '</p>';
    html += '</a>';
    html += '</div>';
    return html;
}

// renders items in ascending order
const renderCoffees = (coffees)=> {
    let html = '';
    coffees.forEach((coffee)=>{
        html += renderCoffee(coffee);
    })
    return html;
}

// updates coffee menu
const updateCoffees = ()=> {
    filteredCoffees = []
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
let coffees = [
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

// default vars
let filteredCoffees = [...coffees];
let coffeeMenu = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let nameSearch = document.getElementById("nameSearch");
// create coffee vars
let newCoffee = document.getElementById("newCoffee");
let newRoast = document.getElementById("new-selection");
let submit = document.getElementById("user-submit");

// create localStorage
const saveLocalStorage = ()=>{
    let JSONReadyCoffees = JSON.stringify(coffees);
    localStorage.setItem('coffees',JSONReadyCoffees);
    coffees = JSON.parse(localStorage['coffees']);
};

//render innerHTML from js || localStorage
localStorage.hasOwnProperty("coffees") ? (coffees = JSON.parse(localStorage['coffees'])) : saveLocalStorage();
coffeeMenu.innerHTML = renderCoffees(coffees);

//text input search
const coffeeSearchValue = ()=>{
    let searchName = nameSearch.value;
    coffeeMenu.innerHTML = renderCoffees(
        filteredCoffees.filter(function(coffee) {
            if (coffee.name.toLowerCase().includes(searchName.toLowerCase())) {
                return coffee;
            }
        })
    )
};

// save new coffee to localStorage & render new menu
const createCoffee = ()=> {
    if(newCoffee.value) {
        coffees.push({id: coffees.length + 1, name: newCoffee.value, roast: newRoast.value});
        saveLocalStorage();
        updateCoffees();
        animate();
    }
};

//dynamic input search
nameSearch.addEventListener("keyup", coffeeSearchValue);
roastSelection.addEventListener('change', updateCoffees);

// search submit button
submitButton.addEventListener('click', updateCoffees);
// create coffee submit button
submit.addEventListener("click",()=>{
    createCoffee();
    newCoffee.value = "";
});

// animation
const button = document.getElementById("btn");
const animate = ()=> {
    button.classList.remove("d-none");
    setTimeout(()=>{ button.className += " active "; }, 100);
    document.getElementById('btn').click();
    setTimeout(()=>{
        button.className += " d-none ";
        button.classList.remove("active");}, 7000
    );
};
button.addEventListener("click", animate);

// receipt
function renderReceipt(c) {
    cartCount++;
    let html = document.getElementById("coffeeReceipt").innerHTML;
    html += '<tr>';
    html += '<th scope="row">'+cartCount+'</th>'
    html += '<td class="">'+ c.name +'</td>';
    html += '<td class="">'+c.size+'</td>';
    html += '<td class="">'+c.prize+'</td>';
    html += '</tr>';
    document.getElementById("coffeeReceipt").innerHTML = html;
    $('#coffeeModal').modal('show');
    return html;
}

// choose coffee modal
let chosenCoffee = '';
let cartCount = 0;
const coffeeLog = (x)=> {
    chosenCoffee = x.firstChild.innerText;
    $('#sizeCheckModal').modal('show');
}
const coffeeSize = document.getElementById('toCart');
const opt1 = document.getElementById('opt1');
const opt2 = document.getElementById('opt2');
const opt3 = document.getElementById('opt3');
const sizeCheck = ()=>{
    let item = {};
    item.name = chosenCoffee;
    if (opt1.checked) {
        item.size = "S"
        item.prize = 2.15;
    }else if (opt2.checked) {
        item.size = "M";
        item.prize = 2.45;
    }else if (opt3.checked) {
        item.size = "L"
        item.prize = 3.65;
    }else{
        return;
    }
    document.getElementById("shoppingForm").reset();
    $('#sizeCheckModal').modal('hide');
    renderReceipt(item);
}
coffeeSize.addEventListener('click',sizeCheck);