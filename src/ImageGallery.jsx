
// import { useState, useEffect } from 'react';
// import Footer from '../Footer';
// import AuthDetails from './AuthDetails';

// const ImageGallery = () => {
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searched, setSearched] = useState(false);
//   const [draggedImageId, setDraggedImageId] = useState(null);

//   useEffect(() => {
//     const fetchExoticCarImages = async () => {
//       const apiKey = 'pVBcq439poPW9G6dv08unKMEegWe1M8oulnVwyLv69QLNfX2JHP0IWsU';
//       const randomPage = Math.floor(Math.random() * 100) + 1;
//       const randomPicturesUrl = `https://api.pexels.com/v1/curated?per_page=12&page=${randomPage}`;

//       try {
//         const response = await fetch(randomPicturesUrl, {
//           headers: {
//             Authorization: apiKey,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setImages(data.photos);
//       } catch (error) {
//         setError('Error fetching images. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExoticCarImages();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setSearched(false); // Reset searched flag when typing
//   };

//   const filteredImages = images.filter((photo) =>
//     photo.photographer.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   let errorMessage = null;

//   if (searched && filteredImages.length === 0) {
//     errorMessage = (
//       <div className="col-span-full text-white text-center" data-testid="no-results-message">
//         Oops, &quot;{searchQuery}&quot; works are not here at the moment. Kindly check back later.
//       </div>
//     );
//   }

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     setSearched(true);
//   };

//   const handleDragStart = (e, id) => {
//     e.dataTransfer.setData("text/plain", id);
//     setDraggedImageId(id);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e, targetId) => {
//     e.preventDefault();
//     const updatedImages = [...images];

//     const draggedImageIndex = images.findIndex(image => image.id === draggedImageId);
//     const dropTargetIndex = images.findIndex(image => image.id === targetId);

//     if (draggedImageIndex !== -1 && dropTargetIndex !== -1) {
//       [updatedImages[draggedImageIndex], updatedImages[dropTargetIndex]] = [
//         updatedImages[dropTargetIndex],
//         updatedImages[draggedImageIndex]
//       ];
//       setImages(updatedImages);
//     }

//     setDraggedImageId(null);
//   };

//   const handleTouchStart = (e, id) => {
//     e.preventDefault();
//     setDraggedImageId(id);
//   };

//   const handleTouchMove = (e) => {
//     e.preventDefault();
//   };

//   const handleTouchEnd = (e, targetId) => {
//     e.preventDefault();
//     const updatedImages = [...images];

//     const draggedImageIndex = images.findIndex(image => image.id === draggedImageId);
//     const dropTargetIndex = images.findIndex(image => image.id === targetId);

//     if (draggedImageIndex !== -1 && dropTargetIndex !== -1) {
//       [updatedImages[draggedImageIndex], updatedImages[dropTargetIndex]] = [
//         updatedImages[dropTargetIndex],
//         updatedImages[draggedImageIndex]
//       ];
//       setImages(updatedImages);
//     }

//     setDraggedImageId(null);
//   };

//   return (
//     <div data-testid="image-gallery-container">
//       <AuthDetails data-testid="auth-details-component" />
//       <div className='grid place-items-center'>
//         <span className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 text-3xl font-extrabold hover:from-pink-500 hover:to-rose-500 rounded px-6 py-2">
//           DropImagery
//         </span>
//       </div>
//       <div className='mx-auto text-center min-h-screen flex flex-col'>
//         <div className='flex-grow'>
//           <form onSubmit={handleSearchSubmit}>
//             <div className="flex items-center justify-center lg:justify-end lg:mr-8 my-2">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 placeholder="Search by photographer..."
//                 className="p-2 rounded border-rose-700 border-2 focus:outline-none"
//                 data-testid="search-input"
//               />
//               <button type="submit" className="ml-2 bg-rose-700 text-white px-4 py-2 rounded">
//                 Search
//               </button>
//             </div>
//           </form>
//           <div className="image-gallery bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 px-8 gap-4">
//             {loading && (
//               <div className="flex justify-center items-center w-full h-full" data-testid="loading-spinner">
//                 <span
//                   className="animate-spin rounded-full h-32 text w-32 border-t-2 border-b-2 border-gray-900"
//                   style={{
//                     borderColor: 'gray',
//                   }}
//                 ></span>
//               </div>
//             )}

//             {error && <div style={{ color: 'red' }}>{error}</div>}

//             {errorMessage}

//             {filteredImages.map((photo) => (
//               <div
//                 key={photo.id}
//                 className="relative aspect-w-[1]"
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, photo.id)}
//                 onDragOver={handleDragOver}
//                 onDrop={(e) => handleDrop(e, photo.id)}
//                 onTouchStart={(e) => handleTouchStart(e, photo.id)}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={(e) => handleTouchEnd(e, photo.id)}
//                 data-testid={`image-${photo.id}`}
//               >
//                 <img
//                   src={photo.src.large}
//                   alt={photo.photographer ? photo.photographer : ''}
//                   className="object-cover w-full h-60 rounded-lg border-4 border-rose-700"
//                   loading='lazy'
//                 />
//                 <div className="absolute p-2 rounded-md bottom-2 left-2 text-slate-950 font-semibold bg-white">
//                   {photo.photographer && (
//                     <span className="tag">{photo.photographer}</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Footer className='fixed bottom-0 w-full bg-gray-200 p-4'>
//           {/* Footer content */}
//         </Footer>
//       </div>
//     </div>
//   );
// };

// export default ImageGallery


import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
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
        navigate('/'); // Navigate to the home page after logout
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='m-4' data-testid="auth-details"> 
      {authUser ? (
        <>
          <p data-testid="logged-in-text">{`Logged In as ${authUser.email}`}</p>
          <button data-testid="log-out-button" onClick={userLogOut}>Log Out</button>
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
    setSearched(false); // Reset searched flag when typing
  };

  const filteredImages = images.filter((photo) =>
    photo.photographer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let errorMessage = null;

  if (searched && filteredImages.length === 0) {
    errorMessage = (
      <div className="col-span-full text-white text-center" data-testid="no-results-message">
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
    <div data-testid="image-gallery-container">
      <AuthDetailsComponent data-testid="auth-details-component" />
      <div className='grid place-items-center'>
        <span className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-400 text-3xl font-extrabold hover:from-pink-500 hover:to-rose-500 rounded px-6 py-2">
          DropImagery
        </span>
      </div>
      <div className='mx-auto text-center min-h-screen flex flex-col'>
        <div className='flex-grow'>
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center justify-center lg:justify-end lg:mr-8 my-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by photographer..."
                className="p-2 rounded border-rose-700 border-2 focus:outline-none"
                data-testid="search-input"
              />
              <button type="submit" className="ml-2 bg-rose-700 text-white px-4 py-2 rounded">
                Search
              </button>
            </div>
          </form>
          <div className="image-gallery bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 px-8 gap-4">
            {loading && (
              <div className="flex justify-center items-center w-full h-full" data-testid="loading-spinner">
                <span
                  className="animate-spin rounded-full h-32 text w-32 border-t-2 border-b-2 border-gray-900"
                  style={{
                    borderColor: 'gray',
                  }}
                ></span>
              </div>
            )}

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
                  className="object-cover w-full h-60 rounded-lg border-4 border-rose-700"
                  loading='lazy'
                />
                <div className="absolute p-2 rounded-md bottom-2 left-2 text-slate-950 font-semibold bg-white">
                  {photo.photographer && (
                    <span className="tag">{photo.photographer}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer className='fixed bottom-0 w-full bg-gray-200 p-4'>
          {/* Footer content */}
        </Footer>
      </div>
    </div>
  );
};

export default ImageGallery;
