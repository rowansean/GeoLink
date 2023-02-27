// UI Component
const Header = () => {
    return (
        <div id="header">
            <h1>Countries and States...in React</h1>
            <p>An onboarding project developed by Sean Rowan</p>
            <hr/>
        </div>
    );
}

class CountryAndStateDropdown extends React.Component {

    //initialize states
    state = {
        countries: [],
        states: [],
        selected: null
    }

    //When component mounts, fetch data from API and set state to data
    componentDidMount(){

        fetch('https://xc-countries-api.fly.dev/api/countries/')
        .then(response => response.json())
        .then(data => {
            this.setState({countries: data});
        });

    }

    //When component updates, fetch data from API and set state to data
    componentDidUpdate(prevState){
        
        // if the selected country has changed, use the new country code to fetch the states
        if(prevState.selected !== this.state.selected){
            fetch(`https://xc-countries-api.fly.dev/api/countries/${this.state.selected}/states`)
            .then(response => response.json())
            .then(data => {
                this.setState({states: data});
            });
        }
    }

    //When country dropdown changes, update state
    handleCountryChange = (event) => {
        this.setState({
            selected: event.target.value 
        });
    }

    render(){
        return(
                <div>
                    {/* Country Dropdown */}
                    <label for="country-dropdown">Country: </label>
                    <select id={"country-dropdown"} name="country-dropwdown" onChange={this.handleCountryChange}>
                        <option value="" selected disabled>Select a country</option>  
                        {/* Countries List */}
                        {this.state.countries.map((country) => {
                            return <option value={country.code}>{country.name}</option>
                        })}
                    </select>

                    {/* State Dropdown */}
                    <label for="state-dropdown">Country: </label>
                    <select id={"state-dropdown"} name="state-dropwdown">
                        <option value="" selected disabled>Select a state</option>  
                        {/* States List */}
                        {this.state.states.map((state) => {
                            return <option value={state.code}>{state.name}</option>
                        })}
                    </select>
                </div>
            );
    }
    
}

const NewCountryForm = () => {
    return (
        <div id="add-new-country">
                <h2>Add a New Country</h2>

                <label for="newCountryName">Country name:</label>
                <input type="text" id="newCountryName" name="newCountryName" minlength="4"/>

                <label for="newCountryCode">Country code:</label>
                <input type="text" id="newCountryCode" name="newCountryCode" minlength="2" maxlength="3"/>

                <label for="submit-country"></label>
                <button id="submit-country">Submit</button>
        </div>
    );
}

const NewStateForm = () => {
    return (
        <div id="add-new-state">
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
            <button id="submit-state">Submit</button>
        </div>
    );
}




// Main App Component
class App extends React.Component {

    //pass list of countries to dropdown
    // https://xc-countries-api.fly.dev/api/countries/
    // https://xc-countries-api.fly.dev/api/countries/US/states


    render(){
        return (
            <div className="container">
                <Header />
                <CountryAndStateDropdown />
                <NewCountryForm />
                <NewStateForm />
            </div>
        );
    }


}

// Render App
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render( <App /> );