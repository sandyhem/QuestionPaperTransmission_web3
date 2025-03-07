import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function TeacherTable({ teachers }) {
    return (
        <div className="table-responsive"> {/* Makes the table responsive */}
            <table className="table table-striped table-bordered"> {/* Adds Bootstrap table styling */}
                <thead>
                    <tr>
                        <th scope="col">#</th> {/* Adds scope for better accessibility */}
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.length > 0 ? (
                        teachers.map((teacher, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th> {/* Adds scope for better accessibility */}
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phone}</td>
                                <td>{teacher.designation}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No teachers added yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TeacherTable;
