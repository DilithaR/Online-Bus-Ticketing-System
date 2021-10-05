import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import MaterialTable from 'material-table'
import {Button, Paper} from "@material-ui/core";
import axios from "axios";
import {JumpCircleLoading} from "react-loadingg";


export const TimeTables = () => {

    const history = useHistory();

    const [busRoute, setBusRoute] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

    const deleteBusRoute = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/busroute/' + id).then((response) => {
            if (response.data.success) {
                alert("Successfully deleted.");

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
                    } else {
                        alert('An error occurred while retrieving data');
                        console.log(response.data.error);
                    }
                })

            } else {
                alert('An error happened');
                console.log(response.data.error);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return isLoading ? (
            <div className={'content'}>
                <div className={'dashboard-header'}>
                    Time Table Management
                </div>
                <div className={'main-container-tables'}>
                    <div className={'table-container'}>
                        Fetching data...
                        <JumpCircleLoading
                            color="#5a2360"
                            speed={0.5}
                            size="large"

                        />
                    </div>
                </div>
            </div>
        )
        : (
            <div className={'content'}>
                <div className={'dashboard-header'}>
                    Time Table Management
                </div>
                <div className={'main-container-tables'}>
                    <div className={'table-container'}>
                        <MaterialTable
                            title="Rooms and Suites"
                            columns={[
                                {title: 'id', field: 'id', hidden: true},
                                {title: 'Starting Point', field: 'from'},
                                {title: 'Ending Point', field: 'to'},
                                {title: 'Start Time', field: 'startTime'},
                                {title: 'End Time', field: 'endTime'},
                                {title: 'Bus', field: 'bus'},
                                {title: 'Seat Count', field: 'seatCount'},
                            ]}
                            data={
                                busRoute
                            }
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Bus Route',
                                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                                },

                                {
                                    icon: 'delete',
                                    tooltip: 'Delete Bus Route',

                                },
                                {
                                    icon: "add_box",
                                    tooltip: "Add new time table",
                                    isFreeAction: true,
                                    onClick: () => {
                                        console.log("clicked");
                                    }
                                }
                            ]}
                            components={{
                                Container: props => <Paper {...props} elevation={0}/>,
                                Action:
                                    props => {
                                        if (props.action.icon === 'edit') {
                                            return (
                                                <button
                                                    class="MuiButtonBase-root
                                                    MuiIconButton-root MuiIconButton-colorInherit"
                                                    tabindex="0"
                                                    type="button"
                                                    title="Edit Time Table"
                                                    onClick={(event, rowData) => {
                                                        history.push({
                                                            pathname: '/timetables/edit-timetable/' + props.data.id,
                                                            state: props.data
                                                        });
                                                        console.log(props.data);
                                                    }}
                                                >
                                                    <span class="MuiIconButton-label">
                                                        <span class="material-icons MuiIcon-root"
                                                              aria-hidden="true">
                                                            edit
                                                        </span>
                                                </span>
                                                    <span class="MuiTouchRipple-root"></span>
                                                </button>
                                                //</Link>
                                            )
                                        }
                                        if (props.action.icon === 'delete') {
                                            return (
                                                <button
                                                    class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                                                    tabindex="0"
                                                    type="button"
                                                    title="Delete Inspector"
                                                    onClick={(event, rowData) =>
                                                        deleteBusRoute(props)
                                                    }
                                                >
                                                <span
                                                    class="MuiIconButton-label">
                                                    <span class="material-icons MuiIcon-root"
                                                          aria-hidden="true">
                                                        delete
                                                    </span>
                                                </span>
                                                    <span class="MuiTouchRipple-root"></span>
                                                </button>
                                            )
                                        }
                                        if (props.action.icon === 'add_box') {
                                            return (
                                                <Button
                                                    onClick={() => history.push('/timetables/add-timetable/')}
                                                    variant="contained"
                                                    //startIcon={<Icon>add</Icon>}
                                                    style={{
                                                        textTransform: 'none',
                                                        borderRadius: 35,
                                                        backgroundColor: '#5a2360',
                                                        fontFamily: 'Roboto',
                                                        color: 'white',
                                                    }}
                                                    size="medium"
                                                >
                                                    Add a Time Table
                                                </Button>
                                            )
                                        }
                                    }

                            }}

                            options={{
                                actionsColumnIndex: -1,
                                tableLayout: 'auto',
                                //exportButton: true,
                                sorting: true,
                                pageSize: 6,
                                pageSizeOptions: [6],
                                showTitle: false,
                                toolbarButtonAlignment: 'left',
                                columnResizable: true
                            }}
                        />
                    </div>
                </div>
            </div>
        );
};
