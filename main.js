"use strict"
// create innerHTML
function renderCoffee(coffee) {
    let html = '<div class="coffee col-6 d-flex align-items-baseline">';
    html += '<a onclick="coffeeLog(this)" id="'+ coffee.id +'" class="finalCoffee" href="#">';
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
const coffeeMenu = document.querySelector('#coffees');
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');
const nameSearch = document.getElementById("nameSearch");
const cartNotification = document.getElementById('cartBadge');
// create coffee vars
const newCoffee = document.getElementById("newCoffee");
const newRoast = document.getElementById("new-selection");
const submit = document.getElementById("user-submit");

// create localStorage
const saveLocalStorage = ()=>{
    let JSONReadyCoffees = JSON.stringify(coffees);
    localStorage.setItem('coffees',JSONReadyCoffees);
    coffees = JSON.parse(localStorage['coffees']);
};

//render innerHTML from js || localStorage
localStorage.hasOwnProperty("coffees") ? (coffees = JSON.parse(localStorage['coffees'])) : saveLocalStorage();
coffeeMenu.innerHTML = renderCoffees(coffees);

// save new coffee to localStorage & render new menu
const createCoffee = ()=> {
    if(newCoffee.value) {
        coffees.push({id: coffees.length + 1, name: newCoffee.value, roast: newRoast.value});
        saveLocalStorage();
        updateCoffees();
        animate();
    }
};

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

// dynamic input search
nameSearch.addEventListener("keyup", coffeeSearchValue);
roastSelection.addEventListener('change', updateCoffees);

// search submit button
submitButton.addEventListener('click', updateCoffees);

// create new coffee submit button
submit.addEventListener("click",()=>{
    createCoffee();
    newCoffee.value = "";
});

// animation on create coffee
const button = document.getElementById("btn");
const animate = ()=> {
    button.classList.remove("d-none");
    setTimeout(()=>{ button.className += " active "; }, 100);
    button.click();
    setTimeout(()=>{
        button.className += " d-none ";
        button.classList.remove("active");}, 4000
    );
};
button.addEventListener("click", animate);

// receipt
const coffeeReceipt = document.getElementById("coffeeReceipt");
const renderReceipt = ()=> {
    let html = '';
    cartItems.forEach((c,i)=>{
       html+= renderItem(c,i);
    })
    coffeeReceipt.innerHTML = html;
    cartNotification.innerText = cartItems.length > 0 ?  cartItems.length.toString(): "";
    return html;
}
const renderItem = (c,i)=>{
    let html = '<tr>';
    html += '<th scope="row">'+(i+1)+'</th>'
    html += '<td class="">'+ c.name +'</td>';
    html += '<td class="">'+c.size+'</td>';
    html += '<td class="">'+c.prize+'</td>';
    html += '</tr>';
    return html;
}

// choose coffee and size
let chosenCoffee = '';
let cartItems = [];
const sizeSelectForm = document.getElementById("shoppingForm");
const sizeSubmit = document.getElementById('toCart');
// form radio options
const opt1 = document.getElementById('opt1');
const opt2 = document.getElementById('opt2');
const opt3 = document.getElementById('opt3');

const coffeeLog = (x)=> {
    chosenCoffee = x.firstChild.innerText;
    $('#sizeCheckModal').modal('show');
}

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
    sizeSelectForm.reset();
    cartItems.push(item);
    saveCartLocalStorage();
    renderReceipt();
    $('#sizeCheckModal').modal('hide');
}
sizeSubmit.addEventListener('click',sizeCheck);

// create cart to localStorage
const saveCartLocalStorage = ()=>{
    let JSONReadyCoffees = JSON.stringify(cartItems);
    localStorage.setItem('cartItems',JSONReadyCoffees);
    cartItems = JSON.parse(localStorage['cartItems']);
};

//render cart innerHTML from js || localStorage
localStorage.hasOwnProperty("cartItems") ? (cartItems = JSON.parse(localStorage['cartItems'])) : saveCartLocalStorage();
renderReceipt(cartItems);

//clear cart
const clearCartBtn = document.getElementById('clearCart');
const emptyCart = ()=>{
    cartItems = [];
    saveCartLocalStorage();
    renderReceipt();
    $('#coffeeModal').modal('hide');
}
clearCartBtn.addEventListener('click',emptyCart);