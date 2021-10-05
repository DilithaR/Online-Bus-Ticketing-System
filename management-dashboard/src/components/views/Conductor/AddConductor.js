import React, {useEffect} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {TextField} from "@material-ui/core";
import * as yup from "yup";
import {useFormik} from "formik";
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
export const AddConductor = () => {
    const validationSchema = yup.object({
        conductorUserName: yup
            .string('Enter conductor name')
            .required('Name is required'),
        conductorPassword: yup
            .string('Enter conductor password')
            .required('Password is required'),
        bus: yup
            .string('Enter bus route')
            .required('Bus route is required'),

    });
    const formik = useFormik({
        initialValues: {
            conductorUserName: '',
            conductorPassword: '',
            bus: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const conductors = {
                conductorUserName: values.conductorUserName,
                conductorPassword: values.conductorPassword,
                bus: values.bus,
            }

            axios.post('http://localhost:4000/conductor', conductors)
                .then(response => {
                    if (response.data.success) {
                        alert('Conductor Successfully Added')

                    } else {
                        alert('Failed to add conductor')
                    }

                }).catch(error => {
                alert(error);
            })

        },
    });
    useEffect(() => {

    }, [])
    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Add Conductor
                <div className={'dashboard-subheader'}>
                    {/*TODO Align icon an route to go back*/}
                    <Icon style={{
                        color: '#5a2360',
                    }}>arrow_back_ios</Icon>
                    Add Conductor
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="conductorUserName"
                            name="conductorUserName"
                            label="Name"
                            value={formik.values.conductorUserName}
                            onChange={formik.handleChange}
                            error={formik.touched.conductorUserName && Boolean(formik.errors.conductorUserName)}
                            helperText={formik.touched.conductorUserName && formik.errors.conductorUserName}
                        />
                        <TextField
                            fullWidth
                            id="conductorPassword"
                            name="conductorPassword"
                            label="Password"
                            multiline
                            value={formik.values.conductorPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.conductorPassword && Boolean(formik.errors.conductorPassword)}
                            helperText={formik.touched.conductorPassword && formik.errors.conductorPassword}
                        />
                        <TextField
                            fullWidth
                            id="bus"
                            name="bus"
                            label="BusRoute"
                            multiline
                            value={formik.values.bus}
                            onChange={formik.handleChange}
                            error={formik.touched.bus && Boolean(formik.errors.bus)}
                            helperText={formik.touched.bus && formik.errors.bus}
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
                            Add Conductor
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>

    );

};
