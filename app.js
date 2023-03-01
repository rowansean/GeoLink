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
            <label for={props.id}>{props.label}</label>
            <select id={props.id} onChange={props.onChange}>
                <option value="" selected disabled>{props.defaultText}</option>  
                {/* Generate Option List */}
                {props.list.map((listItem) => {
                    // for value, specify which data should be used by using valueField prop
                    return <option value={listItem[props.valueField]}>{listItem.name}</option>
                })}
            </select>
        </div>
    );

}

// Container Components
const SelectCountryAndStateContainer = (props) => {

    const [states, setStates] = React.useState([]);
    const [selectedCountryCode, setSelectedCountryCode] = React.useState(null);

    //When selectedCountryCode updates, fetch data from API and set state to data
    React.useEffect(() => {

            fetch(`https://xc-countries-api.fly.dev/api/countries/${selectedCountryCode}/states`)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setStates(data);
            });

    }, [selectedCountryCode]);

    //When country dropdown changes, update state
    const handleCountryChange = (event) => {
        setSelectedCountryCode(event.target.value);
    }

    return (
            <div>
                <Dropdown 
                    id="country-dropdown" 
                    label="Country:" 
                    defaultText="Select a country"
                    list={props.countries} 
                    valueField="code" 
                    onChange={handleCountryChange}
                />
                <Dropdown 
                    id="state-dropdown"
                    label="State:"
                    defaultText="Select a state"
                    list={states}
                    valueField="code"
                />
            </div>
    );
    
}

const NewCountryForm = (props) => {
   

    const [newCountryName, setNewCountryName] = React.useState('');
    const [newCountryCode, setNewCountryCode] = React.useState('');

    const handleCountryNameChange = (event) => {
        setNewCountryName(event.target.value);
    }

    const handleCountryCodeChange = (event) => {
        setNewCountryCode(event.target.value);
    }

    const sendData = () => {
        fetch('https://xc-countries-api.fly.dev/api/countries/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: newCountryCode,
                name: newCountryName
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        //clear form after submission
        document.getElementById("newCountryName").value = "";
        document.getElementById("newCountryCode").value = "";
        
    }

    return (
        <div id="add-new-country">
                <h2>Add a New Country</h2>

                <label for="newCountryName">Country name:</label>
                <input type="text" id="newCountryName" name="newCountryName" minlength="4" onChange={handleCountryNameChange}/>

                <label for="newCountryCode">Country code:</label>
                <input type="text" id="newCountryCode" name="newCountryCode" minlength="2" maxlength="3" onChange={handleCountryCodeChange}/>

                <label for="submit-country"></label>
                <button id="submit-country" onClick={sendData}>Submit</button>
        </div>
    );

}

const NewStateForm = (props) => {
    
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

    const sendData = () => {
        fetch(`https://xc-countries-api.fly.dev/api/states/`, {
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

            <label for="newStateName">State name:</label>
            <input type="text" id="newStateName" name="newStateName" minlength="4" onChange={handleStateNameChange} />

            <label for="newStateCode">State Code:</label>
            <input type="text" id="newStateCode" name="newStateCode" minlength="2" maxlength="3" onChange={handleStateCodeChange} />

            <Dropdown 
                id="country-dropdown-addnewstateform"
                label="Country:"
                defaultText="Select a country"
                list={props.countries}
                valueField="id"
                onChange={handleCountryChange}
            />

            <label for="submit-state"></label>
            <button id="submit-state" onClick={sendData}>Submit</button>
        </div>
    );

}

// Main App Component
const App = () => {

    //initialize states for countries, states, and selected options
    const [countries, setCountries] = React.useState([]);

    //When component mounts, fetch data from API and set state to Json data
    React.useEffect(() => {

        fetch('https://xc-countries-api.fly.dev/api/countries/')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
            setCountries(data);
        });

    }, []);

    return (
        <div className="container">
            <Header 
                title="Countries and States Project...in React!"
                subtitle="An exercise using React, API calls, and state management. Developed by Sean Rowan"
            />
            <SelectCountryAndStateContainer countries={countries} />
            <NewCountryForm />
            <NewStateForm countries={countries} />
        </div>
    );

}

// Render App
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render( <App /> );