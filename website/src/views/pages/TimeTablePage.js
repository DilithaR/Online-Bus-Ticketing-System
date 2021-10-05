import React, {Fragment, useEffect, useState} from "react";

// reactstrap components
import {Col, Container,} from "reactstrap";

// core components
import TransparentFooter from "components/Footers/TransparentFooter";
import axios from "axios";
import {useHistory} from "react-router";
import ColoredNavbar from "../../components/Navbars/ColoredNavbar";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

function TimeTablesPage() {

    const history = useHistory();
    const [busRoute, setBusRoute] = useState([]);

    useEffect(() => {
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
            <ColoredNavbar/>
            <div className="wrapper">
                <div className="section section-about-us">
                    <Container>
                        <Col className="ml-auto mr-auto text-center" md="60">
                            <h2 className="title">Bus Routes</h2>
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
                                                                    <TableCell
                                                                        align="right">{item.startTime}</TableCell>
                                                                    <TableCell align="right">{item.endTime}</TableCell>
                                                                    <TableCell align="right">{item.bus}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })}

                                                        {/*// <TableRow>*/}
                                                        {/*//     <TableCell component="th" scope="row">*/}
                                                        {/*//         Matara*/}
                                                        {/*//     </TableCell>*/}
                                                        {/*//     <TableCell align="right">Galle</TableCell>*/}
                                                        {/*//     <TableCell align="right">8.00AM</TableCell>*/}
                                                        {/*//     <TableCell align="right">10.00AM</TableCell>*/}
                                                        {/*//     <TableCell align="right">FIS</TableCell>*/}
                                                        {/*// </TableRow>*/}
                                                        {/*// <TableRow>*/}
                                                        {/*//     <TableCell component="th" scope="row">*/}
                                                        {/*//         Matara*/}
                                                        {/*//     </TableCell>*/}
                                                        {/*//     <TableCell align="right">Galle</TableCell>*/}
                                                        {/*//     <TableCell align="right">8.00AM</TableCell>*/}
                                                        {/*//     <TableCell align="right">10.00AM</TableCell>*/}
                                                        {/*//     <TableCell align="right">FIS</TableCell>*/}
                                                        {/*// </TableRow>*/}
                                                        {/*// <TableRow>*/}
                                                        {/*//     <TableCell component="th" scope="row">*/}
                                                        {/*//         Matara*/}
                                                        {/*//     </TableCell>*/}
                                                        {/*//     <TableCell align="right">Galle</TableCell>*/}
                                                        {/*//     <TableCell align="right">8.00AM</TableCell>*/}
                                                        {/*//     <TableCell align="right">10.00AM</TableCell>*/}
                                                        {/*//     <TableCell align="right">FIS</TableCell>*/}
                                                        {/*// </TableRow>*/}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>

                                    </div>
                                </Fragment>
                            </div>
                        </Col>
                    </Container>
                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default TimeTablesPage;
