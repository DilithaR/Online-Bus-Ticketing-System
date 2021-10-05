import React, {useEffect, useState} from 'react';
import Icon from '@material-ui/core/Icon';
import axios from "axios";
import {IconButton, TextField} from "@material-ui/core";
import * as yup from "yup";
import {useFormik} from "formik";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {JumpCircleLoading} from 'react-loadingg';


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


export const EditTimeTable = (props) => {

    const [isLoading, setIsLoading] = useState(true);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [bus, setBus] = useState('');
    const [seatCount, setSeatCount] = useState('');
    const [id, setId] = useState('');

    const history = useHistory();

    const data = history.location.state;

    useEffect(async () => {
        await axios.get('http://localhost:8080/busroute/' + props.match.params.id).then((response) => {
            if (response.data.success) {

                console.log(response.data.busRoute);
                const data = response.data.busRoute;

                setFrom(data.from);
                setTo(data.to);
                setStartTime(data.startTime);
                setEndTime(data.endTime);
                setBus(data.bus);
                setSeatCount(data.seatCount);
                setId(data._id);

                setIsLoading(false);

            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

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
            _id: id,
            from: from,
            to: to,
            startTime: startTime,
            endTime: endTime,
            bus: bus,
            seatCount: seatCount,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,

        onSubmit: (values, {resetForm}) => {

            const formData = new FormData();
            //formData.append('file');
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const busRoute = {
                _id: id,
                from: values.from,
                to: values.to,
                startTime: values.startTime,
                endTime: values.endTime,
                bus: values.bus,
                seatCount: values.seatCount
            }
            console.log("data response", busRoute);

            axios.put('http://localhost:8080/busroute', busRoute)
                .then(response => {
                    if (response.data.success) {
                        resetForm();
                        alert('Time Table Successfully Updated')
                        history.goBack();
                    } else {
                        alert('Failed to update')
                    }
                }).catch((error) => {
                alert(error.message);
            });
        },
    });

    return isLoading ? (
        <div>
            <div className={'content'}>
                <div className={'dashboard-header'}>
                    Time Table Management
                    <div className={'dashboard-subheader'}>
                        <IconButton aria-label="back"
                                    onClick={() => {
                                        history.goBack();
                                    }}>
                            <Icon style={{
                                color: '#5a2360',
                            }}>arrow_back_ios</Icon>
                        </IconButton>
                        Edit Time Table Details
                    </div>
                </div>
                <div className={'main-container'}>
                    <div className={'form-container'}>
                        Loading...
                        <JumpCircleLoading
                            color="#5a2360"
                            speed={0.5}
                            size="large"

                        />

                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Time Table Management
                <div className={'dashboard-subheader'}>
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
                            Save Changes
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    );
};
