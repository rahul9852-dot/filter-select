import React from 'react'

function RenderItem({user, isActive, onClick, handleMouseEnter, renderHighlightedText, renderHighlightedItems}) {

  return (
      <div 
            key={user.id}
            className={`user-card ${isActive ? 'active' : ''}`}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
        >
            <ul key={user.id}>
                <h3 dangerouslySetInnerHTML={{ __html: renderHighlightedText(user.name) }}></h3>
                <p dangerouslySetInnerHTML={{ __html: renderHighlightedText(user.address) }}></p>
                <p dangerouslySetInnerHTML={{ __html: renderHighlightedText(user.pincode) }}></p>
                <li>{renderHighlightedItems()}</li>
              </ul>
        </div>
  )
}

export default RenderItem;
