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

class Dropdown extends React.Component {

    state = {
        countries: [],
        selected: []
    }

    //When component mounts, fetch data from API and set state to data
    componentDidMount(){

        if (this.props.fetchUrl){

            fetch(this.props.fetchUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({countries: data});
            });

        }

    }

    //When component updates, fetch data from API and set state to data
    

    render(){
        return(
                <div>
                    <label for={this.props.id + "-dropdown"}>{this.props.label}</label>
                    <select id={this.props.id + "-dropdown"} name={this.props.id}>
                        <option value="" selected disabled>{this.props.textContent}</option>  
                        {/* Countries List */}
                        {this.state.countries.map((country) => {
                            return <option value={country.code}>{country.name}</option>
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
                <Dropdown id="country" textContent="Select A Country" label="Country: " fetchUrl="https://xc-countries-api.fly.dev/api/countries/" />
                <Dropdown id="state" textContent="Select A State" label="State: " />
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