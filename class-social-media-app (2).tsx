import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, User, Users, Book, Calendar, Settings } from 'lucide-react';

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Ms. Johnson',
      avatar: 'teacher',
      time: '2 hours ago',
      content: 'Don\'t forget to submit your group projects by Friday!',
      likes: 15,
      comments: 5,
      isLiked: false
    },
    {
      id: 2,
      author: 'Alex Smith',
      avatar: 'student1',
      time: '4 hours ago',
      content: 'Just finished my science project on renewable energy. Looking for feedback!',
      likes: 8,
      comments: 7,
      isLiked: false
    },
    {
      id: 3,
      author: 'Jamie Rodriguez',
      avatar: 'student2',
      time: '1 day ago',
      content: 'Study group for math exam this Thursday at the library, 4PM. Who\'s joining?',
      likes: 12,
      comments: 10,
      isLiked: false
    }
  ]);
  
  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      author: 'You',
      avatar: 'you',
      time: 'Just now',
      content: newPostContent,
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };
  
  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };
  
  const getAvatar = (type) => {
    switch(type) {
      case 'teacher': return (
        <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
          <Book size={14} />
        </div>
      );
      case 'student1': return (
        <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
          <User size={14} />
        </div>
      );
      case 'student2': return (
        <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
          <User size={14} />
        </div>
      );
      case 'you': return (
        <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
          <User size={14} />
        </div>
      );
      default: return (
        <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
          <User size={14} />
        </div>
      );
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ClassConnect</h1>
          <div className="flex items-center space-x-2">
            <div className="bg-amber-500 rounded-full w-8 h-8 flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 overflow-auto">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share something with your class..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Post
              </button>
            </div>
          </form>
        </div>
        
        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-2 mb-2">
                {getAvatar(post.avatar)}
                <div>
                  <h3 className="font-semibold">{post.author}</h3>
                  <p className="text-gray-500 text-sm">{post.time}</p>
                </div>
              </div>
              <p className="mb-4">{post.content}</p>
              <div className="flex items-center space-x-4 text-gray-500 border-t pt-2">
                <button 
                  className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t shadow-md">
        <div className="container mx-auto flex justify-around p-3">
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'feed' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('feed')}
          >
            <MessageCircle size={20} />
            <span className="text-xs mt-1">Feed</span>
          </button>
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'calendar' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={20} />
            <span className="text-xs mt-1">Calendar</span>
          </button>
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'groups' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('groups')}
          >
            <Users size={20} />
            <span className="text-xs mt-1">Groups</span>
          </button>
          <button 
            className={`flex flex-col items-center p-2 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;