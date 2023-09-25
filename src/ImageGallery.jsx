import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircularFixed } from 'spinners-react';
import Footer from './Footer';

const AuthDetailsComponent = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div  data-testid="auth-details"> 
      {authUser ? (
        <>
          
          <span className = " -mt-2 h-3/4 p-2 bg-blue-400  hover:bg-blue-800 rounded outline-none"  data-testid="log-out-button" onClick={userLogOut}>Log Out</span>
          {/* <p className='text-white text-xs'  data-testid="logged-in-text">{`Logged In as ${authUser.email}`}</p> */}
        </>
      ) : (
        <p data-testid="logged-out-text">Logged Out</p>
      )}
    </div>
  );
};

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [draggedImageId, setDraggedImageId] = useState(null);

  useEffect(() => {
    const fetchExoticCarImages = async () => {
      const apiKey = 'pVBcq439poPW9G6dv08unKMEegWe1M8oulnVwyLv69QLNfX2JHP0IWsU';
      const randomPage = Math.floor(Math.random() * 100) + 1;
      const randomPicturesUrl = `https://api.pexels.com/v1/curated?per_page=12&page=${randomPage}`;

      try {
        const response = await fetch(randomPicturesUrl, {
          headers: {
            Authorization: apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setImages(data.photos);
      } catch (error) {
        setError('Error fetching images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExoticCarImages();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSearched(false);
  };

  const filteredImages = images.filter((photo) =>
    photo.photographer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let errorMessage = null;

  if (searched && filteredImages.length === 0) {
    errorMessage = (
      <div className="col-span-full  text-center" data-testid="no-results-message">
        Oops, &quot;{searchQuery}&quot; works are not here at the moment. Kindly check back later.
      </div>
    );
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedImageId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const updatedImages = [...images];

    const draggedImageIndex = images.findIndex(image => image.id === draggedImageId);
    const dropTargetIndex = images.findIndex(image => image.id === targetId);

    if (draggedImageIndex !== -1 && dropTargetIndex !== -1) {
      [updatedImages[draggedImageIndex], updatedImages[dropTargetIndex]] = [
        updatedImages[dropTargetIndex],
        updatedImages[draggedImageIndex]
      ];
      setImages(updatedImages);
    }

    setDraggedImageId(null);
  };

  const handleTouchStart = (e, id) => {
    e.preventDefault();
    setDraggedImageId(id);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e, targetId) => {
    e.preventDefault();
    const updatedImages = [...images];

    const draggedImageIndex = images.findIndex(image => image.id === draggedImageId);
    const dropTargetIndex = images.findIndex(image => image.id === targetId);

    if (draggedImageIndex !== -1 && dropTargetIndex !== -1) {
      [updatedImages[draggedImageIndex], updatedImages[dropTargetIndex]] = [
        updatedImages[dropTargetIndex],
        updatedImages[draggedImageIndex]
      ];
      setImages(updatedImages);
    }

    setDraggedImageId(null);
  };

  return (
    <div  className= "" data-testid="image-gallery-container ">
      <section className='bg-slate-950 py-10 p-4 fixed top-0 left-0 right-0 z-10'>
              <div className='grid grid-cols-2 p-4 content-center '>
                <div className="justify-self-start">
                    <span className="cursor-pointer  bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-rose-500 rounded p-2" data-testid="homepage-logo">DropImagery</span>
                </div>           

                <div className='justify-self-end mb-1 bg-red-600'>
                <AuthDetailsComponent data-testid="auth-details-component" />
                </div>
              </div>



                <form className=' mt-6 mx-auto text-center' onSubmit={handleSearchSubmit}>
                      <div className=' lg:w-3/4  mx-auto text-center'>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearch}
                          placeholder="Search by photographer..."
                          className="p-2 rounded-l-full md:w-3/4 lg:w-3/4  pl-[5px] md:pl-[50px] lg:pl-[50px] focus:outline-none"
                          data-testid="search-input"
                        />
                        <button type="submit" className=" spano cursor-pointer bg-blue-700 rounded-r-full text-white  px-4  ">
                          Search
                        </button>
                      </div>
                    </form>

                   
      </section>
      <div className='pt-60'>
      <div className='mx-auto text-center min-h-screen flex flex-col'>
        <div className='flex-grow'>
          
          
          {loading ? (
            <div className="flex text-blue-500 justify-center mt-4">
              <SpinnerCircularFixed color= "" size={50} />
            </div>
          ) : (
            <div className="image-gallery grid grid-cols-2 mt-10 md:grid-cols-3 lg:grid-cols-4 py-6 px-2 lg:px-8 gap-4">
              {error && <div style={{ color: 'red' }}>{error}</div>}
              {errorMessage}
              {filteredImages.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-w-[1]"
                  draggable
                  onDragStart={(e) => handleDragStart(e, photo.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, photo.id)}
                  onTouchStart={(e) => handleTouchStart(e, photo.id)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={(e) => handleTouchEnd(e, photo.id)}
                  data-testid={`image-${photo.id}`}
                >
                  <img
                    src={photo.src.large}
                    alt={photo.photographer ? photo.photographer : ''}
                    className="object-cover w-full  h-32 md:h-60 lg:h-60 rounded-lg "
                    loading='lazy'
                  />
                  <div className="absolute  text-xs p-2 lg:text-sm  bottom-2 left-2 text-slate-950 font-medium bg-white">
                    {photo.photographer && (
                      <span className="tag">{photo.photographer}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer className='fixed bottom-0 w-full bg-gray-200 p-4' />
      </div>
    </div>
    </div>
  );
};

export default ImageGallery;
