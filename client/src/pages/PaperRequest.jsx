import React, { useState, useEffect } from "react";

const CreatePaperRequest = () => {
    const [showTable, setShowTable] = useState(
        () => JSON.parse(localStorage.getItem("showTable")) || false
    );

    const [paperRequests, setPaperRequests] = useState(
        () => JSON.parse(localStorage.getItem("paperRequests")) || []
    );

    const [formData, setFormData] = useState({
        examId: '',
        examName: '',
        subject: ''
    });

    // Save state in localStorage
    useEffect(() => {
        localStorage.setItem("showTable", JSON.stringify(showTable));
    }, [showTable]);

    useEffect(() => {
        localStorage.setItem("paperRequests", JSON.stringify(paperRequests));
    }, [paperRequests]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPaperRequests(prevRequests => [...prevRequests, formData]);
        setFormData({ examId: '', examName: '', subject: '' }); // Reset form
        setShowTable(true); // Show table instead of form
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{showTable ? "View Paper Requests" : "Create Paper Request"}</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowTable(!showTable)}
                >
                    {showTable ? "Create Paper Request" : "View Paper Requests"}
                </button>
            </div>

            {showTable ? (
                <div className="card p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Exam ID</th>
                                <th>Exam Name</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paperRequests.length > 0 ? (
                                paperRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{request.examId}</td>
                                        <td>{request.examName}</td>
                                        <td>{request.subject}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No paper requests available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="card p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="examId" className="form-label">Exam ID</label>
                            <input
                                type="text"
                                id="examId"
                                value={formData.examId}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="examName" className="form-label">Exam Name</label>
                            <input
                                type="text"
                                id="examName"
                                value={formData.examName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Create Request</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePaperRequest;