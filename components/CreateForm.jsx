import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createForm } from "../services/formAPI";
import '../style/createFormStyle.css';
import '../style/formListStyle.css';
import { FaPen, FaTrash } from 'react-icons/fa';

function CreateForm() {

  const [selectField,setSelectField]=useState(false);
  const [isTitleField,setIsTitleField]=useState(false);
  const [selectFieldType,setSelectFieldType]=useState('Text');
  const [showInput,setShowInput]=useState(false);
const [currentFieldIndex,setCurrentFieldIndex]=useState(0);
  const [form, setForm] = useState({
    title: "",
    inputs: [],
  });

  const [newInput, setNewInput] = useState({
    type: "",
    title: "",
    placeholder: "",
  });

  const navigate = useNavigate();

  const handleeditInput = (type,index) => {
      if(isTitleField)
      {
        setIsTitleField(false);
      }
      if(!selectField)
      {
        setSelectField(true);
      }
      setCurrentFieldIndex(index);
      setSelectFieldType(type)
  }
  const handleDeleteInput=(index)=>{
   alert(index)
    setForm((prevForm) => {
      const updatedInputs = [...prevForm.inputs];
      updatedInputs.splice(index, 1)
      return { ...prevForm, inputs: updatedInputs };
    });
    
  }
  const handleAddInput = (type) => {
    if (form.inputs.length >= 20) {
      alert("Maximum of 20 inputs allowed!");
      return;
    }

    setForm({
      ...form,
      inputs: [...form.inputs, {   type: type,
        title: "",
        placeholder: '', }],
    });

    setNewInput({
      type: "",
      title: "",
      placeholder: "",
    });
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert("Form title cannot be empty!");
      return;
    }

    if (form.inputs.length === 0) {
      alert("You must add at least one input to the form.");
      return;
    }

    try {
      await createForm(form);
      alert("Form created successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to create form. Please try again.");
    }
  };
  const handleFieldChange = (key, value) => {
    setForm((prevForm) => {
      const updatedInputs = [...prevForm.inputs];
      updatedInputs[currentFieldIndex] = {
        ...updatedInputs[currentFieldIndex],
        [key]: value,
      };
      console.log('djfjf')
      return { ...prevForm, inputs: updatedInputs };
    });
  };
  return (
    
    <div className="main-container">
      <h2>Create New Form</h2>
      <div className="create-form-container">
        <div className="show-form-fields">
          <div className="form-title-edit-field">
            <input type="text" id="title-input-field" class="title-input-field" placeholder="Untitled Title" value={form.title}/>
            <FaPen size={14} color="blue" onClick={()=>{setSelectField(true);
              setIsTitleField(true);
            }}/>
          </div>
          <div className="show-all-fields">
            {
              form.inputs.map((input,index)=>(
        <div key={index} className="input-group">
          <div className="dots-grid">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <input
            type={input.type}
            name={input.title.toLowerCase()}
            value={input.title || ''}
            placeholder='Title'
            onChange={(e) => handleInputChange(e, index)}
          />
            <FaPen size={12} color="blue" onClick={()=>handleeditInput(input.type,index)}/>
            <FaTrash size={12} color="red" onClick={()=>handleDeleteInput(index)}/>
        </div>
              ))
            }
          </div>
          <button className="btn add-input-button" onClick={()=>setShowInput(!showInput)}>{showInput ? `CLOSE ADD INPUT` : `ADD INPUT`}</button>
          {
            showInput&&(
              <div className="input-buttons">
              <button className="input-button" onClick={() => handleAddInput("text")}>TEXT</button>
              <button className="input-button" onClick={() => handleAddInput("number")}>NUMBER</button>
              <button className="input-button" onClick={() => handleAddInput("email")}>EMAIL</button>
              <button className="input-button" onClick={() => handleAddInput("password")}>PASSWORD</button>
              <button className="input-button" onClick={() => handleAddInput("date")}>DATE</button>
            </div>
            )
          }
          <button className="btn">SUBMIT</button>
        </div>

        <div className="edit-form-fields">
          <h4>Form Editor</h4>
          {
            selectField ?(
            <div>
                {
                  isTitleField ?
                  <div class="input-container">
                  <input type="text" id="text-input-field" class="input-field" placeholder="Title" value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })}/>
                  <label for="input-field" class="floating-label">Title</label>
                  </div>                
                  :
                  <div>
                    <h4>{selectFieldType}</h4>
                  <div class="input-container">
                  <input type={selectFieldType} id="input-field" class="input-field" placeholder="Title" value={form.inputs[currentFieldIndex].title}
                  onChange={(e)=>handleFieldChange('title',e.target.value)}/>
                  <label for="input-field" class="floating-label">Title</label>
                  </div> 
                  <input type="text" id="placeholder-field" class="placeholder-field" placeholder="Placeholder" value={form.inputs[currentFieldIndex].placeholder}   onChange={(e)=>handleFieldChange('placeholder',e.target.value,)}/>
                  </div>
                }
            </div>
            ) 
            : 
            <p>Select to see editor</p>
          }
        </div>
      </div>
      <div className="create-form-button">
      <button
          onClick={handleSubmit}
         className="btn">
          CREATE FORM
        </button>
        </div>
    </div>





















    // <div className="create-form-container">
    //   <h2>Create New Form</h2>

    //   {/* Title Section */}
    //   <div>
    //     <input
    //       type="text"
    //       value={form.title}
    //       onChange={(e) => setForm({ ...form, title: e.target.value })}
    //       placeholder="Enter Form Title"
    //       style={{
    //         fontSize: "1.5rem",
    //         marginBottom: "20px",
    //         padding: "10px",
    //         width: "100%",
    //       }}
    //     />
    //   </div>

    //   {/* Drag & Drop Context */}
    //   <DragDropContext onDragEnd={handleDragEnd}>
    //     <Droppable droppableId="inputs">
    //       {(provided) => (
    //         <div {...provided.droppableProps} ref={provided.innerRef}>
    //           {form.inputs.map((input, index) => (
    //             <Draggable key={index} draggableId={`${index}`} index={index}>
    //               {(provided) => (
    //                 <div
    //                   ref={provided.innerRef}
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                   style={{
    //                     ...provided.draggableProps.style,
    //                     margin: "10px 0",
    //                     padding: "10px",
    //                     border: "1px solid #ccc",
    //                     borderRadius: "5px",
    //                     backgroundColor: "#f9f9f9",
    //                   }}
    //                 >
    //                   <label>{input.title}</label>
    //                   <input
    //                     type={input.type}
    //                     placeholder={input.placeholder}
    //                     readOnly
    //                     style={{
    //                       display: "block",
    //                       marginTop: "5px",
    //                       padding: "8px",
    //                       width: "100%",
    //                     }}
    //                   />
    //                   <button
    //                     onClick={() => {
    //                       const newInputs = form.inputs.filter(
    //                         (_, i) => i !== index
    //                       );
    //                       setForm({ ...form, inputs: newInputs });
    //                     }}
    //                     style={{
    //                       marginTop: "10px",
    //                       padding: "5px 10px",
    //                       color: "#fff",
    //                       backgroundColor: "#ff4d4d",
    //                       border: "none",
    //                       borderRadius: "3px",
    //                       cursor: "pointer",
    //                     }}
    //                   >
    //                     Delete
    //                   </button>
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>
    //   </DragDropContext>

    //   {/* Input Addition Section */}
    //   <div
    //     style={{
    //       marginTop: "20px",
    //       padding: "10px",
    //       border: "1px solid #ccc",
    //       borderRadius: "5px",
    //     }}
    //   >
    //     <h4>Add Input</h4>
    //     <select
    //       value={newInput.type}
    //       onChange={(e) => setNewInput({ ...newInput, type: e.target.value })}
    //       style={{
    //         padding: "10px",
    //         marginRight: "10px",
    //         width: "30%",
    //       }}
    //     >
    //       <option value="">Select Input Type</option>
    //       <option value="text">Text</option>
    //       <option value="number">Number</option>
    //       <option value="email">Email</option>
    //       <option value="password">Password</option>
    //       <option value="date">Date</option>
    //     </select>

    //     <input
    //       type="text"
    //       placeholder="Input Title"
    //       value={newInput.title}
    //       onChange={(e) => setNewInput({ ...newInput, title: e.target.value })}
    //       style={{
    //         padding: "10px",
    //         marginRight: "10px",
    //         width: "30%",
    //       }}
    //     />

    //     <input
    //       type="text"
    //       placeholder="Placeholder"
    //       value={newInput.placeholder}
    //       onChange={(e) =>
    //         setNewInput({ ...newInput, placeholder: e.target.value })
    //       }
    //       style={{
    //         padding: "10px",
    //         marginRight: "10px",
    //         width: "30%",
    //       }}
    //     />

    //     <button
    //       onClick={handleAddInput}
    //       style={{
    //         padding: "10px 20px",
    //         color: "#fff",
    //         backgroundColor: "#007bff",
    //         border: "none",
    //         borderRadius: "3px",
    //         cursor: "pointer",
    //       }}
    //     >
    //       Add Input
    //     </button>
    //   </div>

    //   {/* Submit Button */}
    //   <div style={{ marginTop: "20px" }}>
    //     <button
    //       onClick={handleSubmit}
    //       style={{
    //         padding: "10px 20px",
    //         fontSize: "1rem",
    //         color: "#fff",
    //         backgroundColor: "#28a745",
    //         border: "none",
    //         borderRadius: "3px",
    //         cursor: "pointer",
    //       }}
    //     >
    //       Create Form
    //     </button>
    //   </div>
    // </div>
  );
}

export default CreateForm;
