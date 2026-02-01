import React, { useState, useContext, useEffect } from 'react';
import './Blog.css';
import { ThemeContext } from '../App';

const Blog = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications: Best Practices',
      excerpt: 'Learn how to structure your React applications for scalability, maintainability, and performance. This comprehensive guide covers everything from component architecture to state management.',
      content: `
        <h2>Introduction</h2>
        <p>Building scalable React applications requires careful planning and adherence to best practices. In this article, we'll explore the key principles and patterns that will help you create maintainable and performant React applications.</p>

        <h2>Component Architecture</h2>
        <p>The foundation of any scalable React application is a well-thought-out component architecture. Here are some key principles:</p>
        <ul>
          <li><strong>Single Responsibility Principle:</strong> Each component should have one clear purpose</li>
          <li><strong>Composition over Inheritance:</strong> Use composition to build complex UIs from simpler components</li>
          <li><strong>Container/Presentational Pattern:</strong> Separate business logic from presentation logic</li>
        </ul>

        <h2>State Management</h2>
        <p>Effective state management is crucial for scalable applications. Consider these approaches:</p>
        <ul>
          <li><strong>Local State:</strong> Use useState for component-specific state</li>
          <li><strong>Context API:</strong> For shared state across component trees</li>
          <li><strong>State Management Libraries:</strong> Redux, Zustand, or Jotai for complex applications</li>
        </ul>

        <h2>Performance Optimization</h2>
        <p>Performance is key to user experience. Here are some optimization techniques:</p>
        <ul>
          <li><strong>React.memo:</strong> Prevent unnecessary re-renders</li>
          <li><strong>useMemo and useCallback:</strong> Optimize expensive computations</li>
          <li><strong>Code Splitting:</strong> Load only what's needed</li>
          <li><strong>Virtual Scrolling:</strong> For large lists</li>
        </ul>

        <h2>Conclusion</h2>
        <p>By following these best practices, you'll be able to build React applications that are not only functional but also maintainable, performant, and scalable. Remember that scalability is an ongoing process that requires continuous learning and adaptation.</p>
      `,
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      tags: ['React', 'JavaScript', 'Frontend', 'Best Practices'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Mastering TypeScript: Advanced Patterns and Techniques',
      excerpt: 'Dive deep into advanced TypeScript features including conditional types, mapped types, and utility types. Learn how to leverage TypeScript\'s powerful type system for better code quality.',
      content: `
        <h2>Why TypeScript Matters</h2>
        <p>TypeScript has become an essential tool for modern JavaScript development. Its powerful type system helps catch errors at compile time and provides excellent developer experience.</p>

        <h2>Advanced Type Patterns</h2>
        <h3>Conditional Types</h3>
        <p>Conditional types allow you to create types that depend on other types:</p>
        <pre><code>type IsString<T> = T extends string ? true : false;</code></pre>

        <h3>Mapped Types</h3>
        <p>Mapped types let you transform existing types:</p>
        <pre><code>type Readonly<T> = { readonly [P in keyof T]: T[P] };</code></pre>

        <h3>Utility Types</h3>
        <p>TypeScript provides several built-in utility types:</p>
        <ul>
          <li><code>Partial&lt;T&gt;</code> - Makes all properties optional</li>
          <li><code>Pick&lt;T, K&gt;</code> - Picks specific properties</li>
          <li><code>Omit&lt;T, K&gt;</code> - Omits specific properties</li>
          <li><code>Record&lt;K, T&gt;</code> - Creates an object type</li>
        </ul>

        <h2>Practical Applications</h2>
        <p>Let's see how these patterns apply in real-world scenarios:</p>
        <ul>
          <li><strong>API Response Types:</strong> Strongly typing API responses</li>
          <li><strong>Component Props:</strong> Advanced prop typing patterns</li>
          <li><strong>Generic Constraints:</strong> Constraining generic types</li>
        </ul>

        <h2>Best Practices</h2>
        <ul>
          <li>Use strict mode for maximum type safety</li>
          <li>Leverage utility types instead of reinventing them</li>
          <li>Use type guards for runtime type checking</li>
          <li>Consider using <code>unknown</code> over <code>any</code></li>
        </ul>
      `,
      author: 'John Doe',
      date: '2024-01-10',
      readTime: '12 min read',
      category: 'TypeScript',
      tags: ['TypeScript', 'JavaScript', 'Type Safety', 'Advanced'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Node.js Microservices: Architecture and Implementation',
      excerpt: 'Explore the world of microservices architecture with Node.js. Learn about service decomposition, inter-service communication, and deployment strategies for scalable backend systems.',
      content: `
        <h2>Microservices Overview</h2>
        <p>Microservices architecture breaks down monolithic applications into smaller, independent services. Each service handles a specific business capability and can be developed, deployed, and scaled independently.</p>

        <h2>Service Decomposition</h2>
        <p>Decomposing a monolithic application requires careful analysis:</p>
        <ul>
          <li><strong>Business Domain Analysis:</strong> Identify bounded contexts</li>
          <li><strong>Data Ownership:</strong> Determine which service owns which data</li>
          <li><strong>Communication Patterns:</strong> Define how services interact</li>
        </ul>

        <h2>Inter-Service Communication</h2>
        <h3>Synchronous Communication</h3>
        <ul>
          <li><strong>HTTP/REST:</strong> Simple and widely adopted</li>
          <li><strong>gRPC:</strong> High-performance with strong typing</li>
          <li><strong>GraphQL:</strong> Flexible query language</li>
        </ul>

        <h3>Asynchronous Communication</h3>
        <ul>
          <li><strong>Message Queues:</strong> RabbitMQ, Apache Kafka</li>
          <li><strong>Event Streaming:</strong> Publish-subscribe patterns</li>
          <li><strong>WebSockets:</strong> Real-time communication</li>
        </ul>

        <h2>Implementation Considerations</h2>
        <h3>API Gateway</h3>
        <p>An API gateway acts as a single entry point for all client requests, handling routing, authentication, and rate limiting.</p>

        <h3>Service Discovery</h3>
        <p>Services need to discover each other dynamically. Solutions include:</p>
        <ul>
          <li>Client-side discovery</li>
          <li>Server-side discovery</li>
          <li>Service mesh (Istio, Linkerd)</li>
        </ul>

        <h3>Data Management</h3>
        <p>Each microservice should own its data and expose it through APIs. Consider:</p>
        <ul>
          <li>Database per service pattern</li>
          <li>Event sourcing</li>
          <li>CQRS (Command Query Responsibility Segregation)</li>
        </ul>
      `,
      author: 'John Doe',
      date: '2024-01-05',
      readTime: '15 min read',
      category: 'Backend',
      tags: ['Node.js', 'Microservices', 'Architecture', 'Backend'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox: Choosing the Right Layout System',
      excerpt: 'Understanding when to use CSS Grid versus Flexbox for your layout needs. A comprehensive comparison with practical examples and use cases.',
      content: `
        <h2>The Layout Landscape</h2>
        <p>CSS has evolved significantly with the introduction of modern layout systems. CSS Grid and Flexbox are two powerful tools that solve different layout problems.</p>

        <h2>CSS Grid: Two-Dimensional Layouts</h2>
        <p>CSS Grid excels at creating complex, two-dimensional layouts:</p>
        <ul>
          <li><strong>Grid Lines:</strong> Define rows and columns explicitly</li>
          <li><strong>Grid Areas:</strong> Name sections of your grid</li>
          <li><strong>Grid Template:</strong> Define the overall structure</li>
        </ul>

        <h3>Grid Example:</h3>
        <pre><code>.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}</code></pre>

        <h2>Flexbox: One-Dimensional Layouts</h2>
        <p>Flexbox is perfect for one-dimensional layouts along a single axis:</p>
        <ul>
          <li><strong>Main Axis:</strong> Primary direction of layout</li>
          <li><strong>Cross Axis:</strong> Perpendicular to main axis</li>
          <li><strong>Flex Items:</strong> Direct children of flex container</li>
        </ul>

        <h3>Flexbox Example:</h3>
        <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}</code></pre>

        <h2>When to Use Which?</h2>
        <h3>Use CSS Grid when:</h3>
        <ul>
          <li>You need two-dimensional layouts</li>
          <li>You want explicit control over rows and columns</li>
          <li>You're creating complex page layouts</li>
          <li>You need to align items in both directions</li>
        </ul>

        <h3>Use Flexbox when:</h3>
        <ul>
          <li>You need one-dimensional layouts</li>
          <li>Content dictates the layout size</li>
          <li>You want flexible, responsive components</li>
          <li>You're aligning items along a single axis</li>
        </ul>

        <h2>Combining Grid and Flexbox</h2>
        <p>The best approach often combines both systems:</p>
        <ul>
          <li>Use Grid for overall page layout</li>
          <li>Use Flexbox for component-level layouts</li>
          <li>Leverage the strengths of both systems</li>
        </ul>

        <h2>Browser Support and Fallbacks</h2>
        <p>Both Grid and Flexbox have excellent browser support, but consider fallbacks for older browsers using feature queries.</p>
      `,
      author: 'John Doe',
      date: '2024-01-01',
      readTime: '10 min read',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout', 'Frontend'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'DevOps for Developers: CI/CD Pipeline Essentials',
      excerpt: 'Learn the fundamentals of CI/CD pipelines and how to implement them in your development workflow. From basic concepts to advanced automation techniques.',
      content: `
        <h2>What is CI/CD?</h2>
        <p>CI/CD stands for Continuous Integration and Continuous Deployment. It's a methodology that automates the process of integrating code changes and deploying applications.</p>

        <h2>Continuous Integration (CI)</h2>
        <p>CI focuses on automatically building and testing code changes:</p>
        <ul>
          <li><strong>Automated Builds:</strong> Compile and package your application</li>
          <li><strong>Automated Testing:</strong> Run unit, integration, and end-to-end tests</li>
          <li><strong>Code Quality Checks:</strong> Linting, security scanning, and coverage reports</li>
          <li><strong>Artifact Generation:</strong> Create deployable packages</li>
        </ul>

        <h2>Continuous Deployment (CD)</h2>
        <p>CD automates the release process:</p>
        <ul>
          <li><strong>Automated Deployment:</strong> Push changes to production</li>
          <li><strong>Environment Management:</strong> Handle different deployment environments</li>
          <li><strong>Rollback Strategies:</strong> Quick recovery from failed deployments</li>
          <li><strong>Monitoring Integration:</strong> Track deployment success and performance</li>
        </ul>

        <h2>Popular CI/CD Tools</h2>
        <h3>GitHub Actions</h3>
        <p>GitHub's native CI/CD solution with seamless integration:</p>
        <pre><code>name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test</code></pre>

        <h3>GitLab CI</h3>
        <p>Comprehensive CI/CD with built-in container registry and security features.</p>

        <h3>Jenkins</h3>
        <p>Highly customizable with thousands of plugins and extensive community support.</p>

        <h2>Best Practices</h2>
        <ul>
          <li><strong>Fast Feedback:</strong> Fail fast and provide quick feedback</li>
          <li><strong>Immutable Infrastructure:</strong> Treat environments as immutable</li>
          <li><strong>Infrastructure as Code:</strong> Define infrastructure in version control</li>
          <li><strong>Security Integration:</strong> Include security checks in your pipeline</li>
          <li><strong>Monitoring:</strong> Track pipeline performance and success rates</li>
        </ul>

        <h2>Getting Started</h2>
        <ol>
          <li>Choose a CI/CD platform that fits your needs</li>
          <li>Start with basic automated testing</li>
          <li>Gradually add more sophisticated checks</li>
          <li>Implement deployment automation</li>
          <li>Monitor and optimize your pipeline performance</li>
        </ol>
      `,
      author: 'John Doe',
      date: '2023-12-28',
      readTime: '14 min read',
      category: 'DevOps',
      tags: ['CI/CD', 'DevOps', 'Automation', 'GitHub Actions'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Machine Learning in JavaScript: TensorFlow.js Guide',
      excerpt: 'Explore machine learning capabilities in the browser using TensorFlow.js. Learn to build and deploy ML models directly in JavaScript applications.',
      content: `
        <h2>TensorFlow.js Overview</h2>
        <p>TensorFlow.js brings the power of machine learning to JavaScript, allowing you to run ML models in the browser or on Node.js.</p>

        <h2>Why JavaScript for ML?</h2>
        <ul>
          <li><strong>Browser-Based ML:</strong> Run models client-side for privacy and performance</li>
          <li><strong>Full-Stack ML:</strong> Same language across frontend and backend</li>
          <li><strong>Real-Time Inference:</strong> Immediate predictions without server round-trips</li>
          <li><strong>Accessibility:</strong> ML accessible to web developers</li>
        </ul>

        <h2>Getting Started</h2>
        <p>Install TensorFlow.js via npm or CDN:</p>
        <pre><code>npm install @tensorflow/tfjs</code></pre>

        <h2>Basic Concepts</h2>
        <h3>Tensors</h3>
        <p>Tensors are the fundamental data structure in TensorFlow.js:</p>
        <pre><code>const tensor = tf.tensor([1, 2, 3, 4]);</code></pre>

        <h3>Models</h3>
        <p>You can use pre-trained models or create custom ones:</p>
        <ul>
          <li><strong>Pre-trained Models:</strong> MobileNet, PoseNet, Coco SSD</li>
          <li><strong>Custom Models:</strong> Build with tf.layers API</li>
          <li><strong>Transfer Learning:</strong> Fine-tune existing models</li>
        </ul>

        <h2>Practical Examples</h2>
        <h3>Image Classification</h3>
        <pre><code>const model = await mobilenet.load();
const predictions = await model.classify(imageElement);</code></pre>

        <h3>Custom Model Training</h3>
        <pre><code>const model = tf.sequential({
  layers: [
    tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
    tf.layers.dense({units: 10, activation: 'softmax'}),
  ]
});</code></pre>

        <h2>Performance Optimization</h2>
        <ul>
          <li><strong>WebGL Backend:</strong> GPU acceleration in the browser</li>
          <li><strong>Model Quantization:</strong> Reduce model size</li>
          <li><strong>Batch Processing:</strong> Process multiple inputs efficiently</li>
          <li><strong>Memory Management:</strong> Clean up tensors to prevent memory leaks</li>
        </ul>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Image Recognition:</strong> Classify images in real-time</li>
          <li><strong>Natural Language Processing:</strong> Sentiment analysis, text generation</li>
          <li><strong>Recommendation Systems:</strong> Personalized content suggestions</li>
          <li><strong>Anomaly Detection:</strong> Identify unusual patterns</li>
          <li><strong>Gesture Recognition:</strong> Control interfaces with hand movements</li>
        </ul>

        <h2>Deployment Considerations</h2>
        <ul>
          <li><strong>Model Hosting:</strong> Serve models from CDN or your own servers</li>
          <li><strong>Progressive Loading:</strong> Load models on demand</li>
          <li><strong>Fallback Strategies:</strong> Graceful degradation when ML isn't available</li>
          <li><strong>Privacy:</strong> Consider data privacy implications</li>
        </ul>
      `,
      author: 'John Doe',
      date: '2023-12-20',
      readTime: '16 min read',
      category: 'Machine Learning',
      tags: ['TensorFlow.js', 'Machine Learning', 'JavaScript', 'AI'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop'
    }
  ];

  const categories = ['all', 'React', 'TypeScript', 'Backend', 'CSS', 'DevOps', 'Machine Learning'];

  // Filter and search posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openPost = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  return (
    <div id="blog" className={`blog ${darkMode ? 'dark' : ''}`}>
      <div className="blog-container">
        {/* Header */}
        <header className="blog-header">
          <div className="blog-hero">
            <h1 className="blog-title">Technical Blog</h1>
            <p className="blog-subtitle">
              Insights, tutorials, and deep dives into modern web development
            </p>
          </div>
        </header>

        {/* Controls */}
        <div className="blog-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && !searchTerm && (
          <section className="featured-posts">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-grid">
              {blogPosts.filter(post => post.featured).slice(0, 3).map(post => (
                <article key={post.id} className="featured-card" onClick={() => openPost(post)}>
                  <div className="featured-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <div className="featured-overlay">
                      <span className="read-time">{post.readTime}</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="post-category">{post.category}</div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-meta">
                      <span className="post-date">{formatDate(post.date)}</span>
                      <span className="post-author">by {post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="posts-section">
          <div className="posts-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
              <span className="post-count">({filteredPosts.length})</span>
            </h2>
          </div>

          {currentPosts.length > 0 ? (
            <div className="posts-grid">
              {currentPosts.map(post => (
                <article key={post.id} className="post-card" onClick={() => openPost(post)}>
                  <div className="post-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <div className="post-overlay">
                      <span className="read-time">{post.readTime}</span>
                    </div>
                  </div>
                  <div className="post-content">
                    <div className="post-category">{post.category}</div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-tags">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="post-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="post-meta">
                      <span className="post-date">{formatDate(post.date)}</span>
                      <span className="post-author">by {post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <i className="fas fa-search"></i>
              <h3>No articles found</h3>
              <p>Try adjusting your search or category filter</p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
              Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* Post Modal */}
        {selectedPost && (
          <div className="post-modal" onClick={closePost}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closePost}>
                <i className="fas fa-times"></i>
              </button>

              <article className="modal-post">
                <header className="modal-header">
                  <div className="modal-category">{selectedPost.category}</div>
                  <h1 className="modal-title">{selectedPost.title}</h1>
                  <div className="modal-meta">
                    <span className="modal-date">{formatDate(selectedPost.date)}</span>
                    <span className="modal-author">by {selectedPost.author}</span>
                    <span className="modal-read-time">{selectedPost.readTime}</span>
                  </div>
                </header>

                <div className="modal-image">
                  <img src={selectedPost.image} alt={selectedPost.title} />
                </div>

                <div
                  className="modal-body"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />

                <div className="modal-tags">
                  <h4>Tags:</h4>
                  <div className="tag-list">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="modal-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;