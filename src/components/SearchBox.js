import React, { useState,useEffect,useRef} from 'react'
import UserCard from './UserCard';
import "./global.css";
function SearchBox({users}) {

    console.log(users);

        const [searchQuery, setSearchQuery] = useState('');
        const [matchingUsers, setMatchingUsers] = useState([]);
        const [activeIndex, setActiveIndex] = useState(-1);
        const cardContainerRef = useRef(null);
      
        useEffect(() => {
          // Function to perform search
          const performSearch = () => {
            const query = searchQuery.toLowerCase();
            const matching = users.filter(
              (user) =>
                user.id.toString().includes(query) ||
                user.name.toLowerCase().includes(query) ||
                user.address.toLowerCase().includes(query) ||
                user.pincode.includes(query) ||
                user.items.some((item) => item.toLowerCase().includes(query))
            );
            setMatchingUsers(matching);
            setActiveIndex(-1);
          };
      
          performSearch();
        }, [searchQuery, users]);
      
        useEffect(() => {
          // Scroll the active card into view
          if (activeIndex >= 0 && cardContainerRef.current) {
            const activeCard = cardContainerRef.current.querySelector('.active');
            if (activeCard) {
              activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }, [activeIndex]);
      
        const handleInputChange = (event) => {
          setSearchQuery(event.target.value);
        };
      
        const handleCardClick = (index) => {
          setActiveIndex(index);
        };
      
        const handleCardMouseEnter = (index) => {
          if (activeIndex === -1) {
            setActiveIndex(index);
          }
        };
      
        const handleKeyDown = (event) => {
          const { keyCode } = event;
          if (keyCode === 38 && activeIndex > 0) {
            // Up arrow key
            setActiveIndex(activeIndex - 1);
          } else if (keyCode === 40 && activeIndex < matchingUsers.length - 1) {
            // Down arrow key
            setActiveIndex(activeIndex + 1);
          }
        };

        return(
            <div className='container'>
            <input 
                className='search-input' 
                type="text" 
                value={searchQuery} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown} 
                placeholder='Search users by ID, address, name, pin...'
            />
            {searchQuery && (
                <div className="card-container" ref={cardContainerRef}>
                {matchingUsers.length === 0 ? (
                    <div className="user-card empty">No results found</div>
                ) : (
                    matchingUsers.map((user, index) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isActive={index === activeIndex}
                        onClick={() => handleCardClick(index)}
                        onMouseEnter={() => handleCardMouseEnter(index)}
                        searchQuery={searchQuery}
                    />
                    ))
                )}
                </div>
            )}
          </div>
        )}
export default SearchBox;