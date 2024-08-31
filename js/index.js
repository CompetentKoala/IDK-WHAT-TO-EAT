// Retrieve the Vegetarian state from localStorage
let Vegetarian = localStorage.getItem('Vegetarian') === 'true';
let Carnivore = false;
let zipCode = localStorage.getItem('zipCode')




// MEAT RECIPE URLS AND NAMES
const MEATLINKS = [
    "https://www.foodnetwork.com/recipes/ina-garten/mac-and-cheese-recipe2-1945401",
    "https://www.foodnetwork.com/recipes/tyler-florence/chicken-enchiladas-recipe-1907241",
    "https://foodnetwork.com/recipes/alton-brown/who-loves-ya-baby-back-recipe-1937448",
    "https://www.foodnetwork.com/recipes/rachael-ray/super-sloppy-joes-recipe-1953228",
    "https://www.foodnetwork.com/recipes/giada-de-laurentiis/lasagna-rolls-recipe-1943979"
];
const MEATLINKNAMES = [
    "Home-Made Mac and Cheese?",
    "Chicken Enchiladas?",
    "Who Loves Ya Baby-Back Ribs?",
    "Super Sloppy Joes?",
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
    "Vegetarian Enchiladas?"
];

// LINK IMAGES
const MEATIMAGES = [
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/6/5/1/IG1B07F_Mac-and-Cheese_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1402190718039.webp",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/4/30/0/Cinco_Enchiladas.jpg.rend.hgtvcom.1280.720.suffix/1602522668347.webp",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/10/28/0/top10_wholovesyababyback_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1392170497546.webp",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2003/10/28/2/tm1c36_sloppy_joe.jpg.rend.hgtvcom.1280.720.suffix/1384540643803.webp",
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/6/6/0/EI1F15_Lasagna-Rolls_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1382539995218.webp"
];

// VEGETARIAN RECIPE IMAGE URLs
const VEGETARIANIMAGES = [
"https://www.allrecipes.com/thmb/9SjWRMUgw31icCrRBEBvrNfEGZQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2436180-pesto-spaghetti-squash-Allrecipes-Magazine-4x3-1-efcb667604214b89be9dc1335ac4584f.jpg",
    "https://www.allrecipes.com/thmb/gKdiuXhJL4E4pWII_YsMp38Iteo=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/13606-awesome-broccoli-cheese-casserole-DDMFS-beauty-4x3-BG-31688-0b12a068089b4bcb875cc08a192bccb3.jpg",
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F05%2F14%2F9215371-The-Best-Vegetarian-Chili-in-The-World-NatashaForestBrown-1x1-1.jpg&q=60&c=sc&poi=auto&orient=true&h=512",
    "https://hips.hearstapps.com/hmg-prod/images/slutty-vegan-burger1-1652364652.jpg?crop=0.869xw:0.801xh;0.131xw,0.0370xh&resize=640:*",
    "https://www.feastingathome.com/wp-content/uploads/2019/09/Vegetarian-Enchiladas_-14.jpg"
];

// Maintain arrays of unused indices
let unusedMeatIndices = [...Array(MEATLINKS.length).keys()];
let unusedVegetarianIndices = [...Array(VEGETARIANLINKS.length).keys()];
let usedRestaurantIndices = [];


// Function to select a random index from an array and ensure it's not repeated
function getRandomUnusedIndex(indices) {
    if (indices.length === 0) return -1; // No more indices to pick from
    const randomIndex = Math.floor(Math.random() * indices.length);
    return indices.splice(randomIndex, 1)[0]; // Remove and return the selected index
}
// Function to select a random index from restaurant array and ensure it's not repeated
function getRandomUnusedIndex(indices) {
    if (indices.length === 0) return -1; // No more indices to pick from
    const randomIndex = Math.floor(Math.random() * indices.length);
    return indices.splice(randomIndex, 1)[0]; // Remove and return the selected index
}


let restaurantAddress;
let randomRestaurant;
let restaurantName;

// Function to reset the used indices
function resetUsedIndices() {
    const zipCode = localStorage.getItem('zipCode');
    const storedRestaurants = localStorage.getItem(`restaurants_${zipCode}`);

    if (storedRestaurants) {
        const restaurants = JSON.parse(storedRestaurants);
        usedRestaurantIndices = [...Array(restaurants.length).keys()]; // Reset indices
    }
}

let resturantImageUrl

function displayRestaurantImage(imageUrl) {
    resturantImageUrl= imageUrl
}


function displayRandomRestaurant() {
    const loading = document.getElementById('restaurantDisplay');
    loading.innerHTML = '<h4 id="loadingupdater"></h4>';
    const zipCode = localStorage.getItem('zipCode');
    const storedRestaurants = localStorage.getItem(`restaurants_${zipCode}`);

    if (storedRestaurants) {
        const restaurants = JSON.parse(storedRestaurants);

        // Reset used indices if all restaurants have been shown
        if (usedRestaurantIndices.length === 0) {
            resetUsedIndices();
        }

        const randomIndex = getRandomUnusedIndex(usedRestaurantIndices);

        if (randomIndex !== -1) {
            const randomRestaurant = restaurants[randomIndex];
            let categories = "N/A"; // Default value if categories are not available
            if (randomRestaurant.categories) {
                categories = randomRestaurant.categories.map(category => category.title).join(', ');
            }
            restaurantAddress = randomRestaurant.address
            restaurantName = randomRestaurant.name;
            const restaurantElement = document.getElementById('restaurantDisplay');
            if (restaurantElement) {

                    displayRestaurantImage(randomRestaurant.imageUrl);

                restaurantElement.innerHTML = `
                    <h2>${randomRestaurant.name}?</h2>
                    <p class="small">They have: ${categories}</p>
                    <p class="small">Rating: ${randomRestaurant.rating} stars</p>
                    <a class="yelp" href="${randomRestaurant.url}" target="_blank">View on Yelp</a>
                `;
            }
        } else {
            console.error('No valid restaurant available.');
        }
    } else {
        console.error('No restaurants found in localStorage for this ZIP code.');
    }
}


// Update the visible name and image in the HTML
function updateRecipe(num) {
    const recipeElement = document.getElementById('recipeName');
    const recipeImageElement = document.getElementById('recipeImage');

    if (Vegetarian) {
        recipeImageElement.src = VEGETARIANIMAGES[num];
        recipeElement.textContent = VEGETARIANLINKNAMES[num];

    } else {
        recipeElement.textContent = MEATLINKNAMES[num];
        recipeImageElement.src = MEATIMAGES[num];
    }
    console.log('Recipe updated to:', recipeElement.textContent);
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
            updateLink(choiceFromList);
            updateRecipe(choiceFromList);

    } else {
        console.error('No valid choice available.');
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
                categories: business.categories,
                image_url: business.image_url // Extract the type of food
            }));
            console.log(restaurantList.photos);
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

//IF MOBILE DEVICE, open google or apple maps instead of browser links
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function isSafariBrowser() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function openMaps(restaurantName) {
    if (!isMobileDevice()) {
        return; // Do nothing if it's not a mobile device
    }

    let mapsUrl = '';

    if (isSafariBrowser()) {
        // Open Apple Maps on Safari
        mapsUrl = `http://maps.apple.com/?q=${encodeURIComponent(restaurantName)}`;
    } else {
        // Open Google Maps otherwise
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantName)}`;
    }

    window.location.href = mapsUrl;
}


// Set up the initial link and update on page load & load new pages -- question updates
window.onload = function() {
    if (window.location.pathname.endsWith('index5')) {
        pickFromList();

        // Optional: Handle the "No" button click to choose another recipe
         // Get the image element
         const image = document.querySelector('#recipeDisplay img');

         if (image) {
            document.getElementById('no').addEventListener('click', function() {
                // Add fade-out class to start animation
                image.classList.add('fade-out');
                setTimeout(() =>  pickFromList(), 600);


                // Wait for the fade-out animation to complete
                image.addEventListener('animationend', function handleFadeOut() {
                    // Remove the fade-out class
                    image.classList.remove('fade-out');

                    // Update the image source after fade-out
                     // Ensure this function updates the image source

                    // Set a delay to ensure the image source is updated before fading in
                    setTimeout(function() {
                        image.classList.add('fade-in');

                        // Optionally remove fade-in class after animation
                        setTimeout(() => image.classList.remove('fade-in'), 0); // Adjust timing as needed
                    }, 1000); // Small delay to ensure source change is applied
                    image.removeEventListener('animationend', handleFadeOut);
                });
            });
        } else {
            console.error('Image not found!');
        }


        //Give response when clicked yes
        document.querySelector('.yes').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor action

            const link = event.currentTarget.querySelector('a').href;

            // Set a delay before opening the link
            setTimeout(function() {

                window.open(link, '_blank');; // Open the link after the delay
            }, 1000); // 1000 milliseconds = 1 second delay
        });
    }


    /// FIRST QUESTION ( DO YOU WANT TO EAT OUT?)
    if (window.location.pathname.endsWith('/')) {
        setTimeout(() => {
            document.getElementById('welcome').classList.add("fadeOut");
        }, 6000);
        document.getElementById('noEattingOut').addEventListener('click', function() {
            document.getElementById('Question').textContent = "OK, Probably for the best....Give me a sec...";
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            setTimeout(() => {
                window.location.href = 'index2';
            }, 3000);
        });

        document.getElementById('yesEattingOut').addEventListener('click', function() {
            document.getElementById('Question').textContent = "Alright, then I will need something from you...";
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

            setTimeout(() => {
                window.location.href = 'index3(zipcode)';
            }, 3000);
        });
    }


    /// QUESTION (WHATS YOUR ZIP CODE???)
    if (window.location.pathname.endsWith('index3(zipcode)')){
    document.getElementById('submitZipCode').addEventListener('click', function() {
        // Get the value from the input field
        let zipCode = document.getElementById('zipCode').value;

        // Check if the input is not empty
        if (zipCode) {
            // Log the zip code to the console
            localStorage.setItem('zipCode', zipCode);
            fetchRestaurants(zipCode,5);
            console.log("Entered ZIP Code:", zipCode);
            document.getElementById('Question').textContent = "Perfect! Let's find some resturants near you!";
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            setTimeout(() => {
                window.location.href = 'index4(resturants)';
            }, 3000);
            // You can use this zipCode variable wherever you need it
        } else {
            // Handle the case where the input is empty
            alert("Please enter a ZIP Code");
        }
    });
}


    /// SECOND QUESTION ( DO YOU WANT TO EAT MEAT?)
    if (window.location.pathname.endsWith('index2')) {
        document.getElementById('noEattingAnimals').addEventListener('click', function() {
            Vegetarian = true;
            localStorage.setItem('Vegetarian', 'true');  // Save the state
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            document.getElementById('Question').textContent = "Did you know that Paul Mccartney is vegetarian?";
            setTimeout(() => {
                window.location.href = 'index5';
            }, 2000);
        });

        document.getElementById('yesEattingAnimals').addEventListener('click', function() {
            event.preventDefault()
            Vegetarian = false;
            localStorage.setItem('Vegetarian', 'false');  // Save the state
            document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            document.getElementById('Question').textContent = " Did you know that 63% of animal species are carnivores??";
            setTimeout(() => {
                window.location.href = 'index5';
            }, 2000);
        });
    }


    /// RESTARNT LIST
    if (window.location.pathname.endsWith('index4(resturants)')) {
        displayRandomRestaurant();


        document.getElementById('yes').addEventListener('click', function() {
        document.getElementById("loadingupdater").innerHTML = '<div class="lds-roller" id="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

            // Use the random restaurant in the setTimeout function


            setTimeout(function() {

                console.log(restaurantName);
                document.getElementById("lds-roller").innerHTML = '<h4 id="loadingupdater"></h4>';
                openMaps(restaurantName);
                window.open(`https://www.google.com/maps/search/${restaurantName} ${restaurantAddress}`, '_blank');
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
