import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Baseurl } from '../App';
import {useHistory} from 'react-router-dom';

const Card = (props) => {
    const H = useHistory();
    const [value, setvalue] = useState("");
    const [paytm, setPaytm] = useState({
        amount: "",
        name: "",
        email: "",
        phone: ""
    });
    // console.log(props);
    // console.log(props.data.fooditem);
    // console.log(props.data.quantity);
    // console.log(props.data.price);
    // console.log(value);
    const addQuantity = async () => {
        console.log(paytm);
        const token = localStorage.getItem("userToken")
        console.log("adding quantity");
        try {
            const result = await axios({
                method: "patch",
                url: `${Baseurl}/buyitem`,
                headers: {
                    accept: "application/json",
                    "content-type": "application/json"
                },
                data: JSON.stringify({ token, ...props.data, quantity: value,...paytm })
            });
            console.log(result.data);
            // props.data.func();
            H.push("/payment",{amount:result.data.totalAmount,id:result.data._id});
            // H.push("/payment");

        }
        catch (error) {
            console.log(error);
        }
    }
    const handlechange = (props) => (e) => {
        console.log(paytm);
        setPaytm((pre) => ({ ...pre, [props]: e.target.value }))
    }
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
