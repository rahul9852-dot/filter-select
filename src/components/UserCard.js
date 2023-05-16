import React, { } from 'react'
import "./global.css";
const UserCard = ({ user, isActive,searchQuery, onClick, onMouseEnter }) => {
    const renderHighlightedText = (text) => {
         if (searchQuery && text.toLowerCase().includes(searchQuery.toLowerCase())) {
      const regex = new RegExp(`(${searchQuery})`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    }
    return text;
      };
    
      const renderHighlightedItems = () => {
        const { items } = user;
        const highlightedItems = items.map((item) => {
            console.log(searchQuery, item)
          if (searchQuery  && item.toLowerCase().includes(searchQuery.toLowerCase())) {
            return  searchQuery ? <li className={item === searchQuery ? 'highlight' : ''}>{`${searchQuery}`} found in item.</li> : `${item}`;
          }
          return item;
        });
      
        return highlightedItems.map((item, index) => (
          <li key={index} className={item === searchQuery ? 'highlight' : ''}>{item}</li>
        ));
      };

      const handleMouseEnter = () => {
        onMouseEnter(user.id);
      };
    
      return (
        <div 
            className={`user-card ${isActive ? 'active' : ''}`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
        >
          <h3 dangerouslySetInnerHTML={{ __html: renderHighlightedText(user.name) }}></h3>
          <p dangerouslySetInnerHTML={{ __html: renderHighlightedText(user.address) }}></p>
          <p dangerouslySetInnerHTML={{ __html: renderHighlightedText(user.pincode) }}></p>
          <ul>{renderHighlightedItems()}</ul>
        </div>
      );
  };
  

export default UserCard