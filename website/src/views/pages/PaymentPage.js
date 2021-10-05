import React, {Fragment, useEffect, useLayoutEffect, useState} from "react";
// reactstrap components
import {Col, Container, FormGroup, Input, Row,} from "reactstrap";

// core components
import TransparentFooter from "components/Footers/TransparentFooter";
import axios from "axios";
import {useHistory, useLocation} from "react-router";
import ColoredNavbar from "../../components/Navbars/ColoredNavbar";


export const PaymentPage = (props) => {
    const history = useHistory();

    const [subPackage, setPackage] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [id, setId] = useState('');

    const [isLoading, setIsLoading] = useState(true);


    let data;
    let dates = useLocation();

    useLayoutEffect(() => {
        data = history.location.state;
        console.log("History", data);
    })

    const [payments, setPayments] = useState([]);

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

    useEffect(async () => {
        console.log(dates)
        await axios.get('http://localhost:8080/payments/' + props.match.params.id).then((response) => {
            if (response.data.success) {

                console.log(response.data.payment);
                const data = response.data.payment;

                setId(data._id);
                setPackage(data.package);
                setDate(data.date);
                setTime(data.time);

                setIsLoading(false);


            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

    /*useEffect(() => {
        console.log("History data" , dates);

        console.log("data ", data);

        //setTimeout(()=>{
        setPackage(dates.package);
        setDate(dates.date);
        setTime(dates.time);
        //},5000)

        axios.get('http://localhost:8080/payments').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.payment);

                setPayments(response.data.payment);
                setTimeout(() => console.log(payments.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])*/


    const onSubmit = (values, {resetForm}) => {

        const formData = new FormData();
        //formData.append('file');
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const payment = {
            _id: id,
            package: values.package,
            date: values.date,
            time: values.time,
        }

        console.log(payment);

        axios.put('http://localhost:8080/payments', payment)
            .then(response => {
                if (response.data.success) {
                    alert('Payment  Successful')

                } else {
                    alert('Failed to Do the Payment')
                }

            }).catch(error => {
            alert(error);
        })


    }

    return (
        <>
            <ColoredNavbar/>
            <div className="wrapper">
                <div className="section section-team">
                    <Container>
                        <div className="team">

                            <Row>
                                <Col className="ml-auto mr-auto text-left" md="5">
                                    <div className="team-player">


                                        <h3 className="title">Guest Information</h3>

                                        <Container>
                                            <Fragment>
                                                <div className="card" style={{
                                                    width: "38rem",
                                                    height: "30rem",
                                                    margin: "10px",

                                                }}>
                                                    <Row>
                                                        <Col lg="6" sm="6">
                                                            <p className="category">Package</p>
                                                            <FormGroup>
                                                                <Input
                                                                    id="package"
                                                                    name="package"
                                                                    label="Package"
                                                                    defaultValue=""
                                                                    type="text"
                                                                    value={subPackage}
                                                                    onChange={(e) => {
                                                                        setPackage(e.target.value)
                                                                    }}
                                                                    inputProps={{placeholder: "Package"}}
                                                                ></Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="6" sm="6">
                                                            <p className="category">Date</p>
                                                            <FormGroup>
                                                                <Input
                                                                    id="date"
                                                                    name="date"
                                                                    label="Date"
                                                                    type="date"
                                                                    value={date}
                                                                    onChange={(e) => setDate(e.target.value)}
                                                                    inputProps={{placeholder: "date"}}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <br></br>
                                                    <Row>
                                                        <Col lg="12" sm="6">
                                                            <p className="category">Time Period</p>
                                                            <FormGroup>
                                                                <Input
                                                                    id="time"
                                                                    name="time"
                                                                    label="Time Perod"
                                                                    type="text"
                                                                    value={time}
                                                                    onChange={(e) => {
                                                                        setTime(e.target.value)
                                                                    }}
                                                                    inputProps={{placeholder: "Time Period"}}
                                                                ></Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <br></br>
                                                    {/*<Row>*/}
                                                    {/*    <Col lg="12" sm="6">*/}
                                                    {/*        <p className="category">Mobile</p>*/}
                                                    {/*        <FormGroup>*/}
                                                    {/*            <Input*/}
                                                    {/*                id="mobile"*/}
                                                    {/*                name="mobile"*/}
                                                    {/*                label="Mobile"*/}
                                                    {/*                defaultValue=""*/}
                                                    {/*                type="number"*/}
                                                    {/*                value={mobile}*/}
                                                    {/*                onChange={(e) => {setMobile(e.target.value)}}*/}
                                                    {/*                inputProps={{ placeholder: "Mobile" }}*/}
                                                    {/*            ></Input>*/}
                                                    {/*        </FormGroup>*/}
                                                    {/*    </Col>*/}
                                                    {/*</Row>*/}


                                                </div>
                                            </Fragment>

                                            <br></br>

                                        </Container>

                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </Container>
                </div>

                <TransparentFooter/>
            </div>
        </>
    );
}

export default PaymentPage;
