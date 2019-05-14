import React, { Component } from 'react';
import { Textbox, Textarea, Radiobox, Checkbox, Select } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
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
  handleValidation(){
         let fields = this.state.fields;
         let errors = {};
         let formIsValid = true;

         //Name
         if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
         }

         if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["name"] = "Only letters";
            }
         }

         //Email
         if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
         }

         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    fSubmit(e){
         e.preventDefault();

         if(this.handleValidation()){
            alert("Form submitted");
         }else{
            alert("Form has errors.")
         }

     }

     handleChange(field, e){
         let fields = this.state.fields;
         fields[field] = e.target.value;
         this.setState({fields});
     }


  componentDidMount(){this.refs.name.focus();}

  fSubmit = (e) =>{
    e.preventDefault();
    console.log("ok");

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let email = this.refs.email.value;
    let cep = this.refs.cep.value;

    if(this.state.act === 0){//new
      let data = {
        name, address, email, cep
      }
      datas.push(data);
    }else{//update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].email = email;
      datas[index].cep = cep;

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
  this.refs.email.value = datas.email;
  this.refs.cep.value = datas.cep;

  this.setState({
    act:1,

  });

  this.refs.name.focus();
}

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2 class="title">{this.state.title}</h2>
        <form ref="myForm" className="myForm" onSubmit= {this.fSubmit.bind(this)}>
          <input type="text" ref="name"  placeholder="Digite seu nome" className="formField" required />
          <input type="text" ref="address" placeholder="Digite seu endereço" className="formField" required />
          <input type="email" ref="email" placeholder="Digite seu e-mail" className="formField" required />
          <input type="number" ref="cep" placeholder="Digite seu CEP" className="formField" required />

          <button onClick={(e)=>this.fSubmit(e)} className="myButton" >Cadastrar</button>
        </form>
        <pre>
         {datas.map((data, i)=>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}, {data.email}, {data.cep}
              <button onClick={()=>this.fRemove(i)} className="myListButton" >Excluir</button>
              <button onClick={()=>this.fEdit(i)} className="myListButton" >Editar</button>

            </li>
          )}
        </pre>
      </div>
    );
  }
}
export default App;
