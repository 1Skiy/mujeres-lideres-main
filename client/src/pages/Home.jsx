import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const cat = location.search;

  const [posts, setposts] = useState([]);
  const [showArrow, setShowArrow] = useState(false); // Estado para mostrar la flecha

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        setposts(res.data);
      } catch (err) {
        console.error("Error al obtener los posts:", err);
      }
    };
    fetchPosts();
  }, [cat]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              {post.img ? (
                <img src={post.img} alt={post.title} />
              ) : (
                <p>No hay imagen disponible</p>
              )}
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{post.descripcion}</p>
                <button>Leer más</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Flecha flotante */}
      {showArrow && (
        <button className="scrollToTop" onClick={scrollToTop}>
          ⬆
        </button>
      )}
    </div>
  );
};

export default Home;
