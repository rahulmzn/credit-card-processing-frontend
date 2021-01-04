import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(7),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(1, 0, 2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    }
}));


const viewStyles = makeStyles(theme => ({

    table: {
        width: "100%",
       borderColor:"black"

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: `10px`,
        height: "100%",
        width: "99%",
        marginTop: theme.spacing(7)
    },
    link: {
        color: "rgba(0,0,0,0.65)",
        textDecoration: "none",
        marginLeft: "10%",
        alignSelf: "flex-start",
        "&:hover": {
            color: "rgba(0,0,0,1)"
        }
    }
}));


export default function AddCard() {
    const classes = useStyles();
    const viewClass = viewStyles();
    const [firstLoad, setLoad] = React.useState(true);
    //view
    const [data, upDateData] = React.useState([]);
    const [viewFirstLoad, setViewLoad] = React.useState(true);

    //error
    const [error, setError] = React.useState(null)
    const errorDiv = error
        ? <div className="error">
            <i class="material-icons error-icon" >Invalid data entered: </i>
            {error}
        </div>
        : '';

    const [name, setName] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [limit, setLimit] = React.useState("");

    const handleNameChange = event => setName(event.target.value);
    const handleCardNumber = event => setCardNumber(event.target.value);
    const handleLimit = event => setLimit(event.target.value);
    const [message, setMessage] = React.useState("");

    async function callAddCard(toInput) {
        const response = await fetch("/api/v1/cards", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            body: JSON.stringify(toInput) // body data type must match "Content-Type" header
        });
        const data = await response.json();

        if(!data.exception){
        setMessage(response.ok ? "Card Added successfully" : "message");
        setError(JSON.stringify(data))}
        else{
            data.errors.forEach(error => {
                setError( error.message+ ",")
            })
        }
    }

    const handleSubmit = variables => {
        const addCardRequest = {name, number: cardNumber, limit: limit, brand: "VISA"};
        callAddCard(addCardRequest)
        setName("");
        setCardNumber("");
        setLimit("");
        viewSampleFunc();
    };

    if (firstLoad) {
        // sampleFunc();
        setLoad(false);
    }

    let isLoading = true;

    async function viewSampleFunc() {
        let response = await fetch("/api/v1/cards");
        let body = await response.json();
        upDateData(body);
    }

    if (viewFirstLoad) {
        viewSampleFunc();
        setViewLoad(false);
    }

    if (data.length > 0) isLoading = false;

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h2">Credit Card System</Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2} maxWidth="xs">
                        <Grid item xs={3}>
                            <Typography align={"left"} style={{margin: 7, }} variant="body1">Status: {message}</Typography>
                            {errorDiv}
                            <TextField variant="outlined" required fullWidth id="name" value={name} label="Name" name="name" autoComplete="name" onChange={handleNameChange}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><TextField variant="outlined" required fullWidth id="cardNumber" value={cardNumber} label="Card Number" name="cardNumber" autoComplete="Card Number" onChange={handleCardNumber}/></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField variant="outlined" required fullWidth id="limit" value={limit} label="Limit" name="limit" autoComplete="Limit" onChange={handleLimit}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item alignItems={"center"}>
                            <Button   variant="contained" color="primary" preventDefault  onClick={handleSubmit}>Add</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <div style={{width: "100%", margin: "010px"}}>
                <Typography component="h1" variant="h5">
                    Existing cards
                </Typography>

                {isLoading ? (<CircularProgress/>) : (
                    <TableContainer component={Paper}>
                        <Table className={viewClass.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Card Number</StyledTableCell>
                                    <StyledTableCell align="center">Balance</StyledTableCell>
                                    <StyledTableCell align="center">Limit</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map(card => (
                                    <StyledTableRow key={card.name}>
                                        <StyledTableCell align="center" component="th" scope="row">{card.name}</StyledTableCell>
                                        <StyledTableCell align="center">{card.number}</StyledTableCell>
                                        <StyledTableCell align="center">{card.balance}</StyledTableCell>
                                        <StyledTableCell align="center">{card.limit}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>

        </Container>
    );
}
