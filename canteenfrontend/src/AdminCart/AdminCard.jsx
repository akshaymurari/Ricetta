import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {Baseurl} from '../App';
import {Link} from "react-router-dom";

const Card = (props) => {

    const [value,setvalue] = useState("");
    console.log(props);
    // console.log(props.data.fooditem);
    // console.log(props.data.quantity);
    // console.log(props.data.price);
    const addQuantity = async () => {
        // console.log(props);
        // console.log("updating quantity");
        const token = localStorage.getItem("token");
        const fooditem = props.data.fooditem;
        const quantity = parseInt(value); 
        try{
            const data = await axios({
                method:"patch",
                url:`${Baseurl}/fooditemsadmin`,
                headers: {
                    accept: "application/json",
                    "content-type": "application/json"
                },
                data:JSON.stringify({token,quantity,fooditem,price:props.data.price})
            });
            // console.log(data.data);
            if(data.data.nModified>0){
                props.data.func();
            }
            setvalue("");
        }
        catch(error){
            console.log(error);
        }
    }
    // console.log(value);
    return (
        <>
            <div className="card shadow rounded p-3 pt-4 mb-5" style={{ width: "46rem", marginTop: "1rem"}}>
                <img src={props.data.pic} style={{width:"200px","height":"200px",display:"block",marginLeft:"auto",marginRight:"auto" }} className="card-img-top" alt="image not exists" />
                <div class="card-body">
                    <h5 class="card-title text-center">Category : {props.data.category}</h5>
                    <h5 class="card-title text-center">FoodItem : {props.data.foodItem}</h5>
                    <h5 class="card-title text-center">link : <a href={props.data.link}>{props.data.link}</a></h5>
                    <h6 class="card-title text-center p-3"> <h4 style={{fontWeight:"700"}}>Preparation</h4> : {props.data.preparation}</h6>
                  
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </>
    )
}

export default Card
