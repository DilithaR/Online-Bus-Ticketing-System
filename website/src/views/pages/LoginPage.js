import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import {Link} from "react-router-dom";

function LoginPage() {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);
    return (
        <>
            <IndexNavbar/>
            <div className="page-header clear-filter" filter-color="blue">
                {/*<div
                    className="page-header-image"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/loginbus.jpg").default + ")",
                    }}
                ></div>*/}
                <div className="content">
                    <Container>
                        <Col className="ml-auto mr-auto" md="4">
                            <Card className="card-login card-plain">
                                <Form action="" className="form" method="">
                                    <CardHeader className="text-center">
                                        <div className="logo-container">
                                            <img
                                                alt="..."
                                                src={require("assets/img/user.png").default}
                                            ></img>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (firstFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons users_circle-08"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="User Name"
                                                type="text"
                                                onFocus={() => setFirstFocus(true)}
                                                onBlur={() => setFirstFocus(false)}
                                            ></Input>
                                        </InputGroup>
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (lastFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons text_caps-small"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Password"
                                                type="text"
                                                onFocus={() => setLastFocus(true)}
                                                onBlur={() => setLastFocus(false)}
                                            ></Input>
                                        </InputGroup>
                                        <CardFooter className="text-center">
                                            <Button
                                                block
                                                className="btn-round"
                                                //color="info"
                                                style={{
                                                    backgroundColor: "#9edacc"
                                                }
                                                }
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                size="lg"
                                            >
                                                Login
                                            </Button>
                                            <div className="pull-left link">
                                                <h6>
                                                    <Link to={{
                                                        pathname: '/signup',
                                                    }} style={{
                                                        color: "#ffffff"
                                                    }}>
                                                        {/*<a
                                                        className="link"
                                                        href="/signup"
                                                        onClick={(e) => e.preventDefault()}
                                                    >*/}
                                                        Create Account
                                                        {/*</a>*/}
                                                    </Link>
                                                </h6>
                                            </div>
                                            {/*<div className="pull-right">
                                                <h6>
                                                    <a
                                                        className="link"
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        Need Help?
                                                    </a>
                                                </h6>
                                            </div>*/}
                                        </CardFooter>
                                    </CardBody>

                                </Form>
                            </Card>
                        </Col>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
