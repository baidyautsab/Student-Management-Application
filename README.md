#Student Management Application

This is a react application, where we can manupulate student data. We can add student, we can display student if user give the write information.
    The application start from the landing page, where a from is provided, which is connected to the json server.
```
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
```
After fill the required fields click on the submit button
`<button className='submit' onClick={sendData}>Submit</button>`
It will call a method named sendData.
```
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
```
`e.preventDefault()` this line stoping to send empty data to the server.
If all required field is filled, then it send the data to the server, by default fetch(method: "GET") we have to change and mention some properties like headers, where we mention that we will send data at json format, and in body property we convert the input data into string format as of json can accept only string data.
```
    fetch("http://localhost:3050/Student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info)
    })
```
Then there is an another button named View Student, which is linked with the component called ViewStudent.jsx
```
    <Link to='/viewdetails'>
            <button className='submit'>View Student</button>
    </Link>
```
It will render to the viewstudent page where has a input field, if user give the correct name and phone then student details will be printed. The Display button will call a method named findStudent.
`<button className='submit' onClick={findStudent}>Display</button>`
```
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
```
We have to call the findStudent method after another method named studentData() which fetch the data from server. With out fetch the data we can't get the valuse for the useState variable studentData. For that we have to execute the useEffect() first.
```
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
```
Here the fuction fetchData() fetch the data from the surver and stored the data using useState variable setStudentData();
    After storing the json object we compair that is there any match with json object, if matched found we display the details,
and this will perform in the findStudent().