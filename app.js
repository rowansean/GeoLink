
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
            <input type="text" id={props.id} value={props.value} minLength={props.minlength} maxLength={props.maxlength} onChange={props.onChange}/>
        </div>
    );
}

const SubmitButton = (props) => {

    // Post Data to API
    // Refresh Country List and State List


    return(
        <div>
            <label htmlFor={props.id}></label>
            <button id={props.id} onClick={props.onClick}>{props.buttonText}</button>
        </div>
    );
}

// Container Components
const SelectCountryAndStateForm = (props) => {

    return (
            <div>
                <Dropdown 
                    id="country-dropdown" 
                    label="Country:" 
                    defaultText="Select a country"
                    list={props.countries} 
                    valueField="code" 
                    onChange={(event) => {
                        props.setCurrentCountryCode(event.target.value);
                        props.refreshStates(event.target.value);
                    }}
                />
                <Dropdown 
                    id="state-dropdown"
                    label="State:"
                    defaultText="Select a state"
                    list={props.currentStates}
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

    const resetState = () => {
        setNewCountryName('');
        setNewCountryCode('');
    }

    const handleSubmit = async () => {

        /**
         * Sends a POST request to the API to create the new country.
         * 
         * After submitting, the form will clear 
         * and the user will be alerted of the success or failure of the request
         */
        var response = await fetch('http://127.0.0.1:8000/api/countries/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: newCountryCode,
                name: newCountryName
            })
        })
        if (response.ok){
            alert("Country successfully added!");
            props.refreshCountries();
            resetState();
        } else {
            alert("Country could not be added. Please try again.");
        }
        console.log(await response.json());
    }

    // Render
    return (
        <div id="add-new-country">
                <h2>Add a New Country</h2>
                <TextInput 
                    id="newCountryName"
                    label="Country name:"
                    minlength="4"
                    value={newCountryName}
                    onChange={(event) => {
                        setNewCountryName(event.target.value);
                    }}
                />
                <TextInput 
                    id="newCountryCode"
                    label="Country code:"
                    minlength="2"
                    maxlength="3"
                    value={newCountryCode}
                    onChange={(event) => {
                        setNewCountryCode(event.target.value);
                    }}
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

    const resetState = () => {
        setNewStateName('');
        setNewStateCode('');
        setCountryId(null);
    }

    const handleSubmit = async () => {

        var response = await fetch('http://127.0.0.1:8000/api/states/', {
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
        if (response.ok){
            alert("State successfully added!");
            props.refreshStates(props.currentCountryCode);
            resetState();
            
        } else {
            alert("State could not be added. Please try again.");
            console.log(await response.json());
        }

    }

    return (
        <div id="add-new-state">

            <h2>Add a New State</h2>
            <TextInput 
                id="newStateName"
                label="State name:"
                minlength="4"
                value={newStateName}
                onChange={(event) => {   
                    setNewStateName(event.target.value);
                }}
            />
            <TextInput 
                id="newStateCode"
                label="State code:"
                minlength="2"
                maxlength="3"
                value={newStateCode}
                onChange={(event) => {
                    setNewStateCode(event.target.value);            
                }}
            />
            <Dropdown 
                id="country-dropdown-addnewstateform"
                label="Country:"
                defaultText="Select a country"
                list={props.countries}
                valueField="id"
                value={countryID}
                onChange={(event) => {
                    setCountryId(event.target.value);
                 }}
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
    const [currentCountryCode, setCurrentCountryCode] = React.useState(null);
    const [currentStates, setCurrentStates] = React.useState([]);


    React.useEffect(() => {
        //When component mounts, update list of all countries
        refreshCountries();
    }, []);

    const refreshCountries = async () => {
        /* 
            Fetches a list of countries from the API 
            and sets the 'AllCountries' state to the returned data
        */
        var response = await fetch('http://127.0.0.1:8000/api/countries/');
        var data = await response.json();
        if (response.ok){
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
            setAllCountries(data);
            console.log("All countries updated!");
        } else {
            console.log("Error fetching countries");
            console.log(data);
        }
        
    }

    const refreshStates = async (countryCode) => {
        var response = await fetch(`http://127.0.0.1:8000/api/countries/${countryCode}/states`);
            if (response.ok){
                var data = await response.json();
                data.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setCurrentStates(data);
            } else {
                alert("Could not retrieve states for selected country. Please try again.");
            }
    }

    return (
        <div className="container">
            <Header 
                title="Countries and States Project...in React!"
                subtitle="An exercise using React, API calls, and state management. Developed by Sean Rowan"
            />
            <SelectCountryAndStateForm 
                countries={allCountries}
                currentStates={currentStates}
                refreshStates={refreshStates}
                setCurrentCountryCode={setCurrentCountryCode}
            />
            <NewCountryForm 
                refreshCountries={refreshCountries}
            />
            <NewStateForm 
                countries={allCountries}
                currentCountryCode={currentCountryCode}
                refreshStates={refreshStates}
            />
        </div>
    );

}

// Render App
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render( <App /> );