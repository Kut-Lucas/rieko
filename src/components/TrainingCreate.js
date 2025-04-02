import React, { useState } from "react";
import axios from "axios";
import "./TrainingCreate.css";
import { FaTrash } from "react-icons/fa";

const TrainingCreate = () => {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState(null);
    const [overview, setOverview] = useState([]);
    const [keyObjectives, setKeyObjectives] = useState([]);
    const [modules, setModules] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [targetAudience, setTargetAudience] = useState([]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const addToList = (list, setList) => {
        setList([...list, ""]);
    };

    const updateList = (index, value, list, setList) => {
        const newList = [...list];
        newList[index] = value;
        setList(newList);
    };

    const removeFromList = (index, list, setList) => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    };

    const addModule = () => {
        setModules([...modules, { name: "", items: [] }]);
    };

    const updateModuleName = (index, value) => {
        const newModules = [...modules];
        newModules[index].name = value;
        setModules(newModules);
    };

    const addModuleItem = (moduleIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].items.push("");
        setModules(newModules);
    };

    const updateModuleItem = (moduleIndex, itemIndex, value) => {
        const newModules = [...modules];
        newModules[moduleIndex].items[itemIndex] = value;
        setModules(newModules);
    };

    const removeModuleItem = (moduleIndex, itemIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].items.splice(itemIndex, 1);
        setModules(newModules);
    };

    const removeModule = (index) => {
        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("location", location);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("image", image);
        formData.append("overview", JSON.stringify(overview));
        formData.append("key_objectives", JSON.stringify(keyObjectives));
        formData.append("modules", JSON.stringify(modules));
        formData.append("benefits", JSON.stringify(benefits));
        formData.append("target_audience", JSON.stringify(targetAudience));

        try {
            const response = await axios.post("http://localhost:5000/api/trainings", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="training-form">
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            {/* Training Overview Section */}
            <h3>Training Overview</h3>
            {overview.map((item, index) => (
                <div key={index} className="list-item">
                    <input type="text" value={item} onChange={(e) => updateList(index, e.target.value, overview, setOverview)} />
                    <button type="button" className="remove-btn" onClick={() => removeFromList(index, overview, setOverview)}><FaTrash /></button>
                </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addToList(overview, setOverview)}>Add Overview Item</button>

            {/* Key Objectives Section */}
            <h3>Key Objectives</h3>
            {keyObjectives.map((item, index) => (
                <div key={index} className="list-item">
                    <input type="text" value={item} onChange={(e) => updateList(index, e.target.value, keyObjectives, setKeyObjectives)} />
                    <button type="button" className="remove-btn" onClick={() => removeFromList(index, keyObjectives, setKeyObjectives)}><FaTrash /></button>
                </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addToList(keyObjectives, setKeyObjectives)}>Add Key Objective</button>

            {/* Modules Section */}
            <h3>Modules</h3>
            {modules.map((module, moduleIndex) => (
                <div key={moduleIndex}>
                    <input type="text" placeholder="Module Name" value={module.name} onChange={(e) => updateModuleName(moduleIndex, e.target.value)} />
                    <button type="button" className="remove-btn" onClick={() => removeModule(moduleIndex)}><FaTrash /></button>
                    {module.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                            <input type="text" value={item} onChange={(e) => updateModuleItem(moduleIndex, itemIndex, e.target.value)} />
                            <button type="button" className="remove-btn" onClick={() => removeModuleItem(moduleIndex, itemIndex)}><FaTrash /></button>
 </div>
                    ))}
                    <button type="button" onClick={() => addModuleItem(moduleIndex)}>Add Module Item</button>
                </div>
            ))}
            <button type="button" onClick={addModule}>Add Module</button>

            {/* What You'll Gain Section */}
            <h3>What You'll Gain</h3>
            {benefits.map((item, index) => (
                <div key={index} className="list-item">
                    <input type="text" value={item} onChange={(e) => updateList(index, e.target.value, benefits, setBenefits)} />
                    <button type="button" className="remove-btn" onClick={() => removeFromList(index, benefits, setBenefits)}><FaTrash /></button>
                </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addToList(benefits, setBenefits)}>Add Benefit</button>

            {/* Who Should Attend Section */}
            <h3>Who Should Attend</h3>
            {targetAudience.map((item, index) => (
                <div key={index} className="list-item">
                    <input type="text" value={item} onChange={(e) => updateList(index, e.target.value, targetAudience, setTargetAudience)} />
                    <button type="button" className="remove-btn" onClick={() => removeFromList(index, targetAudience, setTargetAudience)}><FaTrash /></button>
                </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addToList(targetAudience, setTargetAudience)}>Add Target Audience</button>

            <button type="submit">Create Training</button>
        </form>
    );
};

export default TrainingCreate;