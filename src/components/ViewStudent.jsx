import React, { useEffect, useState } from 'react';
import "../styles/ViewStudent.css";

function ViewStudent() {
    const [sname, setSname] = useState("");
    const [semail, setSemail] = useState("");
    const [studentDetails, setStudentDetails] = useState(null);
    const [studentData, setStudentData] = useState([]); // Moved useState here

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3050/Student");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudentData(data);
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching data from server. Please try again later.');
            }
        }
        fetchData();
    }, []);

    function findStudent() {
        if (!studentData) {
            alert("Student data is not yet available. Please try again later.");
            return;
        }
    
        const foundStudent = studentData.find(student => {
            return student.name === sname && student.email === semail;
        });
    
        if (foundStudent) {
            setStudentDetails(foundStudent);
        } else {
            alert("No student found with the provided name and email");
        }
    }

    return (
        <div className='view-details'>
            <form action="">
                <input required value={sname} onChange={e => setSname(e.target.value)} type="text" placeholder='Student Name' name="" id="" />
                <br />
                <input required value={semail} onChange={e => setSemail(e.target.value)} type="email" placeholder='Email' name="" id="" />
            </form>
            <button className='submit' onClick={findStudent}>Display</button>
            {studentDetails && (
                <div className="card">
                    <h2>Student Details</h2>
                    <div className="card-info">
                        <p><strong>Name:</strong> {studentDetails.name}</p>
                        <p><strong>Age:</strong> {studentDetails.age}</p>
                        <p><strong>Roll:</strong> {studentDetails.roll}</p>
                        <p><strong>Registration Number:</strong> {studentDetails.regno}</p>
                        <p><strong>Phone:</strong> {studentDetails.phone}</p>
                        <p><strong>Email:</strong> {studentDetails.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewStudent;
