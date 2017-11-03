import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import 'bootstrap/dist/css/bootstrap.css';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import logo from './logo.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [],
        };
    }

    componentWillMount(){
        let numbersRef = fire.database().ref('numbers').orderByKey().limitToLast(100);
        numbersRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let number = { text: snapshot.val(), id: snapshot.key };
            console.log(snapshot);
            console.log(number);
            this.setState({
                numbers: [number].concat(this.state.numbers)
            });
        });
    }

    addNumber(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('numbers').push( this.inputEl.value );
        this.inputEl.value = '';
    }


  render() {
      return (
          <div className="container">
              <header className="jumbotron">
                  <div className="row">
                      <div className="col-xs-12 col-xs-offset-3 text-center">
                          <img src={logo} alt="LOGO" style={{height: 200, width: 200}}/>
                          <p className="lead">Welcome to the ranker that will change nothing for no one.</p>
                      </div>
                  </div>



              </header>
              <div className="row">
                  <form onSubmit={this.addNumber.bind(this)}>
                      <div className="form-group">
                          <input
                              type="number"
                              className="form-control"
                              ref={ el => this.inputEl = el }
                              placeholder="Enter a number."
                              required/>
                          <input type="submit" className="btn btn-primary" style={{margin: 10}}/>
                      </div>
                  </form>
                  <div className="row">
                      <div className="col-sm-6 col-xs-12">
                          <ul className="list-group" style={{height: 300, overflowY: 'scroll' }}>
                              {
                                  this.state.numbers.map(number => <li
                                      className="list-group-item"
                                      key={number.id}>
                                      {number.text}
                                      </li>)
                              }
                          </ul>
                      </div>
                      <div className="col-sm-6 col-xs-12">
                          <SimpleRadialBarChart values={
                              this.state.numbers.map(value => Number(value.text))
                          }/>
                      </div>
                  </div>
              </div>
          </div>


      );
  }

}

const SimpleRadialBarChart = ({ values }) => {

    const graphData = [
        {name: '1-20',   value: 0, fill: '#8884d8'},
        {name: '21-40',  value: 0, fill: '#83a6ed'},
        {name: '41-60',  value: 0, fill: '#8dd1e1'},
        {name: '61-80',  value: 0, fill: '#82ca9d'},
        {name: '81-100', value: 0, fill: '#a4de6c'},
        {name: '101+',   value: 0, fill: '#d0ed57'}
    ];

    for (let i = 0; i < values.length; i += 1) {
        if (values[i] > 0 && values[i] <= 20) {
            graphData[0].value += 1
        } else if (values[i] > 20 && values[i] <= 40) {
            graphData[1].value += 1
        } else if (values[i] > 40 && values[i] <= 60) {
            graphData[2].value += 1
        } else if (values[i] > 60 && values[i] <= 80) {
            graphData[3].value += 1
        } else if (values[i] > 80 && values[i] <= 100) {
            graphData[4].value += 1
        } else if (values[i] > 100) {
            graphData[5].value += 1
        }
    }

    return (
        <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20}
                        outerRadius={140} barSize={10} data={graphData}>
            <RadialBar minAngle={15} label background clockWise={true} dataKey='value'/>
            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='bottom'/>
        </RadialBarChart>
    );
};

export default App;
