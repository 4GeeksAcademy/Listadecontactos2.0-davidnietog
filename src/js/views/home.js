import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [editingContactId, setEditingContactId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", phone: "", address: "", email: "" });

    useEffect(() => {
        actions.getContact(); 
    }, [actions]);

    const startEditing = (contact) => {
        setEditingContactId(contact.id);
        setEditFormData(contact);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const submitEditForm = (e) => {
        e.preventDefault();
        actions.modifyContact(editingContactId, editFormData);
        setEditingContactId(null); 
    };

    if (!store.contacts) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container">
            <h2>Lista de contactos</h2>
            <ul className="list-group">
                {store.contacts.length > 0 ? (
                    store.contacts.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="rounded-circle" src="https://static.wikia.nocookie.net/gatopedia/images/0/09/Grumpy_cat.jpg/revision/latest/thumbnail/width/360/height/360?cb=20230627001107&path-prefix=es" alt="contact" />
                                <div>
                                    {editingContactId === item.id ? (
                                        <form onSubmit={submitEditForm} className="d-flex flex-column">
                                            <input className="mb-3" style={{ width: "75%" }} type="text"  placeholder="Name" name="name" value={editFormData.name} onChange={handleEditChange} required />
                                            <input className="mb-3" style={{ width: "75%" }} type="text"  placeholder="Phone" name="phone" value={editFormData.phone} onChange={handleEditChange} required />
                                            <input className="mb-3" style={{ width: "75%" }}type="text" name="address"  placeholder="Address" value={editFormData.address} onChange={handleEditChange} required />
                                            <input className="mb-3" style={{ width: "75%" }}type="email"  placeholder="Email" name="email" value={editFormData.email} onChange={handleEditChange} required />
                                            <button type="submit" className="btn btn-success">Save</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingContactId(null)}>Cancel</button>
                                        </form>
                                    ) : (
                                        <div>
                                            <strong>Name:</strong> {item.name} <br />
                                            <strong>Number:</strong> {item.phone} <br />
                                            <strong>Address:</strong> {item.address} <br/>
                                            <strong>Email</strong> {item.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {editingContactId !== item.id && (
                                <div>
                                    <button className="btn btn-warning" onClick={() => startEditing(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => actions.deleteContact(item.id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <div>No contacts available</div> 
                )}
            </ul>
        </div>
    );
};