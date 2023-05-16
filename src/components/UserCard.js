import React, { } from 'react'
import "./global.css";
import RenderItem from './RenderItem';

const UserCard = ({ user, isActive,searchQuery, onClick, onMouseEnter}) => {
    const renderHighlightedText = (text) => {
          if (searchQuery && text.toLowerCase().includes(searchQuery.toLowerCase())) {
              const regex = new RegExp(`(${searchQuery})`, 'gi');
              return text.replace(regex, '<span class="highlight">$1</span>');
            }
          return text;
      };
      const renderHighlightedItems = () => {
          const { items } = user;
          const hasItems = items && items.length > 0;
          const highlightedItems = items.map((item,idx) => {
          const itemFoundInSearch = hasItems && items.some((item) => item.toLowerCase().includes(searchQuery));
          const includesItem = searchQuery  && item.toLowerCase().includes(searchQuery.toLowerCase())
          return includesItem && (
            itemFoundInSearch && 
              <ul key={idx}>
                  <li className={item === searchQuery ? 'highlight' : ''}> {searchQuery} found in item.</li>
              </ul>
          )
        });
      
        return highlightedItems.map((item, index) => (
          <ul key={index} ><li key={index} className={item === searchQuery ? 'highlight' : ''}>{item}</li></ul>
        ));
      };

      const handleMouseEnter = () => {
        onMouseEnter(user.id);
      };
    
      return (
        <RenderItem
          user={user}
          onClick={onClick}
          handleMouseEnter={handleMouseEnter}
          isActive={isActive}
          renderHighlightedItems={renderHighlightedItems}
          renderHighlightedText={renderHighlightedText}
        />
      );
  };
  

export default UserCard;