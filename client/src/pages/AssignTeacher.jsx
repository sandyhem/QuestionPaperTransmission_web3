import React, { useState, useEffect } from "react";
import TeacherTable from "./ViewTeacher";

function AddTeacher() {
    const [showTable, setShowTable] = useState(
        () => JSON.parse(localStorage.getItem("showTable")) || false
    );

    const [teachers, setTeachers] = useState(
        () => JSON.parse(localStorage.getItem("teachers")) || []
    );

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        designation: ''
    });

    // Save table visibility state
    useEffect(() => {
        localStorage.setItem("showTable", JSON.stringify(showTable));
    }, [showTable]);

    // Save teacher list when it changes
    useEffect(() => {
        localStorage.setItem("teachers", JSON.stringify(teachers));
    }, [teachers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTeacher = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            designation: formData.designation
        };

        setTeachers([...teachers, newTeacher]);
        setFormData({ name: '', email: '', password: '', phone: '', designation: '' });
        setShowTable(true); // Switch to table view after adding
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{showTable ? "Teacher List" : "Add Teacher"}</h1>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setShowTable(!showTable)}
                >
                    {showTable ? "Add Teacher" : "View Teachers"}
                </button>
            </div>

            {showTable ? (
                <TeacherTable teachers={teachers} />
            ) : (
                <div className="card p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone:</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Designation:</label>
                            <input 
                                type="text" 
                                name="designation" 
                                value={formData.designation} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddTeacher;
