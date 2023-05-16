import React, { useState,useEffect,useRef} from 'react'
import UserCard from './UserCard';
import "./global.css";


function SearchBox({users}) {
        const [searchQuery, setSearchQuery] = useState('');
        const [matchingUsers, setMatchingUsers] = useState([]);
        const [activeIndex, setActiveIndex] = useState(-1);
        const [isMousePreferred, setIsMousePreferred] = useState(false);
        const [isKeywordPreferred, setIsKeywordPreferred] = useState(true);
        const inputRef = useRef(null);
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
          const { value } = event.target;
          setSearchQuery(value.toLowerCase());
          setIsKeywordPreferred(true);
        };
      
        const handleCardClick = (index) => {
          setActiveIndex(index);
          setIsKeywordPreferred(false);

        };
      
        const handleCardMouseEnter = (index) => {
            setActiveIndex(index);
            setIsMousePreferred(true);
            setIsKeywordPreferred(false);
        };
      
        const handleCardMouseLeave = () => {
          if (!isKeywordPreferred) {
            setIsMousePreferred(false);
          }
        };

        const handleKeyDown = (event) => {
          // const { keyCode } = event;
          // if (keyCode === 38 && activeIndex > 0) {
          //   // Up arrow key
          //   setActiveIndex(activeIndex - 1);
          // } else if (keyCode === 40 && activeIndex < matchingUsers.length - 1) {
          //   // Down arrow key
          //   setActiveIndex(activeIndex + 1);
          // }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((prevActiveIndex) => (prevActiveIndex !== null ? Math.max(prevActiveIndex - 1, 0) : null));
            setIsMousePreferred(false);
            setIsKeywordPreferred(true);
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((prevActiveIndex) =>
              prevActiveIndex !== null ? Math.min(prevActiveIndex + 1, matchingUsers.length - 1) : 0
            );
            setIsMousePreferred(false);
            setIsKeywordPreferred(true);
          }
        };

        useEffect(() => {
          inputRef.current.focus();
        }, []);

        // console.log(isKeywordPreferred, isMousePreferred)
        return(
        
            <div className='container'>
              <input 
                  className='search-input' 
                  type="text" 
                  value={searchQuery} 
                  onChange={handleInputChange} 
                  onKeyDown={handleKeyDown} 
                  placeholder='Search users by ID, address, name, pin...'
                  ref={inputRef}
              />
              {searchQuery && (
                  <div className="card-container" ref={cardContainerRef}>
                  {matchingUsers.length === 0 ? (
                      <div className="user-card empty">No results found</div>
                  ) : (
                      matchingUsers.map((user, index) => (
                      <UserCard
                          key={index}
                          user={user}
                          isActive={isKeywordPreferred ? index === activeIndex : isMousePreferred && index === activeIndex}
                          onClick={() => handleCardClick(index)}
                          onMouseLeave={handleCardMouseLeave}
                          onMouseEnter={() => handleCardMouseEnter(index)}
                          searchQuery={searchQuery}
                      />
                      ))
                  )}
                  </div>
            )}
          </div>
        )};

export default SearchBox;