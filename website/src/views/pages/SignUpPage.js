import React from "react";

// reactstrap components
import {Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, InputGroup,} from "reactstrap";
import * as yup from "yup";
import {useFormik} from "formik";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import {useHistory} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  margin-left: 1rem;;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px;
  letter-spacing: 1.5px;
  font-weight: 500;
  color: #ffffff;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  text-align: center;

  &:hover {
    background-color: #5a2360;
    box-shadow: 0px 4px 12px rgba(72, 28, 76, 0.4);
    color: #fff;
    transform: translateY(-2px);
  }
`;

function SignUpPage() {
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
    const history = useHistory();

    const validationSchema = yup.object({
        name: yup
            .string('Enter name')
            .required('Name is required'),
        userName: yup
            .string('Enter User Name')
            .required('user name is required'),
        password: yup
            .string('Enter Password')
            .required('Password is required'),
        email: yup
            .string('Enter email')
            .required('email is required'),
        mobile: yup
            .string('Enter Mobile Number')
            .required('Mobile Number is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            userName: '',
            password: '',
            email: '',
            mobile: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {

            console.log("onsubmit");

            const formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const passenger = {
                name: values.name,
                userName: values.userName,
                password: values.password,
                email: values.email,
                mobile: values.mobile,
            }

            axios.post('http://localhost:8080/passengers', passenger)
                .then(response => {
                    if (response.data.success) {
                        resetForm();
                        alert('Registration Successful');
                    } else {
                        alert('Failed to Register')
                    }
                }).catch((error) => {
                alert(error.message);
            })
        },
    });

    //useEffect(() => {},[])
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
                        <Col className="ml-auto mr-auto" md="6">
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
                                        <form onSubmit={formik.handleSubmit}>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    label="Name"
                                                    placeholder="Name"
                                                    type="text"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                                    helperText={formik.touched.name && formik.errors.name}
                                                />
                                            </InputGroup>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <Input
                                                    id="userName"
                                                    name="userName"
                                                    label="User Name"
                                                    placeholder="User Name"
                                                    type="text"
                                                    value={formik.values.userName}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                                    helperText={formik.touched.userName && formik.errors.userName}
                                                />
                                            </InputGroup>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    label="Password"
                                                    placeholder="Password"
                                                    type="text"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                                    helperText={formik.touched.password && formik.errors.password}
                                                />
                                            </InputGroup>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    label="Email"
                                                    placeholder="Email"
                                                    type="text"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                                    helperText={formik.touched.email && formik.errors.email}
                                                />
                                            </InputGroup>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <Input
                                                    id="mobile"
                                                    name="mobile"
                                                    label="Mobile Number"
                                                    placeholder="Mobile Number"
                                                    type="text"
                                                    value={formik.values.mobile}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                                />
                                            </InputGroup>
                                            <CardFooter className="text-center">
                                                <SubmitButton
                                                    //block
                                                    className="btn-round"
                                                    //color="info"
                                                    style={{
                                                        backgroundColor: "#9edacc"
                                                    }
                                                    }
                                                    type="submit"
                                                    //size="lg"
                                                >
                                                    Register
                                                </SubmitButton>
                                            </CardFooter>
                                        </form>
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

export default SignUpPage;
