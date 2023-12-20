import React, { useState, useEffect } from 'react';
import { getEvents } from '../../services/apiEvents';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Brush } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const saveAsPDF = () => {
    const input = document.querySelector('.stats');

    html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape');
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("download.pdf"); 
        });
}

async function getDataEvent() {
    const data = await getEvents();

    const groupedData = data.reduce((acc, event) => {
        const date = new Date(event.startTime).toDateString();
        const timeSpent = (new Date(event.endTime) - new Date(event.startTime)) / (1000 * 60 * 60);

        if (acc[date]) {
            acc[date] += timeSpent;
        } else {
            acc[date] = timeSpent;
        }

        return acc;
    }, {});

    return groupedData;
};

const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

const StatContainer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1); // 1 month ago

        getDataEvent().then(groupedData => {
            const dates = getDates(startDate, endDate);
            const chartData = dates.map(date => {
                const dateString = date.toDateString();
                return { date: dateString, timeSpent: groupedData[dateString] || 0 };
            });

            setData(chartData);
        });
    }, []);
    return (
        <div className='stats' style={{ width: '100%', height: '500px' }}>
            <button onClick={saveAsPDF}>Save as PDF</button>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="timeSpent" fill="#8884d8" />
                    <Brush dataKey="date" height={30} stroke="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
   
export default StatContainer;