import React, { Component } from 'react';
import Hello from '../components/hello'
import './css/login.css'

class Teorica extends Component {
    constructor(){
        super()
        this.state = {
            inputValue:"",
            showText:true,
            values:[]
        }
        this.textInputRef = React.createRef()
    }

    logIn(){
        
    }

    reset(){
        this.setState({inputValue:''})
    }

    enterValue(){
        this.setState({values:[...this.state.values, this.textInputRef.current.value]}, ()=>console.log(this.state.values))
        this.setState({inputValue:""})
    }

    componentDidMount(){
        this.textInputRef.current.focus()
    }

    render = ()=>{
        
        return (
            <div>
                <div>
                    {this.state.showText && <Hello name={this.state.inputValue}/>}
                    <input ref={this.textInputRef} type="text" 
                    onChange={event=>this.setState({inputValue:event.target.value}, ()=>console.log(this.state.inputValue))} 
                    value={this.state.inputValue}></input>
                    <button onClick={()=>this.reset()}>Resetear</button>
                </div>
                <div>
                    <button onClick={()=>this.setState({showText:!this.state.showText})}>Mostrar</button>
                    <button style={{display:'block'}} onClick={()=>this.enterValue()}>Enviar</button>
                    <ul>
                    {this.state.values.map((value, index)=>{
                        return(
                            <li key={index}>{index}. {value}</li>
                        )
                    })}
                    </ul>
                </div>
               
            </div>
        );
    }
}

export default Teorica;


//Lifecycle methods

//Mounting -> constructor, getDerivedStateFromProps(props, state) (Para mapear los props con el estado), render, componentDidMount
//Updating -> getDerivedStateFromProps(props, state), shouldComponentUpdate(nextProps, nextState)(Si se deberia volver a renderizar o no), componentDidUpdate(prevProps, prevState)(Para estar seguro que se actualizo el componente. Se pueden realizar Ajax calls)
//Unmounting
//Error handling -> getDerivedStateFromProps(), componentDidCatch()


//Regular component vs Pure component
//Reguar components se actualizan por default. Los pure components actualizan solo cuando cambia el tipo de variable
//Los pure components realizan un shallow comparison en shouldComponentUpdate()
//Para realizar un pure component en un component funcional, utilizar React.memo()


//Refs
//Son como un estado, pero para los valores de los tags a los que referencia (ver el input)
//Para utilizarlos en elementos dentro de un componente, forwardear el ref

//Portals -> Para modals

//HOCs -> Para la reutilizacion del codigo. Para componentes que comparten una funcionalidad
//Son componentes funcionales que reciben como parametro un componente y devuelven otro compoenente con las funcionalidades padre

//let { match } = this.props

//----------------------------------------------
//React hooks
//https://dev.to/ale_annini/replace-redux-with-react-hooks-the-easy-way-10nk

