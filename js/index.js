// Retrieve the Vegetarian state from localStorage
let Vegetarian = localStorage.getItem('Vegetarian') === 'true';
let Carnivore = false;
let zipCode = localStorage.getItem('zipCode')



// MEAT RECIPE URLS AND NAMES
const MEATLINKS = [
    "https://www.foodnetwork.com/recipes/ina-garten/mac-and-cheese-recipe2-1945401",
    "https://www.foodnetwork.com/recipes/tyler-florence/chicken-enchiladas-recipe-1907241",
    "https://foodnetwork.com/recipes/alton-brown/who-loves-ya-baby-back-recipe-1937448",
    "https://www.foodnetwork.com/recipes/aarti-sequeira/sloppy-bombay-joes-recipe-1921632",
    "https://www.foodnetwork.com/recipes/giada-de-laurentiis/lasagna-rolls-recipe-1943979"
];
const MEATLINKNAMES = [
    "Home-Made Mac and Cheese?",
    "Chicken Enchiladas?",
    "Who Loves Ya Baby-Back Ribs?",
    "Sloppy Bombay Joes?",
    "Lasagna Rolls?"
];

// VEGETARIAN RECIPE URLS AND NAMES
const VEGETARIANLINKS = [
    "https://www.allrecipes.com/recipe/231457/pesto-spaghetti-squash/",
    "https://www.allrecipes.com/recipe/13606/awesome-broccoli-cheese-casserole/",
    "https://www.allrecipes.com/recipe/72508/the-best-vegetarian-chili-in-the-world/",
    "https://www.delish.com/cooking/recipe-ideas/a39975008/slutty-vegan-one-night-stand-burger-recipe/",
    "https://www.feastingathome.com/vegetarian-enchiladas/"
];
const VEGETARIANLINKNAMES = [
    "Pesto Spaghetti Squash?",
    "Broccoli-Cheese Casserole?",
    "The Best Vegetarian Chili in the World?",
    "Slutty Vegan, One Night Stand Burger?",
    "Vegetarian Enchiladas"
];

// Maintain arrays of unused indices
let unusedMeatIndices = [...Array(MEATLINKS.length).keys()];
let unusedVegetarianIndices = [...Array(VEGETARIANLINKS.length).keys()];

// Function to select a random index from an array and ensure it's not repeated
function getRandomUnusedIndex(indices) {
    if (indices.length === 0) return -1; // No more indices to pick from
    const randomIndex = Math.floor(Math.random() * indices.length);
    return indices.splice(randomIndex, 1)[0]; // Remove and return the selected index
}

// Update the link in the HTML
function updateLink(num) {
    const linkElement = document.getElementById('randomLink');
    if (Vegetarian) {
        linkElement.href = VEGETARIANLINKS[num];
    } else {
        linkElement.href = MEATLINKS[num];
    }
}

let randomRestaurant;
let restaurantName;

function displayRandomRestaurant() {
    const loading = document.getElementById('restaurantDisplay');
    loading.innerHTML = '<h4 id="loadingupdater"></h4>';
    const zipCode = localStorage.getItem('zipCode');
    const storedRestaurants = localStorage.getItem(`restaurants_${zipCode}`);

    if (storedRestaurants) {
        const restaurants = JSON.parse(storedRestaurants);
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        const randomRestaurant = restaurants[randomIndex];

        const restaurantElement = document.getElementById('restaurantDisplay');
        if (restaurantElement) {

            // Ensure that categories exist before trying to map over them
            let categories = "N/A"; // Default value if categories are not available
            if (randomRestaurant.categories) {
                categories = randomRestaurant.categories.map(category => category.title).join(', ');
            }


            restaurantName = randomRestaurant.name
            restaurantElement.innerHTML = `
                <h2>${randomRestaurant.name}</h2>
                <p class="small">They have: ${categories}</p>
                <p class="small">Rating: ${randomRestaurant.rating} stars</p>
                <a class="yelp" href="${randomRestaurant.url}" target="_blank">View on Yelp</a>
            `;
        }
    } else {
        console.error('No restaurants found in localStorage for this ZIP code.');
    }
}






// Update the visible name in the HTML
function updateRecipe(num) {
    const recipeElement = document.getElementById('recipeName');
    if (Vegetarian) {
        recipeElement.textContent = VEGETARIANLINKNAMES[num];
    } else {
        recipeElement.textContent = MEATLINKNAMES[num];
    }
}

// FUNCTION TO PICK LINK AND SET URL (PUT IT ALL TOGETHER)
function pickFromList() {
    let choiceFromList;
    if (Vegetarian) {
        choiceFromList = getRandomUnusedIndex(unusedVegetarianIndices);
        if (unusedVegetarianIndices.length === 0) {
            unusedVegetarianIndices = [...Array(VEGETARIANLINKS.length).keys()]; // Reset indices
        }
    } else {
        choiceFromList = getRandomUnusedIndex(unusedMeatIndices);
        if (unusedMeatIndices.length === 0) {
            unusedMeatIndices = [...Array(MEATLINKS.length).keys()]; // Reset indices
        }
    }

    if (choiceFromList !== -1) {
        setTimeout(() => {
            updateLink(choiceFromList);
            updateRecipe(choiceFromList);
        }, 200);
    }
}


const apiKey = 'V9RBlRvhZanOy6MZ-D758cHnfQ_v8sOVfrS7XMnS7ZgQErfodpfZgUTGO4aPqzMbvy2OCYgj7QjVX_Vjub3j4zNiupwZ5rcXk3h5Lzh4ChBT3QYhh9kKylNNXFLNZnYx'; // Replace with your actual Yelp API key
const baseUrl = 'https://api.yelp.com/v3/businesses/search';

// Function to call the Yelp API
function fetchRestaurants(zipCode, radiusInMiles) {
    const radiusInMeters = radiusInMiles * 1609.34;
    const url = `${baseUrl}?location=${zipCode}&categories=restaurants&limit=20`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.businesses) {
            const restaurantList = data.businesses.map(business => ({
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zip_code: business.location.zip_code,
                phone: business.phone,
                rating: business.rating,
                url: business.url,
                categories: business.categories // Extract the type of food
            }));

            console.log(restaurantList.categories);
            // Store the restaurant list in localStorage
            localStorage.setItem(`restaurants_${zipCode}`, JSON.stringify(restaurantList));

            console.log('Restaurants saved to localStorage:', restaurantList);
        } else {
            console.error('No restaurants found for this ZIP code:', zipCode);
        }
    })
    .catch(error => console.error('Error fetching restaurants:', error));
}

//Function to pull up a google map for directions
function openDirections(restaurant) {
    const destination = `${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`;
    //const origin = zipCode; // Assuming zipCode is the user's location
    console.log(`Opening directions to: ${destination}`)
    console.log(`Opening directions to: ${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
    window.open(url, '_blank');
}


// Set up the initial link and update on page load & load new pages -- question updates
window.onload = function() {
    console.log( window.location.href )
    if (window.location.pathname.endsWith('Index5.html')) {
        pickFromList();
        const recipeElement = document.getElementById('no');
        recipeElement.addEventListener('click', pickFromList);
    }


    /// FIRST QUESTION ( DO YOU WANT TO EAT OUT?)
    if (window.location.pathname.endsWith('netlify.app/')) {
        document.getElementById('noEattingOut').addEventListener('click', function() {
            document.getElementById('Question').textContent = "OK, Probably for the best....Give me a sec...";
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            setTimeout(() => {
                window.location.href = 'Index2.html';
            }, 3000);
        });

        document.getElementById('yesEattingOut').addEventListener('click', function() {
            document.getElementById('Question').textContent = "Alright, then I will need something from you...";
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

            setTimeout(() => {
                window.location.href = 'Index3(zipcode).html';
            }, 3000);
        });
    }

    ///QUESTION (WHATS YOUR ZIP CODE???)
    if (window.location.pathname.endsWith('Index3(zipcode).html')){
    document.getElementById('submitZipCode').addEventListener('click', function() {
        // Get the value from the input field
        let zipCode = document.getElementById('zipCode').value;

        // Check if the input is not empty
        if (zipCode) {
            // Log the zip code to the console
            localStorage.setItem('zipCode', zipCode);
            fetchRestaurants(zipCode,15);
            console.log("Entered ZIP Code:", zipCode);
            document.getElementById('Question').textContent = "Perfect! Let's find some resturants near you!";
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            setTimeout(() => {
                window.location.href = 'Index4(resturants).html';
            }, 3000);
            // You can use this zipCode variable wherever you need it
        } else {
            // Handle the case where the input is empty
            alert("Please enter a ZIP Code");
        }
    });
}


    /// SECOND QUESTION ( DO YOU WANT TO EAT MEAT?)
    if (window.location.pathname.endsWith('Index2.html')) {
        document.getElementById('noEattingAnimals').addEventListener('click', function() {
            Vegetarian = true;
            localStorage.setItem('Vegetarian', 'true');  // Save the state
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            document.getElementById('Question').textContent = "Awesome, Let me pull up some of the best vegetarian recipes!";
            setTimeout(() => {
                window.location.href = 'Index.html';
            }, 2500);
        });

        document.getElementById('yesEattingAnimals').addEventListener('click', function() {
            Vegetarian = false;
            localStorage.setItem('Vegetarian', 'false');  // Save the state
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            document.getElementById('Question').textContent = "Awesome, Let me pull up some of the best recipes!";
            setTimeout(() => {
                window.location.href = 'Index5.html';
            }, 3000);
        });
    }


    //RESTARNT LIST
    if (window.location.pathname.endsWith('Index4(resturants).html')) {
        displayRandomRestaurant();

        document.getElementById('yes').addEventListener('click', function() {
        document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller" id="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

            // Use the random restaurant in the setTimeout function


            setTimeout(function() {

                console.log(restaurantName);
                document.getElementById("lds-roller").innerHTML = '<h4 id="loadingupdater"></h4>';
                window.open(`https://www.google.com/maps/search/${restaurantName}`, '_blank');
            }, 1000);


        });

        document.getElementById('no').addEventListener('click', function() {
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            setTimeout(() => {
                displayRandomRestaurant();
                document.getElementById("loadingupdater").innerHTML = `<h4 id="loadingupdater"></h4>`
            }, 1000);
        });

    }



}
