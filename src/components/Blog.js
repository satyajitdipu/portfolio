// Blog component - Personal blog with articles and insights
import React, { useState, useMemo } from 'react';
import './Blog.css';
import { FaCalendarAlt, FaUser, FaTags, FaSearch, FaFilter, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = useMemo(() => [
    {
      id: 1,
      title: 'The Evolution of Web Development: From Static Sites to Modern Frameworks',
      excerpt: 'Exploring the journey of web development technologies and how they have shaped the digital landscape over the past decades.',
      content: `
        <h2>The Dawn of the Web</h2>
        <p>In the early days of the internet, websites were simple HTML pages with basic styling. The first websites were created using plain HTML, with no dynamic content or interactivity. Developers had to manually write every line of code, and updates required editing static files.</p>

        <h2>The Rise of Server-Side Rendering</h2>
        <p>As the web grew, the need for dynamic content became apparent. Server-side languages like PHP, ASP, and JSP emerged, allowing developers to generate HTML on the server based on user requests. This marked the beginning of dynamic web applications.</p>

        <h2>JavaScript Revolution</h2>
        <p>The introduction of AJAX in the early 2000s changed everything. Suddenly, web pages could update content without full page reloads. JavaScript frameworks like jQuery made DOM manipulation easier, paving the way for richer user experiences.</p>

        <h2>The Framework Era</h2>
        <p>Modern frameworks like React, Vue, and Angular have revolutionized web development. These frameworks provide component-based architecture, state management, and efficient rendering. They allow developers to build complex applications with maintainable code.</p>

        <h2>Looking Ahead</h2>
        <p>The future of web development looks promising with technologies like WebAssembly, progressive web apps, and serverless architectures. The focus is shifting towards performance, accessibility, and user experience.</p>
      `,
      author: 'Satyajit Dipu',
      date: '2024-01-15',
      tags: ['Web Development', 'JavaScript', 'Frameworks'],
      readTime: '5 min read',
      image: 'https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Web+Dev+Evolution'
    },
    {
      id: 2,
      title: 'Machine Learning in Agriculture: Revolutionizing Crop Management',
      excerpt: 'How artificial intelligence and machine learning are transforming traditional farming practices and improving crop yields.',
      content: `
        <h2>The Agricultural Challenge</h2>
        <p>Agriculture faces numerous challenges including climate change, population growth, and resource scarcity. Traditional farming methods are often inefficient and environmentally unsustainable.</p>

        <h2>AI-Powered Solutions</h2>
        <p>Machine learning algorithms can analyze vast amounts of data from sensors, satellites, and historical records to provide insights that were previously impossible to obtain. Computer vision techniques can identify crop diseases, pests, and nutrient deficiencies with high accuracy.</p>

        <h2>Precision Farming</h2>
        <p>Precision agriculture uses ML to optimize every aspect of farming. From soil analysis to irrigation scheduling, AI helps farmers make data-driven decisions that maximize yield while minimizing resource use.</p>

        <h2>Case Studies</h2>
        <p>Companies like John Deere and Climate FieldView are already using ML for crop monitoring and yield prediction. Small farmers can benefit from affordable smartphone apps that use AI for disease detection.</p>

        <h2>Future Implications</h2>
        <p>As ML technology becomes more accessible, we can expect to see widespread adoption in agriculture. This will lead to more sustainable farming practices and help feed a growing global population.</p>
      `,
      author: 'Satyajit Dipu',
      date: '2024-01-10',
      tags: ['Machine Learning', 'Agriculture', 'AI'],
      readTime: '6 min read',
      image: 'https://via.placeholder.com/600x300/059669/FFFFFF?text=ML+in+Agriculture'
    },
    {
      id: 3,
      title: 'Building Scalable Backend Systems with Node.js and Express',
      excerpt: 'Best practices for designing and implementing robust backend architectures that can handle millions of requests.',
      content: `
        <h2>Why Node.js?</h2>
        <p>Node.js has become the go-to choice for backend development due to its non-blocking I/O model and JavaScript ecosystem. It allows developers to use the same language on both frontend and backend.</p>

        <h2>Express.js Fundamentals</h2>
        <p>Express provides a minimal and flexible framework for building web applications. Its middleware system allows for easy extension and customization of request handling.</p>

        <h2>Database Integration</h2>
        <p>Choosing the right database is crucial for scalability. Options include SQL databases like PostgreSQL for complex queries and NoSQL databases like MongoDB for flexible schemas.</p>

        <h2>Authentication and Security</h2>
        <p>Implementing secure authentication is essential. JWT tokens, OAuth, and proper password hashing are fundamental to protecting user data and API endpoints.</p>

        <h2>Performance Optimization</h2>
        <p>Caching, load balancing, and database optimization are key to handling high traffic. Monitoring tools help identify bottlenecks and ensure system reliability.</p>

        <h2>Microservices Architecture</h2>
        <p>For large applications, breaking down the system into smaller, independent services can improve maintainability and scalability. Docker and Kubernetes help manage these distributed systems.</p>
      `,
      author: 'Satyajit Dipu',
      date: '2024-01-05',
      tags: ['Node.js', 'Backend', 'Scalability'],
      readTime: '7 min read',
      image: 'https://via.placeholder.com/600x300/DC2626/FFFFFF?text=Node.js+Backend'
    },
    {
      id: 4,
      title: 'The Future of Human-Computer Interaction: Voice and Gesture Interfaces',
      excerpt: 'Exploring emerging technologies that are changing how we interact with computers and devices.',
      content: `
        <h2>Beyond the Mouse and Keyboard</h2>
        <p>Traditional input methods are being supplemented and sometimes replaced by more natural interfaces. Voice commands and gesture recognition are becoming mainstream.</p>

        <h2>Voice Interfaces</h2>
        <p>Voice assistants like Siri, Alexa, and Google Assistant have made voice interaction commonplace. Natural language processing and machine learning enable more conversational interactions.</p>

        <h2>Gesture Recognition</h2>
        <p>Computer vision and depth sensing technologies allow devices to understand hand gestures and body movements. This opens up new possibilities for gaming, design, and accessibility.</p>

        <h2>Brain-Computer Interfaces</h2>
        <p>Emerging BCIs promise direct brain-to-computer communication. While still in early stages, this technology could revolutionize accessibility and human augmentation.</p>

        <h2>Challenges and Considerations</h2>
        <p>Privacy concerns, accuracy, and user acceptance are major challenges. Designing intuitive interfaces that work across different cultures and abilities is crucial.</p>

        <h2>Integration with Existing Systems</h2>
        <p>Rather than replacing traditional interfaces, new interaction methods are often complementary. Multimodal interfaces that combine voice, touch, and gesture provide the best user experience.</p>
      `,
      author: 'Satyajit Dipu',
      date: '2023-12-28',
      tags: ['HCI', 'Voice', 'Gesture', 'Future Tech'],
      readTime: '6 min read',
      image: 'https://via.placeholder.com/600x300/7C3AED/FFFFFF?text=HCI+Future'
    },
    {
      id: 5,
      title: 'Cybersecurity in the Age of IoT: Protecting Connected Devices',
      excerpt: 'Understanding the security challenges posed by the Internet of Things and strategies for mitigation.',
      content: `
        <h2>The IoT Explosion</h2>
        <p>The number of connected devices is growing exponentially. From smart homes to industrial sensors, IoT devices are everywhere, but many lack basic security features.</p>

        <h2>Unique Security Challenges</h2>
        <p>IoT devices often have limited computing resources, making traditional security measures difficult to implement. Many devices have default passwords and lack update mechanisms.</p>

        <h2>Common Vulnerabilities</h2>
        <p>Weak authentication, unencrypted communications, and lack of access controls are prevalent. Botnets like Mirai demonstrate the dangers of unsecured IoT devices.</p>

        <h2>Best Practices</h2>
        <p>Implementing strong encryption, regular firmware updates, and network segmentation are essential. Manufacturers should follow security-by-design principles.</p>

        <h2>Regulatory Landscape</h2>
        <p>Governments are beginning to regulate IoT security. Standards like ETSI TS 103 645 provide guidelines for secure IoT device development.</p>

        <h2>Future Outlook</h2>
        <p>As IoT becomes more critical to infrastructure, security will become paramount. Blockchain and AI-based security solutions may play important roles in securing IoT ecosystems.</p>
      `,
      author: 'Satyajit Dipu',
      date: '2023-12-20',
      tags: ['Cybersecurity', 'IoT', 'Security'],
      readTime: '5 min read',
      image: 'https://via.placeholder.com/600x300/EF4444/FFFFFF?text=IoT+Security'
    },
    {
      id: 6,
      title: 'Data Visualization: Telling Stories with Charts and Graphs',
      excerpt: 'The art and science of presenting complex data in an understandable and engaging way.',
      content: `
        <h2>Why Data Visualization Matters</h2>
        <p>In our data-rich world, the ability to communicate insights effectively is crucial. Good visualizations can make complex information accessible to diverse audiences.</p>

        <h2>Principles of Effective Visualization</h2>
        <p>Clarity, accuracy, and engagement are key. Choose the right chart type for your data, use appropriate colors, and ensure readability across different devices.</p>

        <h2>Tools and Technologies</h2>
        <p>From D3.js for custom visualizations to Tableau for business intelligence, there are tools for every need. Libraries like Chart.js and Highcharts provide ready-to-use components.</p>

        <h2>Interactive Visualizations</h2>
        <p>Interactive elements allow users to explore data dynamically. Filtering, zooming, and drill-down capabilities enhance user engagement and understanding.</p>

        <h2>Data Storytelling</h2>
        <p>The best visualizations tell a story. They guide the viewer through the data, highlighting key insights and supporting the narrative with evidence.</p>

        <h2>Ethical Considerations</h2>
        <p>Visualizations can be misleading if not designed carefully. Always consider the context and potential biases in data representation.</p>
      `,
      author: 'Satyajit Dipu',
      date: '2023-12-15',
      tags: ['Data Visualization', 'Charts', 'Analytics'],
      readTime: '4 min read',
      image: 'https://via.placeholder.com/600x300/F59E0B/FFFFFF?text=Data+Viz'
    }
  ], []);

  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return ['All', ...Array.from(tagSet).sort()];
  }, [blogPosts]);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [blogPosts, searchTerm, selectedTag]);

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (selectedPost) {
    return (
      <section id="blog" className="blog">
        <div className="container">
          <button onClick={handleBackToList} className="back-button">
            <FaArrowLeft /> Back to Blog
          </button>
          <article className="blog-post-full">
            <header className="post-header">
              <h1 className="post-title">{selectedPost.title}</h1>
              <div className="post-meta">
                <span className="meta-item">
                  <FaUser /> {selectedPost.author}
                </span>
                <span className="meta-item">
                  <FaCalendarAlt /> {new Date(selectedPost.date).toLocaleDateString()}
                </span>
                <span className="meta-item">{selectedPost.readTime}</span>
              </div>
              <div className="post-tags">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </header>
            <div className="post-image">
              <img src={selectedPost.image} alt={selectedPost.title} />
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Thoughts, insights, and tutorials on technology, development, and innovation
        </p>

        {/* Search and Filter Controls */}
        <div className="blog-controls">
          <div className="search-group">
            <FaSearch className="control-icon" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <FaFilter className="control-icon" />
            <label htmlFor="tag-filter">Filter by Tag:</label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="filter-select"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="blog-posts">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <div key={post.id} className="blog-card" onClick={() => handlePostClick(post)}>
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="meta-item">
                      <FaCalendarAlt /> {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="meta-item">{post.readTime}</span>
                  </div>
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              <p>No posts found matching your search.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedTag('All'); }} className="btn btn-secondary">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              <FaArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-btn ${page === currentPage ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;