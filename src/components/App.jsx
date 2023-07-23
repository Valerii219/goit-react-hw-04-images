import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "../services/getImages";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import WatchSpinner from "./Loader/Loader";
import LoadMore from "./Button/Button";
import Modal from "./Modal/Modal";

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(12);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [loadButton, setLoadButton] = useState(false);

  useEffect(() => {
    if (searchText) {
      setLoading(true);
      getImages(searchText, page, perPage)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        })
        .then((data) => {
          if (data.hits.length > 0) {
            const images = data.hits.map((image) => ({
              id: image.id,
              webformatURL: image.webformatURL,
              largeImageURL: image.largeImageURL,
            }));
            setImages((prevImages) => [...prevImages, ...images]);
            setTotalPages(Math.ceil(data.totalHits / perPage));
            setLoadButton(images.length >= 12 ? true : false);
            if(error){
              setError(null)
            }
          } else {
            throw new Error(`No images found for ${searchText}`);
          }
        })
        .catch((error) => {
          setError(error);
          setImages([]);
          setLoadButton(false);
        })
        .finally(() => setLoading(false));
    }
  }, [searchText, page, perPage, error]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setLoadButton(false);
    }
  };

  const showModals = (imageId) => {
    setModalImage(images.find((image) => image.id === imageId));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const searchSubmit = (searchText) => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
  };

  return (
    <div>
      <Searchbar onSubmit={searchSubmit} />
      {loading && <WatchSpinner />}
      {error && <div>{error.message}</div>}
      <ImageGallery propsImage={images} showModal={showModals} />
      {loadButton && <LoadMore loadMore={loadMore} />}
      <ToastContainer autoClose={3000} />
      {showModal && <Modal modalImage={modalImage} onCloseModal={closeModal} />}
    </div>
  );
};

export default App;