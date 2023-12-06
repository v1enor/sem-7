import React from 'react';
import './TimeSheldue';
import {pixelsPerHour} from '../../constants';


const TimeSheldue = () => {


    const tableRows = Array.from({ length: 24 }).map((_, index) => (
      <tr key={index} style={{ height: `${pixelsPerHour}px` }}>
        <td className="hour-marker" style={{ textAlign: 'center' }}>
          {index}:00
        </td>
        <td>
        </td>
      </tr>
    ));
  
    return (
      <div className="Time-Sheldue" style={{ position: 'relative' }}>
        <table className="schedule-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
};

export default TimeSheldue;
