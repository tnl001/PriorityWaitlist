import React from 'react';
import './style/table.css';

const Table = (props) => {

    let data = [];

    for (let i = 0; i < props.readdata.length; i++) {
        data[i] = props.readdata[i];
    }

    return ( 
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Priority Level</th>
                </tr>
            </thead>
            
            <tbody>
                {data.map((guest) => (
                    <tr key={guest.uuid}>
                        <td>{guest.name}</td>
                        <td>{guest.priority}</td>
                    </tr>
                ))}
            </tbody>
            
            

        </table>
    );
        

}

export default Table;