import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import MaterialTable from 'material-table'
import {Paper} from "@material-ui/core";
import axios from "axios";
import {JumpCircleLoading} from "react-loadingg";


export const Passengers = () => {

    const history = useHistory();

    const [passengers, setPassengers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/passengers').then((response) => {
            if (response.data.success) {
                console.log(response.data.passenger);
                setPassengers(response.data.passenger.map((item) => ({
                    id: item._id,
                    name: item.name,
                    mobile: item.mobile,
                    userName: item.userName,
                    password: item.password,
                    email: item.email,
                    package: item.package,
                    qr: item.qr,
                    expiryDate: item.expiryDate,
                })));
                setIsLoading(false);
            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

    const deletePassenger = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/passengers/' + id).then((response) => {
            if (response.data.success) {
                alert("Successfully deleted.");

                axios.get('http://localhost:8080/passengers').then((response) => {
                    if (response.data.success) {
                        console.log(response.data.passenger);
                        setPassengers(response.data.passenger.map((item) => ({
                            id: item._id,
                            name: item.name,
                            mobile: item.mobile,
                            userName: item.userName,
                            password: item.password,
                            email: item.email,
                            package: item.package,
                            qr: item.qr,
                            expiryDate: item.expiryDate,
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
                    Passenger List
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
                    Passenger List
                </div>
                <div className={'main-container-tables'}>
                    <div className={'table-container'}>
                        <MaterialTable
                            title="Passenger List"
                            columns={[
                                {title: 'id', field: 'id', hidden: true},
                                {title: 'Name', field: 'name'},
                                {title: 'Mobile', field: 'mobile', type: 'numeric'},
                                {title: 'User Name', field: 'userName'},
                                {title: 'Password', field: 'password'},
                                {title: 'Email', field: 'email'},
                                {title: 'Package', field: 'package'},
                                {title: 'QR', field: 'qr'},
                                {title: 'Expiry Date', field: 'expiryDate', type: 'date'},
                            ]}
                            data={
                                passengers
                            }
                            actions={[

                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Bus Route',
                                    onClick: () => {
                                        console.log("clicked");
                                    }
                                },

                                {
                                    icon: 'delete',
                                    tooltip: 'Delete Passenger',

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
                                                    onClick={() => history.push('/passengers/travel-records')}
                                                >
                                                    <span class="MuiIconButton-label">
                                                        <span class="material-icons MuiIcon-root"
                                                              aria-hidden="true">
                                                            Journeys
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
                                                    title="Delete Passenger"
                                                    onClick={(event, rowData) =>
                                                        deletePassenger(props)
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
