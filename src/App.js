import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      cityLocation: {lat:0,lon:0},
      isError: false,
      errorMessage:''
    }
  };

  handleSubmitInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleSubmit = async(event) => {
    try{
      event.preventDefault();

      let cityInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

      this.setState({
        cityLocation: cityInfo.data[0],
        cityData: cityInfo.data[0],
        isError: false
      })
      console.log(cityInfo.data[0]);
      console.log(this.state.cityData);
      console.log(this.state.cityLocation);
    } catch(error){
      this.setState({
        isError: true,
        errorMessage: error +', '+ error.message
      })
      console.log('error: ', error)
      console.log('error.message: ', error.message);
    }
  };


  render() {
    let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLocation.lat},${this.state.cityLocation.lon}&zoom=8`;
    let cityShow = <img src={cityMap} alt={this.state.city}/>
    // let cityAbout = this.state.isError===false ? <ul>{this.state.data}</ul> : <></>
    // console.log(cityAbout);

    return(
      <>
        <h1>City Explorer!!</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input name="city" type="text" onChange={this.handleSubmitInput}/>
          </label>
          <button type="submit">CITY!!!!</button>
        </form>
        {
          this.state.isError
            ? <div class="alert alert-primary" role="alert">
            This is a primary alert—check it out! {this.state.errorMessage}
          </div>
            : <ul>
              {/* {cityAbout}, */}
              {cityShow}
            </ul>
        }
        
        
      </>
    );
  }
}

export default App;
