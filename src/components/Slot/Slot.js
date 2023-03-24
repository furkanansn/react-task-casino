import React from "react";
import axios from "axios";
import BASE_URL from "../const.js";
import classes from "../Login/Login.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import {Text} from "@shopify/polaris"
const Slot = (props) => {  
  const [reel, setReel] = React.useState("");
  const [money, setMoney] = React.useState("");
  const [reward, setReward] = React.useState("");
  const[loading,setLoading] = React.useState(false);

  const spinSlot = async (query) => {
    setLoading(true);
    axios
      .get(BASE_URL + "api/games/slot", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("User")).jwt,
        },
      })
      .then((res) => {
        setReel(res.data.data.reel.join(" - "));
        setMoney(res.data.data.money);
        setReward(res.data.data.rewards);        
        setLoading(false);
      });
  };

 

  return (
    <Card className={classes.loginbig}>
        <Text variant="headingSm" as="h1">
        Reel: {reel}
      </Text>
      <Text variant="headingSm" as="h2">
        Reward: {reward}
      </Text>
      <Text variant="headingSm" as="h2">
      Current Balance: {money}
        </Text>
        
        <div className={classes.actions}>
        {loading ? <Text>Loading...</Text> :
          <Button onClick={()=> {
            spinSlot();
          }} className={classes.btn}>
            Spin Slot
          </Button>
          }
        </div>
        
      </Card>
  );
};

export default Slot;
