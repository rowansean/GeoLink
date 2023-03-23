# Countries and States
This project features a single-page website that allows the user to interact with an external REST API that I created to get data about countries and states. The website is built using React.JS and BootStrap for the front end, and Django for the backend.

![UI]( https://github.com/SeanTheDev/CountriesAndStates-React/blob/main/UI.png?raw=true)
<hr>

## Features
<strong>Country Dropdown:</strong> When the page loads, a dropdown menu is populated with the results from a GET call to a Django development server. The user can select a country from this dropdown.

<strong>State Dropdown:</strong> When a country is selected from the country dropdown, a second dropdown is populated with the results from a GET call to https://xc-countries-api.fly.dev/api/countries/<country_code>/states/. The user can select a state from this dropdown.

<strong>Add New Country and State:</strong> The user can also add a new country or state by sending a POST call to https://xc-countries-api.fly.dev/api/countries/ or https://xc-countries-api.fly.dev/api/states/, respectively.

