import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import MaterialTable from 'material-table';
import {Button, Paper} from "@material-ui/core";
import axios from "axios";

export const Conductors = () => {
    const history = useHistory();
    const [conductors, setConductors] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/conductor').then((response) => {
            if (response.data.success) {
                console.log(response.data.conductor);
                setConductors(response.data.conductor.map((item) => ({
                    id: item._id,
                    conductorUserName: item.conductorUserName,
                    conductorPassword: item.conductorPassword,
                    bus: item.bus,

                })));
                setTimeout(console.log(conductors), 3000)
            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

    const deleteConductor = async (props) => {

        console.log(props.data.id);

        const id = props.data.id;

        await axios.delete('http://localhost:4000/conductor/' + id).then((response) => {
            if (response.data.success) {
                alert("Successfully deleted.");

                axios.get('http://localhost:4000/conductor').then((response) => {
                    if (response.data.success) {
                        console.log(response.data.conductor);
                        setConductors(response.data.conductor.map((item) => ({
                            id: item._id,
                            conductorUserName: item.conductorUserName,
                            conductorPassword: item.conductorPassword,
                            bus: item.bus,
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

    return (
        <div className={'content'}>
            <div className={'dashboard-header'}>
                Conductors
            </div>
            <div className={'main-container-tables'}>
                <div className={'table-container'}>
                    <MaterialTable
                        title=" conductors"
                        columns={[
                            {title: 'id', field: 'id', hidden: true},
                            {title: 'Name', field: 'conductorUserName'},
                            {title: 'Password', field: 'conductorPassword'},
                            {title: 'BusRoute', field: 'bus'},


                        ]}
                        data={
                            conductors
                        }
                        actions={[
                            {
                                icon: 'delete',
                                tooltip: 'Delete Conductor',

                            },
                            {
                                icon: "add_box",
                                tooltip: "Add new conductor",
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
                                    if (props.action.icon === 'delete') {
                                        return (
                                            <button
                                                class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                                                tabindex="0"
                                                type="button"
                                                title="Delete Conductor"
                                                onClick={(event, rowData) =>
                                                    deleteConductor(props)
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
                                                onClick={(event) => history.push('/conductors/add-conductor/')}
                                                variant="contained"
                                                //startIcon={<Icon>add</Icon>}
                                                /*component={Link}
                                                to='/employees/add-employee/'*/
                                                style={{
                                                    textTransform: 'none',
                                                    borderRadius: 35,
                                                    backgroundColor: '#5a2360',
                                                    fontFamily: 'Roboto',
                                                    color: 'white',
                                                }}
                                                size="medium"
                                            >
                                                Add a Conductor
                                            </Button>
                                        )
                                    }


                                }

                        }
                        }
                        options={{
                            actionsColumnIndex: -1,
                            tableLayout: 'auto',
                            //exportButton: true,
                            sorting: true,
                            pageSize: 6,
                            pageSizeOptions: [6],
                            showTitle: false,
                            toolbarButtonAlignment: 'left',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
