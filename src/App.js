import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: "Crud com REACT",
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount(){this.refs.name.focus();}

  fSubmit = (e) =>{
    e.preventDefault();
    console.log("ok");
    
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if(this.state.act === 0){//new
      let data = {
        name, address
      }
      datas.push(data);
    }else{//update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }

    let data = {
      name, address
    }

    datas.push(data);

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();

  }

  fRemove = (i) => {
    let datas = this.state.datas;

    datas.splice(i,1);
    this.setState({
      datas:datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();

  }
 //edit

 fEdit = (i) => {
  let datas = this.state.datas[i];
  this.refs.name.value = datas.name;
  this.refs.address.value = datas.address;

  this.setState({
    act:1,

  });

  this.refs.name.focus();
}

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>

        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Digite seu nome" className="formField" />
          <input type="text" ref="address" placeholder="Digite seu endereço" className="formField" />

          <button onClick="{(e)=>this.fSubmit(e)}" class="myButton" >Cadastrar</button>

        </form>
        <pre>
         {datas.map((data, i)=>
            <li key={1} className="myList">
              {i+1}. {data.name}, {data.address}
              <button onClick="{()=>this.fRemove(i)}" class="myListButton" >Excluir</button>
              <button onClick="{()=>this.fEdit(i)}" class="myListButton" >Editar</button>

            </li>
          )}
        </pre>
      </div>
    );
  }
}
export default App;
