# Countries and States
This project is a single-page website that allows the user to interact with an external REST API to get data about countries and states. The website is built using HTML, CSS, and JavaScript.

![UI]( https://github.com/SeanTheDev/Countries-and-States/blob/main/UI.png?raw=true)
<hr>

## Features
<strong>Country Dropdown:</strong> When the page loads, a dropdown menu is populated with the results from a GET call to https://xc-countries-api.fly.dev/api/countries/. The user can select a country from this dropdown.

<strong>State Dropdown:</strong> When a country is selected from the country dropdown, a second dropdown is populated with the results from a GET call to https://xc-countries-api.fly.dev/api/countries/<country_code>/states/. The user can select a state from this dropdown.

<strong>Add New Country and State:</strong> The user can also add a new country or state by sending a POST call to https://xc-countries-api.fly.dev/api/countries/ or https://xc-countries-api.fly.dev/api/states/, respectively.

## Usage
To use this website, simply open the index.html file in your web browser. When the page loads, you will see a dropdown menu populated with a list of countries. Select a country from this dropdown to populate the second dropdown with a list of states for that country.

To add a new country or state, click the "Add Country" or "Add State" button, respectively. This will open a modal dialog where you can enter the necessary information. Click the "Save" button to send a POST call to the API and add the new country or state.
