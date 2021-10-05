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

export const AddTimeTable = () => {

    const history = useHistory();

    const validationSchema = yup.object({
        from: yup
            .string('Enter starting point')
            .required('starting point is required'),
        to: yup
            .string('Select ending point')
            .required('ending point is required'),
        startTime: yup
            .string('Enter Start Time')
            .required('Start Time is required'),
        endTime: yup
            .string('Enter End Time')
            .required('End Time is required'),
        bus: yup
            .string('Enter Bus Name')
            .required('Bus Name is required'),
        seatCount: yup
            .number('Enter Seat Count')
            .required('Seat Count is required'),
    });

    const formik = useFormik({
        initialValues: {
            from: '',
            to: '',
            startTime: '',
            endTime: '',
            bus: '',
            seatCount: null,
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

            const busRoute = {
                from: values.from,
                to: values.to,
                startTime: values.startTime,
                endTime: values.endTime,
                bus: values.bus,
                seatCount: values.seatCount,
            }

            axios.post('http://localhost:8080/busroute', busRoute)
                .then(response => {
                    if (response.data.success) {
                        resetForm();
                        alert('Time table Added Successful');
                        history.goBack();
                    } else {
                        alert('Failed to add Time Table')
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
                Time Table Management
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
                    Add a Time Table
                </div>
            </div>
            <div className={'main-container'}>
                <div className={'form-container'}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="from"
                            name="from"
                            label="Starting Point"
                            value={formik.values.from}
                            onChange={formik.handleChange}
                            error={formik.touched.from && Boolean(formik.errors.from)}
                            helperText={formik.touched.from && formik.errors.from}
                        />
                        <TextField
                            fullWidth
                            id="to"
                            name="to"
                            label="Ending Point"
                            value={formik.values.to}
                            onChange={formik.handleChange}
                            error={formik.touched.to && Boolean(formik.errors.to)}
                            helperText={formik.touched.to && formik.errors.to}
                        />
                        <TextField
                            fullWidth
                            id="startTime"
                            name="startTime"
                            label="start Time"
                            value={formik.values.startTime}
                            onChange={formik.handleChange}
                            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                            helperText={formik.touched.startTime && formik.errors.startTime}
                        />
                        <TextField
                            fullWidth
                            id="endTime"
                            name="endTime"
                            label="endTime"
                            value={formik.values.endTime}
                            onChange={formik.handleChange}
                            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                            helperText={formik.touched.endTime && formik.errors.endTime}
                        />
                        <TextField
                            fullWidth
                            id="bus"
                            name="bus"
                            label="Bus Name"
                            value={formik.values.bus}
                            onChange={formik.handleChange}
                            error={formik.touched.bus && Boolean(formik.errors.bus)}
                            helperText={formik.touched.bus && formik.errors.bus}
                        />
                        <TextField
                            fullWidth
                            id="seatCount"
                            name="seatCount"
                            label="seatCount"
                            value={formik.values.seatCount}
                            onChange={formik.handleChange}
                            error={formik.touched.seatCount && Boolean(formik.errors.seatCount)}
                            helperText={formik.touched.seatCount && formik.errors.seatCount}
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
                            Add Time Table
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
