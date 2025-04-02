import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEditor.css';

const AdminEditor = () => {
  // State for all editable content
  const [content, setContent] = useState({
    welcomeMessage: 'Wisdom for Transformative Solutions',
    aboutSections: [
      {
        title: 'Who We Are',
        content: 'We are a team of professionals dedicated to providing the best services.'
      },
      {
        title: 'What We Do',
        content: 'We specialize in various fields to cater to diverse client needs.',
        listItems: ['Consulting', 'Development', 'Marketing']
      },
      {
        title: 'Why Work With Us',
        content: 'We bring experience, innovation, and dedication to our clients.',
        listItems: ['Proven track record', 'Expert team', 'Reliable support']
      }
    ],
    approachTitle: 'Our Approach',
    approachContent: 'We tackle problems with a strategic and client-centered approach.',
    images: {
      mainImage: '/images/photo1.png'
    }
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch content from database on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content');
        setContent(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Start editing a field
  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  // Save changes to a field
  const saveChanges = async () => {
    try {
      const updatedContent = { ...content };
      
      // Update the appropriate field based on editingField
      if (editingField.startsWith('welcome')) {
        updatedContent.welcomeMessage = tempValue;
      } else if (editingField.startsWith('aboutTitle')) {
        const index = parseInt(editingField.split('-')[1]);
        updatedContent.aboutSections[index].title = tempValue;
      } else if (editingField.startsWith('aboutContent')) {
        const index = parseInt(editingField.split('-')[1]);
        updatedContent.aboutSections[index].content = tempValue;
      } else if (editingField.startsWith('approachTitle')) {
        updatedContent.approachTitle = tempValue;
      } else if (editingField.startsWith('approachContent')) {
        updatedContent.approachContent = tempValue;
      }

      // Save to database
      await axios.put('/api/content', updatedContent);
      setContent(updatedContent);
      setEditingField(null);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  // Handle list item changes
  const handleListItemChange = (sectionIndex, itemIndex, newValue) => {
    const updatedContent = { ...content };
    updatedContent.aboutSections[sectionIndex].listItems[itemIndex] = newValue;
    setContent(updatedContent);
  };

  // Add new list item
  const addListItem = (sectionIndex) => {
    const updatedContent = { ...content };
    updatedContent.aboutSections[sectionIndex].listItems.push('');
    setContent(updatedContent);
  };

  // Remove list item
  const removeListItem = (sectionIndex, itemIndex) => {
    const updatedContent = { ...content };
    updatedContent.aboutSections[sectionIndex].listItems.splice(itemIndex, 1);
    setContent(updatedContent);
  };

  // Handle image upload
  const handleImageUpload = async (e, imageField) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('field', imageField);

    try {
      const response = await axios.post('http://localhost:5000/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setContent(prev => ({
        ...prev,
        images: {
          ...prev.images,
          [imageField]: response.data.imageUrl
        }
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (isLoading) return <div className="loading">Loading content...</div>;

  return (
    <div className="admin-editor">
      <h1>Site Content Editor</h1>
      
      {/* Welcome Section */}
      <div className="content-section">
        <h2>Welcome Message</h2>
        {editingField === 'welcomeMessage' ? (
          <div className="edit-field">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button onClick={saveChanges}>Save</button>
            <button onClick={() => setEditingField(null)}>Cancel</button>
          </div>
        ) : (
          <p onClick={() => startEditing('welcomeMessage', content.welcomeMessage)}>
            {content.welcomeMessage}
            <span className="edit-icon">✏️</span>
          </p>
        )}
      </div>

      {/* Main Image */}
      <div className="content-section">
        <h2>Main Image</h2>
        <img 
          src={content.images.mainImage} 
          alt="Main" 
          className="content-image"
        />
        <input
          type="file"
          id="mainImageUpload"
          onChange={(e) => handleImageUpload(e, 'mainImage')}
          accept="image/*"
        />
        <label htmlFor="mainImageUpload" className="upload-button">
          Change Image
        </label>
      </div>

      {/* About Sections */}
      <div className="content-section">
        <h2>About Us Sections</h2>
        {content.aboutSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="about-section">
            {/* Section Title */}
            <h3>
              {editingField === `aboutTitle-${sectionIndex}` ? (
                <div className="edit-field">
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button onClick={saveChanges}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </div>
              ) : (
                <span onClick={() => startEditing(`aboutTitle-${sectionIndex}`, section.title)}>
                  {section.title}
                  <span className="edit-icon">✏️</span>
                </span>
              )}
            </h3>

            {/* Section Content */}
            <p>
              {editingField === `aboutContent-${sectionIndex}` ? (
                <div className="edit-field">
                  <textarea
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                  <button onClick={saveChanges}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </div>
              ) : (
                <span onClick={() => startEditing(`aboutContent-${sectionIndex}`, section.content)}>
                  {section.content}
                  <span className="edit-icon">✏️</span>
                </span>
              )}
            </p>

            {/* List Items (if exists) */}
            {section.listItems && (
              <div className="list-items">
                <h4>List Items:</h4>
                <ul>
                  {section.listItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleListItemChange(sectionIndex, itemIndex, e.target.value)}
                      />
                      <button 
                        onClick={() => removeListItem(sectionIndex, itemIndex)}
                        className="remove-button"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => addListItem(sectionIndex)}
                  className="add-button"
                >
                  + Add Item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Approach Section */}
      <div className="content-section">
        <h2>Approach Section</h2>
        
        {/* Approach Title */}
        <h3>
          {editingField === 'approachTitle' ? (
            <div className="edit-field">
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
              <button onClick={saveChanges}>Save</button>
              <button onClick={() => setEditingField(null)}>Cancel</button>
            </div>
          ) : (
            <span onClick={() => startEditing('approachTitle', content.approachTitle)}>
              {content.approachTitle}
              <span className="edit-icon">✏️</span>
            </span>
          )}
        </h3>

        {/* Approach Content */}
        <p>
          {editingField === 'approachContent' ? (
            <div className="edit-field">
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
              />
              <button onClick={saveChanges}>Save</button>
              <button onClick={() => setEditingField(null)}>Cancel</button>
            </div>
          ) : (
            <span onClick={() => startEditing('approachContent', content.approachContent)}>
              {content.approachContent}
              <span className="edit-icon">✏️</span>
            </span>
          )}
        </p>
      </div>

      {/* Save All Button */}
      <button 
        onClick={async () => {
          try {
            await axios.put('/api/content', content);
            alert('All changes saved successfully!');
          } catch (error) {
            console.error('Error saving all content:', error);
            alert('Error saving changes. Please try again.');
          }
        }}
        className="save-all-button"
      >
        Save All Changes
      </button>
    </div>
  );
};

export default AdminEditor;

