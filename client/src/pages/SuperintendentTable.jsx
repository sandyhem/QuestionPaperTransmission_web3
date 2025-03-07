import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function SuperintendentTable({ superintendents }) {
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
                    {superintendents.length > 0 ? (
                        superintendents.map((superintendent, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th> {/* Adds scope for better accessibility */}
                                <td>{superintendent.name}</td>
                                <td>{superintendent.email}</td>
                                <td>{superintendent.phone}</td>
                                <td>{superintendent.designation}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No superintendents added yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SuperintendentTable;