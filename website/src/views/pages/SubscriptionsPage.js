import React, {useEffect} from "react";

// reactstrap components
import {Button, Col, Container, Row,} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import ColoredNavbar from "../../components/Navbars/ColoredNavbar";

function SubscriptionsPage() {
    /*const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);

    const [restaurants,setRestaurants] = useState([]);*/

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

    /*useEffect(() => {
        axios.get('http://localhost:8080/restaurants').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.restaurants);
                setRestaurants(response.data.restaurants.map((item) => ({
                    id: item._id,
                    header: item.restaurantName,
                    description: item.caption,
                    longDescription: item.description,
                    image: 'http://localhost:8080/uploads/'+item.image,
                })));
                setRestaurants(response.data.restaurants);
                setTimeout(() => console.log(restaurants.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])*/

    return (
        <>
            <IndexNavbar/>
            <div className="wrapper">
                <ColoredNavbar/>
                <div className="section section-about-us">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="100">
                                <h2 className="title">Introducing our Subscription Plans</h2>
                            </Col>
                        </Row>

                    </Container>
                    <div className="section section-team text-center">
                        <Container>
                            {/*<h2 className="title">Introducing our Subscription Plans</h2>*/}
                            <div className="team">
                                <Row>
                                    <Col md="4">
                                        <div className="team-player">
                                            <img
                                                alt="..."
                                                className="rounded-circle img-fluid img-raised"
                                                src={require("assets/img/platinum.jpg").default}
                                            ></img>
                                            <h4 className="title">Platinum</h4>
                                            <p className="category text-info">Rs.5000.00</p>
                                            <h7>
                                                Valid for 3 months.<br/>
                                                Arranging business class seats.<br/>
                                                Providing phone charging ports.<br/>

                                            </h7>
                                            <br/>
                                            <Button
                                                style={{
                                                    float: 'center',
                                                    marginTop: '10px',
                                                    color: "#000000",
                                                    bold: "true",
                                                    backgroundColor: '#9edacc',
                                                    fontFamily: 'Josefin Sans'
                                                }}
                                                type="submit">
                                                Subscribe
                                            </Button>

                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="team-player">
                                            <img
                                                alt="..."
                                                className="rounded-circle img-fluid img-raised"
                                                src={require("assets/img/gold.jpg").default}
                                            ></img>
                                            <h4 className="title">Gold</h4>
                                            <p className="category text-info">Rs.3000.00</p>
                                            <h7>
                                                Valid for 2 months.<br/>
                                                Arranging economy class seats.<br/>
                                                Providing phone charging ports.<br/>

                                            </h7>
                                            <br/>
                                            <Button
                                                style={{
                                                    float: 'center',
                                                    marginTop: '10px',
                                                    color: "#000000",
                                                    bold: "true",
                                                    backgroundColor: '#9edacc',
                                                    fontFamily: 'Josefin Sans'
                                                }}
                                                type="submit">
                                                Subscribe
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="team-player">
                                            <img
                                                alt="..."
                                                className="rounded-circle img-fluid img-raised"
                                                src={require("assets/img/silver.jpg").default}
                                            ></img>
                                            <h4 className="title">Silver</h4>
                                            <p className="category text-info">Rs.1500.00</p>
                                            <h7>
                                                Valid for 1 month.<br/>
                                                Arranging economy class seats.<br/>
                                                Providing phone charging ports.<br/>

                                            </h7>
                                            <br/>
                                            <Button
                                                style={{
                                                    float: 'center',
                                                    color: "#000000",
                                                    bold: "true",
                                                    marginTop: '10px',
                                                    backgroundColor: '#9edacc',
                                                    fontFamily: 'Josefin Sans'
                                                }}
                                                type="submit">
                                                Subscribe
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </div>

                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default SubscriptionsPage;
