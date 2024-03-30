import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

function LandingPage() {
    let [name, setName] = useState("");
    let [age, setAge] = useState("");
    let [roll, setRoll] = useState("");
    let [regno, setRegno] = useState("");
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState("");

    let info = {name, age, roll, regno, phone, email}

    function sendData(e) {
        e.preventDefault();
    
        // Check if any required fields are empty
        if (!name || !age || !roll || !regno || !phone || !email) {
            alert("Please fill in all required fields");
            return;
        }
    
        // If all required fields are filled, proceed with sending the data
        fetch("http://localhost:3050/Student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info)
        })
        .then(res => {
            if (res.ok) {
                alert("Student added successfully!");
                setName("");
                setAge("");
                setRoll("");
                setRegno("");
                setPhone("");
                setEmail("");
            } else {
                throw new Error("Network response was not ok");
            }
        })
        .catch(err => {
            alert("Error: Unable to add student. Please try again.");
            console.error('Error:', err);
        });
    }
    

  return (
    <div className='landingpage'>
        <h1>Student Management Application</h1>
        <form action="">
             <fieldset>
                <legend>Student Details</legend>
                <label htmlFor="">Name: </label>
                <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder='name' name="" id="" /> 
                <label htmlFor="">Age: </label>
                <input required value={age} onChange={e => setAge(e.target.value)} type="text" placeholder='age' name="" id="" />
                <label htmlFor="">Roll: </label>
                <input required value={roll} onChange={e => setRoll(e.target.value)} type="text" placeholder='roll' name="" id="" /> 
                <label htmlFor="">Registration Number: </label>
                <input required value={regno} onChange={e => setRegno(e.target.value)} type="text" placeholder='registration' name="" id="" />
                <label htmlFor="">Phone: </label>
                <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder='phone' type="tel" pattern='[0-9]{8}' name="" id="" /> 
                <label htmlFor="">Email: </label>
                <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='email' name="" id="" /> 
             </fieldset>
        </form>
        <button className='submit' onClick={sendData}>Submit</button>
        <Link to='/viewdetails'>
            <button className='submit'>View Student</button>
        </Link>
    </div>
  )
}

export default LandingPage