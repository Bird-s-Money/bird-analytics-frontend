import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Address from "./address";
import XGridDemo from "./transactions";
import Summary from "./summary";
import Bird from "./../bird_logo.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  root: {
    background: "none",
    backgroundColor: "transparent",
  },
  body: {
    background: "none",
    backgroundColor: "transparent",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  marginTop: {
    marginTop: theme.spacing(8),
  },
  nodes:{
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(6),
    textAlign: "center"
  },
  noPadding:{
    padding: theme.spacing(0),
  }
}));

function Copyright() {
  return (
    <div>
      <Typography variant="body1" color="textPrimary" align="center">
        How to Use <br />
        Add an account with transaction history on the ethereum mainnet to see
        valid result. Any issues, please contact admin@bird.money
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" target="_blank" href="https://bird.money">
          Bird.Money
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        <br />
        Follow us on &nbsp;
        <Link
          color="error"
          target="_blank"
          href="https://twitter.com/_birdmoney"
        >
          Twitter
        </Link>{" "}
        |
        <Link color="error" target="_blank" href="https://discord.gg/Z2BeCnS">
          &nbsp;Discord
        </Link>{" "}
        |
        <Link
          color="error"
          target="_blank"
          href="https://medium.com/bird-money"
        >
          &nbsp;Medium
        </Link>
      </Typography>
      <div></div>
    </div>
  );
}

const Main = (props) => {
  const classes = useStyles();
  const account = props.account;

  const [valueOfUserInput, setUserChange] = useState("");
  const [Ethersdata, setEtherdata] = useState("");
  const [birdData, setBirddata] = useState("");
  const [EthBalance, setEthBalance] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // loadEtherscan(valueOfUserInput);
    EtherBalance(valueOfUserInput);
  };

  useEffect(() => {
    const trigger = async () => {
      if (account) {
        await loadDefault();
      }
    };
    trigger();
  }, []);

  const loadDefault = async () => {
    // loadEtherscan(account);
    EtherBalance(account);
  };

  const handleUserInputChange = (e) => {
    setUserChange(e.target.value);
  };

  // TODO: load data through bird api as oppose to therscan api
  // function loadEtherscan(address) {
  //   const etherApi = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API}`;
  //   fetch(etherApi)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         const data = result.result;
  //         // console.log(data)
  //         setEtherdata(data);
  //       },
  //       (error) => {
  //         console.log(error);
  //         setError(error);
  //       }
  //     );
  // }

  function EtherBalance(address) {
    const birdApi = `https://www.bird.money/analytics/address/${address}`;
    fetch(birdApi)
      .then((res) => res.json())
      .then(
        (result) => {
          setBirddata(result)
          const balance = result.eth_balance.toFixed(4);
          setEthBalance(balance);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }

  return (
    <Container className={classes.root}>
      {
        birdData ? (
          <Summary bird={birdData}></Summary>
        ) : (
          <div>{error}</div>
          // <div>No Transaction History</div>
        ) // or whatever loading state you want, could be null
      }

      <Container className={ classes.noPadding}>

        <Grid className={classes.marginTop}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4">
              Off-Chain Oracle Nodes
            </Typography>
          </Grid>

          <Grid container spacing={3}>

            <Grid item xs>
              <Paper className={classes.paper, classes.nodes}>

                <Typography variant="h4" >
                  Node 1
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Status: <span >Active</span>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom >
                  Address
                  <br />
                  {'0x0B6A33CfbbA02159E0D87086094609C867F04E42'}
                </Typography>

              </Paper>
            </Grid>
            
            <Grid item xs>
              <Paper className={classes.paper, classes.nodes}>

                <Typography variant="h4" >
                  Node 2
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Status: <span>Active</span>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom >
                  Address
                  <br />
                  {'0x0B6A33CfbbA02159E0D87086094609C867F04E42'}
                </Typography>

              </Paper>
            </Grid>
            
            <Grid item xs>
              <Paper className={classes.paper, classes.nodes}>

                <Typography variant="h4" >
                  Node 3
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Status: <span>Active</span>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom >
                  Address
                  <br />
                  {'0x4eC9763c0322147d8119cD8517A6f0E42EEaf540'}
                </Typography>

              </Paper>
            </Grid>
            
          </Grid>
        
        </Grid>
      </Container>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Main;
