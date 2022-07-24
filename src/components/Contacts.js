import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper }from "@mui/material"
import {Female, Transgender, Male} from "@mui/icons-material"
import Avatar from '@mui/material/Avatar';
import './Contacts.css'
import {contacts as DATA} from '../constants';
import {useEffect, useState} from "react";
import { TextField } from "@mui/material";


function stringToColor(string) {
    let hash = 0;
 let i;

 /* eslint-disable no-bitwise */
 for (i = 0; i < string.length; i += 1) {
   hash = string.charCodeAt(i) + ((hash << 5) - hash);
 }

 let color = '#';

 for (i = 0; i < 3; i += 1) {
   const value = (hash >> (i * 8)) & 0xff;
   color += `00${value.toString(16)}`.slice(-2);
 }
 /* eslint-enable no-bitwise */

 return color;
}

const getIconGender = (gender) => {
   switch (gender) {
    case "male":
     return <Male color="info" />;
    case "female":
     return <Female color="error" />;
    default:
     return <Transgender color="success" />;
   }
}
function Contacts() {
    const [contacts, setContacts] = useState(DATA);
    const [search, setSearch] = useState('');
    const [genderSearchParams, setFenderSearchParams] = useState({male: true, female: true, unknownGender: true});

    useEffect(() => {
        setContacts(filterContacts());
    }, [search, genderSearchParams])

    const filterContacts = () => {
        const filteredByGender = DATA.filter(contact => genderSearchParams[contact.gender]
            || (!(contact.gender in genderSearchParams) && genderSearchParams.unknownGender));
        const searchResult = filteredByGender.filter(contact => `${contact.firstName} ${contact.lastName} ${contact.phone}`.toLowerCase().includes(search));
        return searchResult;
    }

    const handleSearchChange = (event) => setSearch(event.target.value.toLowerCase());
    const handleSearchByGender = (event) => {
        const target = event.target;
        setFenderSearchParams({
            ...genderSearchParams,
            [event.target.name]: target.checked
        });
    }

    return (
        <div className='heard'>
        <h1>HW16 "ReactJS. Хуки</h1>
            <TextField className='input' label="search" variant="standard" fullWidth
                       onChange={handleSearchChange}
                       value={search}/>
                <div className= "gender">
                        <input className='checkbox' name="male" type="checkbox" 
                               onChange={handleSearchByGender}
                               checked={genderSearchParams.male}/>
                        <Male color="info"  sx={{ fontSize: 40 }} />
                 
                   
                        <input className='checkbox' name="female" type="checkbox"
                               onChange={handleSearchByGender}
                               checked={genderSearchParams.female}/>
                        <Female color="error" sx={{ fontSize: 40 }}  />
                   
                        <input className='checkbox' name="unknownGender" type="checkbox"
                               onChange={handleSearchByGender}
                               checked={genderSearchParams.unknownGender}/>
                        <Transgender color="success" sx={{ fontSize: 35 }} />
                    </div>
                
                 
      <div className='table'>  
    <TableContainer  component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align='center'>Avatar</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align='center'>Phone</TableCell>
                    <TableCell align='center'>Gender</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    contacts.map((row) => (
                        <TableRow
                        key = {row.id}
                        sx = {{'&: last-child td, &: last-child th':{ border : 0}}}>
                            <TableCell >
                            <Avatar className='avatar' sx= { {"bgcolor": stringToColor(row.firstName)}}>{row.firstName[0].toUpperCase()}</Avatar>
                            </TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell align='center'>{row.phone} </TableCell>
                            <TableCell align='center'>{getIconGender(row.gender)} </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </TableContainer>
        </div>  
        </div>
        

  
    )
}

export default Contacts;