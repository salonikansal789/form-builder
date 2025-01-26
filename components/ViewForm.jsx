import React, { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { getForm } from "../services/formAPI";
import '../style/formListStyle.css'
import '../style/viewFormStyle.css'

function ViewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchForm() {
      const data = await getForm(id);
      setForm(data);

      // Initialize form data
      const initialData = {};
      data.inputs.forEach((input) => {
        initialData[input.title] = "";
      });
      setFormData(initialData);
    }
    fetchForm();
  }, [id]);


  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    navigate("/");

  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="view-container">
      <h1 className="view-form-title">{form.title}</h1>
      <div className="show-view-from">
        {form.inputs.map((input, index) => (
          <div key={index} className="view-form-field">
            {input.title}
          </div>
        ))}
        </div>
        
        <button type="submit" onClick={handleSubmit} className="btn">
          SUBMIT
        </button>
      
    </div>
  );
}

export default ViewForm;
