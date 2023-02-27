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

class SelectCountryAndStateContainer extends React.Component {

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
            data.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
                data.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
                    <CountryDropdown countries={this.state.countries} handleCountryChange={this.handleCountryChange} />
                    <StateDropdown states={this.state.states}/> 
                </div>
            );
    }
    
}

const CountryDropdown = (props) => {

    return(
        <div>
            <label for={props.id}>Country: </label>
            <select id={props.id} name={props.id} onChange={props.handleCountryChange}>
                <option value="" selected disabled>Select a country</option>  
                {/* Countries List */}
                {props.countries.map((country) => {
                    return <option value={country.code}>{country.name}</option>
                })}
            </select>
        </div>
    );
    
}

const StateDropdown = (props) => {

    return(
        <div>
            <label for="state-dropdown">Country: </label>
            <select id={"state-dropdown"} name="state-dropwdown">
                <option value="" selected disabled>Select a state</option>  
                {/* States List */}
                {props.states.map((state) => {
                    return <option value={state.code}>{state.name}</option>
                })}
            </select>
        </div>
    );

}

class NewCountryForm extends React.Component {
   
   state = {
        newCountryName: '',
        newCountryCode: ''
    }

    handleCountryNameChange = (event) => {
        this.setState({
            newCountryName: event.target.value
        });
    }

    handleCountryCodeChange = (event) => {
        this.setState({
            newCountryCode: event.target.value
        });
    }

    sendData = () => {
        fetch('https://xc-countries-api.fly.dev/api/countries/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: this.state.newCountryCode,
                name: this.state.newCountryName
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

        //clear form and alert user
        document.getElementById("newCountryName").value = "";
        document.getElementById("newCountryCode").value = "";
        

    }

    render(){

        return (
            <div id="add-new-country">
                    <h2>Add a New Country</h2>

                    <label for="newCountryName">Country name:</label>
                    <input type="text" id="newCountryName" name="newCountryName" minlength="4" onChange={this.handleCountryNameChange}/>

                    <label for="newCountryCode">Country code:</label>
                    <input type="text" id="newCountryCode" name="newCountryCode" minlength="2" maxlength="3" onChange={this.handleCountryCodeChange}/>

                    <label for="submit-country"></label>
                    <button id="submit-country" onClick={this.sendData}>Submit</button>
            </div>
        );

    }
}

class NewStateForm extends React.Component {
    
    state = {
        newStateName: '',
        newStateCode: '',
        selected: null
    }


    render(){
        return (
            <div id="add-new-state">
                <h2>Add a New State</h2>

                <label for="newStateName">State name:</label>
                <input type="text" id="newStateName" name="newStateName" minlength="4"/>

                <label for="newStateCode">State Code:</label>
                <input type="text" id="newStateCode" name="newStateCode" minlength="2" maxlength="3"/>

                {/* <CountryDropdown id="newStateForm-countryDropdown" handleCountryChange={this.props.handleCountryChange} /> */}

                <label for="submit-state"></label>
                <button id="submit-state">Submit</button>
            </div>
        );
    }

}

// Main App Component
class App extends React.Component {

    render(){
        return (
            <div className="container">
                <Header />
                <SelectCountryAndStateContainer />
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