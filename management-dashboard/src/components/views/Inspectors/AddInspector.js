import React, {useEffect} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {IconButton, TextField} from "@material-ui/core";
import * as yup from "yup";
import {useFormik} from "formik";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

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

const facilitiesSet = ['TV', 'Ensuite Bathroom', 'Balcony', 'Mini fridge', 'WiFi'];

export const AddInspector = () => {

    const history = useHistory();

    const validationSchema = yup.object({
        name: yup
            .string('Enter inspector name')
            .required('Inspector name is required'),
        email: yup
            .string('Select email')
            .required('email is required'),
        userName: yup
            .string('Enter Username')
            .required('User Name is required'),
        password: yup
            .string('Enter Password')
            .required('Inspector password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            userName: '',
            password: '',
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

            const inspector = {
                name: values.name,
                email: values.email,
                userName: values.userName,
                password: values.password,
            }

            axios.post('http://localhost:8080/inspector', inspector)
                .then(response => {
                    if (response.data.success) {
                        resetForm();
                        alert('Inspector Added Successful');
                        history.goBack();
                    } else {
                        alert('Failed to add inspector')
                    }
                }).catch((error) => {
                alert(error.message);
            })
        },
    });

    useEffect(() => {
    }, [])

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Inspector Management
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <IconButton aria-label="back"
                                onClick={() => {
                                    history.goBack();
                                }}>
                        <Icon style={{
                            color: '#5a2360',
                        }}>arrow_back_ios</Icon>
                    </IconButton>
                    Add an Inspector
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="userName"
                            name="userName"
                            label="Username"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <SubmitButton
                            style={{
                                float: 'right',
                                marginTop: '10px',
                                backgroundColor: '#5a2360',
                                fontFamily: 'Josefin Sans'
                            }}
                            type="submit"
                        >
                            Add Inspector
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
