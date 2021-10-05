import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import MaterialTable from 'material-table'
import axios from "axios";
import {JumpCircleLoading} from "react-loadingg";


export const TravelRecords = () => {

    const history = useHistory();

    const [journey, setPassengers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/journey').then((response) => {
            if (response.data.success) {
                console.log(response.data.journey);
                setPassengers(response.data.journey.map((item) => ({
                    id: item._id,
                    startJourney: item.startJourney,
                    endJourney: item.endJourney,
                    date: item.date,
                    time: item.time,
                    busRouteId: item.busRouteId,
                })));
                setIsLoading(false);
            } else {
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    }, [])

    // const deleteRoom = async (props) => {
    //
    //     console.log(props.data.id);
    //
    //     const id = props.data.id;
    //
    //     await axios.delete('http://localhost:8080/rooms/' + id).
    //     then((response) => {
    //         if(response.data.success){
    //             alert("Successfully deleted.");
    //
    //             axios.get('http://localhost:8080/rooms').
    //             then((response) => {
    //                 if(response.data.success) {
    //                     console.log(response.data.rooms);
    //                     setRooms(response.data.rooms.map((item) => ({
    //                         id: item._id,
    //                         name: item.name,
    //                         type: item.type,
    //                         beds: item.beds,
    //                         guests: item.guests,
    //                         space: item.space,
    //                         facilities: item.facilities.join(),
    //                         image: item.image,
    //                         price: item.price,
    //                         description: item.description,
    //                     })));
    //                 } else{
    //                     alert('An error occurred while retrieving data');
    //                     console.log(response.data.error);
    //                 }
    //             })
    //
    //         }else {
    //             alert('An error happened');
    //             console.log(response.data.error);
    //         }
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    return isLoading ? (
            <div className={'content'}>
                <div className={'dashboard-header'}>
                    Travel Records
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
                    Travel Records
                </div>
                <div className={'main-container-tables'}>
                    <div className={'table-container'}>
                        <MaterialTable
                            title="Travel Records"
                            columns={[
                                {title: 'id', field: 'id', hidden: true},
                                {title: 'Start Journey', field: 'startJourney'},
                                {title: 'End Journey', field: 'endJourney'},
                                {title: 'Date', field: 'date', type: 'date'},
                                {title: 'Time', field: 'time'},
                                {title: 'Bus Route ID', field: 'busRouteId'},
                            ]}
                            data={
                                journey
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
                                columnResizable: true
                            }}
                        />
                    </div>
                </div>
            </div>
        );

};
