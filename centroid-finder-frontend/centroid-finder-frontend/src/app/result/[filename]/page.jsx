'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SettingsContext } from "@/context/SettingsContext";
import { useParams } from 'next/navigation';
import Papa from 'papaparse';

export default function PreviewPage({ children, params }){
    const [csvData, setCsvData] = useState([]);

    // Get filename from context or fallback to route param
    const { filename: contextFilename } = useContext(SettingsContext);
    const { filename: paramFilename } = useParams();

    const filename = contextFilename || paramFilename;
    
    if (!filename){
        return <p>Loading...</p>;
    }    

    // Remove ".mp4" to get the CSV base name
    const csvFilename = filename.replace(/\.mp4$/, '');

    useEffect(() => {
    // Fetch and parse the CSV
    fetch(`/api/results/file?filename=${csvFilename}.csv`)
        .then(res => res.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true, // use first row as headers
                skipEmptyLines: true,
                complete: (results) => {
                    setCsvData(results.data); // save parsed data
                },
            });
        })
        .catch(err => {
            console.error("Error loading CSV:", err);
        });
    }, [csvFilename]);

    return (
        <Paper elevation={4} sx={{m: 2, p: 2}}>
            <Typography variant='h4' component='h1'>Processing Complete</Typography>
            <Typography variant='body2' component='p'>{filename}</Typography>

            {/* Add a link to the csv file on the user's pc */}
            <Button variant="contained" color="secondary" target="_blank" href={`http://localhost:3000/results/${csvFilename}.csv`} sx={{width: 1, my: 1}}>Download Results</Button>
            
            <Button variant="outlined" color="secondary" href="/videos" sx={{width: 1, my: 1}}>Back to Videos</Button>

            {csvData.length > 0 ? (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* Dynamically render table headers */}
                                {Object.keys(csvData[0]).map((key, index) => (
                                    <TableCell key={index}><strong>{key}</strong></TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {csvData.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {Object.values(row).map((value, cellIndex) => (
                                        <TableCell key={cellIndex}>{value}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body2" color='primary' sx={{ mt: 2 }}>CSV Display Feature Coming Soon! {/* Loading CSV results or no data found 🧐 */}</Typography>
                
            )}
        </Paper>
    )

}