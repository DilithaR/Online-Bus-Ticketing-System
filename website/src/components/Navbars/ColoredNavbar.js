import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledTooltip,} from "reactstrap";

function ColoredNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("#9cd9cb");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 399 ||
                document.body.scrollTop > 399
            ) {
                setNavbarColor("#9cd9cb");
            } else if (
                document.documentElement.scrollTop < 400 ||
                document.body.scrollTop < 400
            ) {
                setNavbarColor("#9cd9cb");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });
    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} expand="lg" style={{backgroundColor: "#9edacc"}}>
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            href=""
                            target="_blank"
                            id="navbar-brand"
                        >
                            <div className={'nav-logo'}>
                                BUZZY
                            </div>
                        </NavbarBrand>
                        <UncontrolledTooltip target="#navbar-brand">
                            BUZZY Travel System
                        </UncontrolledTooltip>
                        <button
                            className="navbar-toggler navbar-toggler"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setCollapseOpen(!collapseOpen);
                            }}
                            aria-expanded={collapseOpen}
                            type="button"
                        >
                            <span className="navbar-toggler-bar top-bar"></span>
                            <span className="navbar-toggler-bar middle-bar"></span>
                            <span className="navbar-toggler-bar bottom-bar"></span>
                        </button>
                    </div>
                    <Collapse
                        className="justify-content-end"
                        isOpen={collapseOpen}
                        navbar
                    >
                        <Nav navbar>
                            <NavItem>
                                <NavLink
                                    to="/" tag={Link}
                                >
                                    <p>Home</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to='/time-tables' tag={Link}
                                >
                                    <p>Time Tables</p>
                                </NavLink>
                            </NavItem>
                            {/*<NavItem>
                <NavLink
                    to="/halls" tag={Link}
                >
                  <p>Halls</p>
                </NavLink>
              </NavItem>*/}
                            <NavItem>
                                <NavLink
                                    to="/subscriptions" tag={Link}
                                >
                                    <p>Subscriptions</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/contact-us" tag={Link}
                                >
                                    <p>Contact Us</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/aboutUs" tag={Link}
                                >
                                    <p>About</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="/login" tag={Link}
                                >
                                    <p>Login</p>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default ColoredNavbar;
