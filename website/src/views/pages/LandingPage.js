import React, {Fragment, useEffect, useState} from "react";

// reactstrap components
import {Col, Container, Row,} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
];

function LandingPage() {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [busRoute, setBusRoute] = useState([]);

    React.useEffect(() => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/busroute').then((response) => {
            if (response.data.success) {
                console.log(response.data.busRoute);
                setBusRoute(response.data.busRoute.map((item) => ({
                    id: item._id,
                    from: item.from,
                    to: item.to,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    bus: item.bus,
                    seatCount: item.seatCount,
                })));
                //setRooms(response.data.rooms);
                setTimeout(() => console.log(busRoute.length), 5000)
            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])


    return (
        <>
            <IndexNavbar/>
            <div className="wrapper">
                <LandingPageHeader/>
                <div className="section section-team text-center" style={{marginTop: '0px', paddingTop: '40px'}}>
                    <Container>
                        <h2 className="sub-header">Our passengers gets the best journey</h2>
                        <div className="team" style={{marginTop: '40px'}}>
                            <Row>
                                <Col md="3">
                                    <div className="team-player">
                                        <img
                                            alt="..."
                                            className="rounded-circle img-fluid img-raised"
                                            src={require("assets/img/clock.png").default}
                                            style={{
                                                flexShrink: "0",
                                                minWidth: "70%",
                                                minHeight: "70%"
                                            }}
                                        ></img>
                                        <h5 className="image-title">24/7 Service</h5>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="team-player">
                                        <img
                                            alt="..."
                                            className="rounded-circle img-fluid img-raised"
                                            src={require("assets/img/chair.png").default}
                                            style={{
                                                flexShrink: "0",
                                                minWidth: "70%",
                                                minHeight: "70%"
                                            }}
                                        ></img>
                                        <h5 className="image-title">Comfortable</h5>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="team-player">
                                        <img
                                            alt="..."
                                            className="rounded-circle img-fluid img-raised"
                                            src={require("assets/img/seat-belt.png").default}
                                            style={{
                                                flexShrink: "0",
                                                minWidth: "70%",
                                                minHeight: "70%"
                                            }}
                                        ></img>
                                        <h5 className="image-title">Safety</h5>
                                    </div>
                                </Col>
                                <Col md="3">
                                    <div className="team-player">
                                        <img
                                            alt="..."
                                            className="rounded-circle img-fluid img-raised"
                                            src={require("assets/img/support.png").default}
                                            style={{
                                                flexShrink: "0",
                                                minWidth: "70%",
                                                minHeight: "70%"
                                            }}
                                        ></img>
                                        <h5 className="image-title">Friendly</h5>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        {/*<div className="section section-team text-center">
                  <Container>
                      <h2 className="title">Here is our team</h2>
                      <div className="team">
                          <Row>
                              <Col md="4">
                                  <div className="team-player">
                                      <img
                                          alt="..."
                                          className="rounded-circle img-fluid img-raised"
                                          src={require("assets/img/avatar.jpg").default}
                                      ></img>
                                      <h4 className="title">Romina Hadid</h4>
                                      <p className="category text-info">Model</p>
                                      <p className="description">
                                          You can write here details about one of your team members.
                                          You can give more details about what they do. Feel free to
                                          add some{" "}
                                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                              links
                                          </a>{" "}
                                          for people to be able to follow them outside the site.
                                      </p>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-twitter"></i>
                                      </Button>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-instagram"></i>
                                      </Button>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-facebook-square"></i>
                                      </Button>
                                  </div>
                              </Col>
                              <Col md="4">
                                  <div className="team-player">
                                      <img
                                          alt="..."
                                          className="rounded-circle img-fluid img-raised"
                                          src={require("assets/img/ryan.jpg").default}
                                      ></img>
                                      <h4 className="title">Ryan Tompson</h4>
                                      <p className="category text-info">Designer</p>
                                      <p className="description">
                                          You can write here details about one of your team members.
                                          You can give more details about what they do. Feel free to
                                          add some{" "}
                                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                              links
                                          </a>{" "}
                                          for people to be able to follow them outside the site.
                                      </p>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-twitter"></i>
                                      </Button>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-linkedin"></i>
                                      </Button>
                                  </div>
                              </Col>
                              <Col md="4">
                                  <div className="team-player">
                                      <img
                                          alt="..."
                                          className="rounded-circle img-fluid img-raised"
                                          src={require("assets/img/eva.jpg").default}
                                      ></img>
                                      <h4 className="title">Eva Jenner</h4>
                                      <p className="category text-info">Fashion</p>
                                      <p className="description">
                                          You can write here details about one of your team members.
                                          You can give more details about what they do. Feel free to
                                          add some{" "}
                                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                              links
                                          </a>{" "}
                                          for people to be able to follow them outside the site.
                                      </p>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-google-plus"></i>
                                      </Button>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-youtube"></i>
                                      </Button>
                                      <Button
                                          className="btn-icon btn-round"
                                          color="info"
                                          href="#pablo"
                                          onClick={(e) => e.preventDefault()}
                                      >
                                          <i className="fab fa-twitter"></i>
                                      </Button>
                                  </div>
                              </Col>
                          </Row>
                      </div>
                  </Container>
              </div>*/}
                    </Container>
                    <br></br>
                    <br></br>
                    <div className={'container'}>
                        <Fragment>
                            <div className="card" style={{
                                width: "68rem",
                                height: "25rem",
                                margin: "10px",
                                backgroundColor: "#F0F1F0",
                            }}>

                                <div className="card-body">
                                    <h3 className="category" style={{
                                        color: "black",
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                    }}>Our passengers gets the best journey</h3>
                                    <Row>

                                        <TableContainer component={Paper}>
                                            <Table sx={{minWidth: 650}} aria-label="caption table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Starting Point</TableCell>
                                                        <TableCell align="right">Ending Point</TableCell>
                                                        <TableCell align="right">Start Time</TableCell>
                                                        <TableCell align="right">End Time</TableCell>
                                                        <TableCell align="right">Bus</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {busRoute.length > 0 && busRoute.map((item, index) => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    {item.from}
                                                                </TableCell>
                                                                <TableCell align="right">{item.to}</TableCell>
                                                                <TableCell align="right">{item.startTime}</TableCell>
                                                                <TableCell align="right">{item.endTime}</TableCell>
                                                                <TableCell align="right">{item.bus}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                    </Row>
                                </div>

                            </div>
                        </Fragment>
                    </div>
                </div>

                <TransparentFooter/>
            </div>
        </>
    );
}

export default LandingPage;
