// ExhibitorForm.js - Updated with contact info fields

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavbarComponent from "./Navbar";
const ExhibitorForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        description: "",
        boothPreferences: "",
        contactInfo: { phone: "", address: "" },  // Added contactInfo field
    });
    const [logo, setLogo] = useState(null); // For handling logo upload

    // Function to submit the exhibitor form data
    const submitExhibitorForm = async (formData, logo) => {
        const form = new FormData();
        for (const key in formData) {
            if (key === "contactInfo") {
                // Handle nested fields for contactInfo
                for (const contactKey in formData.contactInfo) {
                    form.append(`contactInfo[${contactKey}]`, formData.contactInfo[contactKey]);
                }
            } else {
                form.append(key, formData[key]);
            }
        }
        if (logo) {
            form.append('logo', logo); // Append logo file if exists
        }

        try {
            const response = await axios.post("http://localhost:5000/api/exhibitors/register", form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error("Error submitting exhibitor form:", error);
            return { success: false, message: "Error submitting form" };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await submitExhibitorForm(formData, logo);

        if (response.success) {
            navigate('/exhibitors');
        } else {
            alert(response.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('contactInfo')) {
            const contactKey = name.split('[')[1].split(']')[0]; // Extract the contact field key (phone or address)
            setFormData(prevState => ({
                ...prevState,
                contactInfo: {
                    ...prevState.contactInfo,
                    [contactKey]: value,
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    return (
        <><NavbarComponent /><form onSubmit={handleSubmit}>
            <div>
                <label>Company Name:</label>
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange} />
            </div>
            <div>
                <label>Booth Preferences:</label>
                <input
                    type="text"
                    name="boothPreferences"
                    value={formData.boothPreferences}
                    onChange={handleChange} />
            </div>
            <div>
                <label>Contact Phone:</label>
                <input
                    type="text"
                    name="contactInfo[phone]"
                    value={formData.contactInfo.phone}
                    onChange={handleChange} />
            </div>
            <div>
                <label>Contact Address:</label>
                <input
                    type="text"
                    name="contactInfo[address]"
                    value={formData.contactInfo.address}
                    onChange={handleChange} />
            </div>
            <div>
                <label>Logo:</label>
                <input
                    type="file"
                    name="logo"
                    onChange={handleLogoChange} />
            </div>
            <button type="submit">Submit</button>
        </form></>
    );
};

export default ExhibitorForm;
