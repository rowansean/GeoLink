
// UI Components
const Header = (props) => {

    // Props: title, subtitle

    return (
        <div id="header">
            <h1>{props.title}</h1>
            <p>{props.subtitle}</p>
            <hr/>
        </div>
    );
}

const Dropdown = (props) => {

    // Props: id, label, defaultText, list, valueField, onChange

    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <select id={props.id} onChange={props.onChange}>
                <option value="" selected disabled>{props.defaultText}</option>  
                {/* Generate Option List */}
                {props.list.map((listItem, i) => {
                    // for value, specify which data should be used by using valueField prop
                    return <option key={i} value={listItem[props.valueField]}>{listItem.name}</option>
                })}
            </select>
        </div>
    );

}

const TextInput = (props) => {

    // Props: id, label, minlength, maxlength, onChange

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input type="text" id={props.id} name={props.id} minLength={props.minlength} maxLength={props.maxlength} onChange={props.onChange}/>
        </div>
    );
}

const SubmitButton = (props) => {

    return(
        <div>
            <label htmlFor={props.id}></label>
            <button id={props.id} onClick={props.onClick}>{props.buttonText}</button>
        </div>
    );
}

// Container Components
const SelectCountryAndStateForm = (props) => {

    // Props: countries
    // State: selectedCountryCode, currentCountryStates

    const [selectedCountryCode, setSelectedCountryCode] = React.useState(null);
    const [currentCountryStates, setCurrentCountryStates] = React.useState([]);

    // Lifecycle Methods
    const getCurrentCountryStates = () => {
        fetch(`http://127.0.0.1:8000/api/countries/${selectedCountryCode}/states`)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setCurrentCountryStates(data);
            });
    }

    return (
            <div>
                <Dropdown 
                    id="country-dropdown" 
                    label="Country:" 
                    defaultText="Select a country"
                    list={props.countries} 
                    valueField="code" 
                    onChange={handleCountryCodeChange}
                />
                <Dropdown 
                    id="state-dropdown"
                    label="State:"
                    defaultText="Select a state"
                    list={currentCountryStates}
                    valueField="code"
                />
            </div>
    );
    
}

const NewCountryForm = (props) => {

    // Props: getAllCountries
    // State: newCountryName, newCountryCode

    const [newCountryName, setNewCountryName] = React.useState('');
    const [newCountryCode, setNewCountryCode] = React.useState('');

    // Event Handlers
    const handleCountryNameChange = (event) => {
        // Sets the new country name to the value of the input field upon any changes
        setNewCountryName(event.target.value);
    }

    const handleCountryCodeChange = (event) => {
        // Sets the new country code to the value of the input field upon any changes
        setNewCountryCode(event.target.value);
    }

    const handleSubmit = async () => {

        /**
         * Creates a new country object with the new country name and code,
         * and sends a POST request to the API to create the new country.
         * 
         * After submitting, the form will clear 
         * and the user will be alerted of the success or failure of the request
         */

        fetch('http://127.0.0.1:8000/api/countries/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: newCountryCode,
                name: newCountryName
            })
        })
        .then(response => {
            if (response.ok){
                alert("Country successfully added!");
            } else {
                alert("Country could not be added. Please try again.");
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        //clear form after submission
        document.getElementById("newCountryName").value = "";
        document.getElementById("newCountryCode").value = "";
        await new Promise(r => setTimeout(r, 1500)); // wait 1.5 seconds before updating the list of countries
        props.getAllCountries();
    }

    // Render
    return (
        <div id="add-new-country">
                <h2>Add a New Country</h2>
                <TextInput 
                    id="newCountryName"
                    label="Country name:"
                    minlength="4"
                    onChange={handleCountryNameChange}
                />
                <TextInput 
                    id="newCountryCode"
                    label="Country code:"
                    minlength="2"
                    maxlength="3"
                    onChange={handleCountryCodeChange}
                />
                <SubmitButton 
                    id="submit-country"
                    buttonText="Submit"
                    onClick={handleSubmit}
                />
        </div>
    );

}

const NewStateForm = (props) => {
    
    // Props: getAllCountries
    // State: newStateName, newStateCode, countryID

    const [newStateName, setNewStateName] = React.useState('');
    const [newStateCode, setNewStateCode] = React.useState('');
    const [countryID, setCountryId] = React.useState(null);

    //When country dropdown changes, update state
    const handleCountryChange = (event) => {
        setCountryId(event.target.value);
    }

    // When state name changes, update state
    const handleStateNameChange = (event) => {   
        setNewStateName(event.target.value);
    }

    // When state code changes, update state
    const handleStateCodeChange = (event) => {
        setNewStateCode(event.target.value);
    }

    const handleSubmit = async () => {

        const local = 'http://127.0.0.1:8000/api/states/';
        const live = 'https://xc-countries-api.fly.dev/api/states/';

        fetch(local, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: newStateCode,
                name: newStateName,
                countryId: countryID
            })
        })
        .then(response => {
            if (response.ok){
                alert("State successfully added!");
            } else {
                alert("State could not be added. Please try again.");
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        //clear form after submission
        document.getElementById("newStateName").value = "";
        document.getElementById("newStateCode").value = "";
    }

    return (
        <div id="add-new-state">
            <h2>Add a New State</h2>
            <TextInput 
                id="newStateName"
                label="State name:"
                minlength="4"
                onChange={handleStateNameChange}
            />
            <TextInput 
                id="newStateCode"
                label="State code:"
                minlength="2"
                maxlength="3"
                onChange={handleStateCodeChange}
            />
            <Dropdown 
                id="country-dropdown-addnewstateform"
                label="Country:"
                defaultText="Select a country"
                list={props.countries}
                valueField="id"
                onChange={handleCountryChange}
            />
            <SubmitButton 
                id="submit-state"
                buttonText="Submit"
                onClick={handleSubmit}
            />
        </div>
    );

}

// Main App Component
const App = () => {

    const [allCountries, setAllCountries] = React.useState([]);

    React.useEffect(() => {
        //When component mounts, update list of all countries
        getAllCountries();
    }, []);

    const getAllCountries = () => {
        /* 
            Fetches a list of countries from the API 
            and sets the 'AllCountries' state to the returned data
        */
        fetch('http://127.0.0.1:8000/api/countries/')
        .then(response => response.json())
        .then(data => {
            // if data equals allCountries, try to fetch again
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
            setAllCountries(data);
        })
        
    }

    return (
        <div className="container">
            <Header 
                title="Countries and States Project...in React!"
                subtitle="An exercise using React, API calls, and state management. Developed by Sean Rowan"
            />
            <SelectCountryAndStateForm 
                countries={allCountries} 
            />
            <NewCountryForm 
                getAllCountries={getAllCountries}
            />
            <NewStateForm 
                countries={allCountries}
            />
        </div>
    );

}

// Render App
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render( <App /> );