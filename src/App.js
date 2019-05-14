import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: " CRUD COM REACT",
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount(){this.refs.name.focus();}

  fSubmit = (e) =>{
    e.preventDefault();
    
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    let data = {
      name, address
    }

    datas.push(data);

    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();


  }

  render() {
    return (
      <div className="App">
        <h2>{this.state.title}</h2>

        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Digite seu nome" className="formField" />
          <input type="text" ref="address" placeholder="Digite seu endereço" className="formField" />

          <button onClick="{(e)=>this.fSubmit(e)}" class="myButton" >Cadastrar</button>

        </form>
        <pre>
        
        </pre>
      </div>
    );
  }
}
export default App;
