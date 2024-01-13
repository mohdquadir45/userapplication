// App.js
import React, { useState } from 'react';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePostSubmit = (postMessage) => {
    const newPost = {
      user: username,
      message: postMessage,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  const handleCommentSubmit = (postId, commentMessage) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { user: username, message: commentMessage }] }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleSearch = () => {
    // Simulate searching for posts and comments containing the search term
    const results = posts.filter((post) => post.message.includes(searchTerm));
    setSearchResults(results);
  };

  return (
    <div>
      <label>
        Enter your name:
        <input type="text" value={username} onChange={handleUsernameInput} />
      </label>

      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {searchTerm ? (
        <PostList posts={searchResults} />
      ) : (
        <PostList posts={posts.length > 0 ? posts : null} />
      )}
    </div>
  );
};

export default App;
