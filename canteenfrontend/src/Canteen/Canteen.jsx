import React, { useState, useEffect } from "react";
import verifyToken from "../verifyToken";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../App";
import Card from "./item";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Canteen = () => {
  const H = useHistory();

  const [data, setData] = useState([]);

  const [curr, setcurr] = useState([]);
  const [value, setValue] = React.useState("Indian");
  // console.log(localStorage.getItem("usertoken"))
  const getData = async () => {
    try {
      const result = await axios({
        method: "get",
        url: `${Baseurl}/FoodStore`,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      console.log(result.data);
      setData(result.data);
      setcurr(result.data.filter((ele)=>{
          return ele.category === value
      }))
    } catch {
      // H.push("/error");
    }
  };

  useEffect(async () => {
    await verifyToken(H);
    getData();
    console.log("helloo");
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    setcurr(data.filter((ele)=>{
        return (ele.category === event.target.value)
    }));
  };
  console.log(curr);
  return (
    <>
      <h1>in Canteen</h1>
      <AppBar className="fixed-top" style={{ background: "#474646" }}>
        <Toolbar>
          {/* <IconButton edge="start"  */}
          {/* // className={classes.menuButton}  */}
          {/* color="inherit" aria-label="menu"> */}
          {/* <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography
            variant="h6"
            //  className={classes.title}
          >
            RICETTA
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginLeft: "auto" }}
          >
            <Link
              to="/"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ width: "max-content", margin: "2rem auto" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label="Category"
            name="Category"
            value={value}
            onChange={handleChange}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <FormControlLabel
              value="Indian"
              control={<Radio color="primary" />}
              label="Indian"
            />
            <FormControlLabel
              value="Mexican"
              control={<Radio color="primary" />}
              label="Mexican"
            />
            <FormControlLabel
              value="Italian"
              control={<Radio color="primary" />}
              label="Italian"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div
        className="container-fluid mt-5"
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {curr.map((ele) => (
          <Card data={{ ...ele, func: getData }} />
        ))}
      </div>
    </>
  );
};

export default Canteen;
