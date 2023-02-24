// UI Components
const Header = () => {
    return (
        <div id="header">
            <h1>Countries and States...in React</h1>
            <p>An onboarding project developed by Sean Rowan</p>
            <hr/>
        </div>
    );
}

const Dropdown = (props) => {

    const [content, setContent] = React.useState([]);
    const optionList = [];

    React.useEffect(() => {
        fetchCountries(props.url).then(data => {
            setContent(data);
        });
    }, []);

    
    
    content.map(country => {
        optionList.push(<option value={country.name} key={country.id}>{country.name}</option>);
    });


    return(
        <div>
            <label for={props.for + "-dropdown"}>{props.for + ":"}</label>
            <select id={props.for + "-dropdown"} name={props.for}>
                <option value="" selected disabled>Select a {props.for}</option>
                {optionList}
            </select>
        </div>
    );
}

const SelectCountryAndState = (props) => {
    
    return (
        <div id="select-country-and-state">
            <Dropdown for="country" url="https://xc-countries-api.fly.dev/api/countries/" />
            <Dropdown for="state" url={"https://xc-countries-api.fly.dev/api/countries/AU/states/"}/>
        </div>
    );
}

const NewCountryForm = () => {
    return (
        <form id="add-new-country">
                <h2>Add a New Country</h2>

                <label for="newCountryName">Country name:</label>
                <input type="text" id="newCountryName" name="newCountryName" minlength="4"/>

                <label for="newCountryCode">Country code:</label>
                <input type="text" id="newCountryCode" name="newCountryCode" minlength="2" maxlength="3"/>

                <label for="submit-country"></label>
                <button type="submit" id="submit-country">Submit</button>
        </form>
    );
}

const NewStateForm = () => {
    return (
        <form id="add-new-state">
            <h2>Add a New State</h2>

            <label for="newStateName">State name:</label>
            <input type="text" id="newStateName" name="newStateName" minlength="4"/>

            <label for="newStateCode">State Code:</label>
            <input type="text" id="newStateCode" name="newStateCode" minlength="2" maxlength="3"/>

            <label for="newStateCountry">Countries:</label>
            <select id="newStateCountry" name="newStateCountry" class="country-dropdown">
                <option value="" selected disabled>Select a country</option>
            </select>

            <label for="submit-state"></label>
            <button type="submit" id="submit-state">Submit</button>
        </form>
    );
}

// API Calls
const fetchCountries = async (url) => {
    var response = await fetch(url);
    var data = await response.json();
    // console.log(data);
    return data;
}

// Main App Component
const App = () => {

    return (
        <div className="container">
            <Header />
            <SelectCountryAndState />
            <NewCountryForm />
            <NewStateForm />
        </div>
    );
}

// Render App
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render( <App /> );