import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import MaterialTable from 'material-table'
import axios from "axios";
import {JumpCircleLoading} from "react-loadingg";


export const Payments = () => {

    const history = useHistory();

    const [payment, setPayment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/payments').then((response) => {
            if (response.data.success) {
                console.log(response.data.payment);
                setPayment(response.data.payment.map((item) => ({
                    id: item._id,
                    package: item.package,
                    userid: item.userid,
                    date: item.date,
                    time: item.time
                })));
                setIsLoading(false);
            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

    const deleteRoom = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:8080/payments/' + id).then((response) => {
            if (response.data.success) {
                alert("Successfully deleted.");

                axios.get('http://localhost:8080/payments').then((response) => {
                    if (response.data.success) {
                        console.log(response.data.payment);
                        setPayment(response.data.payment.map((item) => ({
                            id: item._id,
                            package: item.package,
                            userid: item.userid,
                            date: item.date,
                            time: item.time
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
                    Subscription Details
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
                    Subscription Details
                </div>
                <div className={'main-container-tables'}>
                    <div className={'table-container'}>
                        <MaterialTable
                            title="Subscriptions and Payments"
                            columns={[
                                {title: 'id', field: 'id', hidden: true},
                                {title: 'Package', field: 'package'},
                                {title: 'UserId', field: 'userid'},
                                {title: 'Date', field: 'date'},
                                {title: 'Time', field: 'time'},
                            ]}
                            data={
                                payment
                            }
                            /*actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit Room',
                                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                                },

                                {
                                    icon: 'delete',
                                    tooltip: 'Delete Room',

                                },
                                {
                                    icon: "add_box",
                                    tooltip: "Add new room",
                                    isFreeAction:true,
                                    onClick: () => {
                                        console.log("clicked");
                                    }
                                }
                            ]}*/
                            /*components={{
                                Container: props => <Paper {...props} elevation={0}/>,
                                Action:
                                    props => {
                                        if(props.action.icon === 'edit'){
                                            return(
                                                <button
                                                    class="MuiButtonBase-root
                                                    MuiIconButton-root MuiIconButton-colorInherit"
                                                    tabindex="0"
                                                    type="button"
                                                    title="Edit Room"
                                                    onClick={(event, rowData) => {
                                                        history.push({
                                                            pathname:'/rooms/edit-room/' + props.data.id,
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
                                        if(props.action.icon === 'delete'){
                                            return(
                                                <button
                                                    class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                                                    tabindex="0"
                                                    type="button"
                                                    title="Delete Room"
                                                    onClick={(event, rowData) =>
                                                        deleteRoom(props)
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
                                        if(props.action.icon === 'add_box'){
                                            return(
                                                <Button
                                                    onClick={() => history.push('/rooms/add-room/')}
                                                    variant="contained"
                                                    startIcon={<Icon>add</Icon>}
                                                    style={{
                                                        textTransform: 'none',
                                                        borderRadius: 35,
                                                        backgroundColor: '#5a2360',
                                                        fontFamily: 'Roboto',
                                                        color:'white',
                                                    }}
                                                    size="medium"
                                                >
                                                    Add a room
                                                </Button>
                                            )
                                        }
                                    }

                            }}*/

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
