import './style/input.css';

const Input = (props) => {
    return <input id={props.id} placeholder={props.holder} type={props.type} ></input>
}

export default Input;