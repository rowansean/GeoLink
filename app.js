
// UI Components
const Header = (props) => {

    // Props: title, subtitle

    return (
        <div className="header object-fit-fill">
            <div className="navbar text-bg-primary p-3 justify-content-center text-center">
                <h1 className="h1 flex-fill">{props.title}</h1>
                <p className="h4 flex-fill">{props.subtitle}</p>
            </div>
        </div>
    );
}

const Dropdown = (props) => {

    // Props: id, label, defaultText, list, valueField, onChange

    return(
        <div>
            <select className="form-select" id={props.id} onChange={props.onChange}>
                <option value="" selected>{props.defaultText}</option>  
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
        <div className="form-floating">
            <input type="text" className="form-control" placeholder={props.label} id={props.id} value={props.value} minLength={props.minlength} maxLength={props.maxlength} onChange={props.onChange}/>
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

const SubmitButton = (props) => {

    // Post Data to API
    // Refresh Country List and State List


    return(
        <div className="">
            <button className="btn btn-primary m-1" id={props.id} onClick={props.onClick}>{props.buttonText}</button>
        </div>
    );
}

const HorizonalLine = () => {
    return (
        <p className="m-1">⎯⎯⎯⎯⎯⎯</p>
    );
}

// Container Components
const SelectCountryAndStateForm = (props) => {

    return (
            <div className="container d-flex flex-column gap-1 bg-">
                <h2>Select a Country and State</h2>
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
        <div className="container d-flex flex-column gap-1">
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
        <div className="container d-flex flex-column gap-1">
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
        if (countryCode != null && countryCode != undefined && countryCode != ""){
           
            var response = await fetch(`http://127.0.0.1:8000/api/countries/${countryCode}/states`);
            if (response.ok){
                var data = await response.json();
                data.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setCurrentStates(data);
            } else { alert("Error fetching states"); }

        }
    }

    return (
        <div className="container p-0 pb-2 bg-primary-subtle d-flex flex-column justify-content-evenly border border-primary border-2 rounded gap-3 position-absolute top-50 start-50 translate-middle">
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
            <hr className="m-0" />
            <NewCountryForm 
                refreshCountries={refreshCountries}
            />
            <hr className="m-0" />
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