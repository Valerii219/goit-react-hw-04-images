import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../services/getImages';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import WatchSpinner from './Loader/Loader'
import LoadMore from "./Button/Button";
import Modal from "./Modal/Modal";

class App extends Component {
  state = {
    searchText: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    perPage: 12,
    data:[],
    showModal: false,
    modalImage: "",
    loadButton:false,
  }

  searchSubmit = (searchText) => {
    this.setState({ searchText, page: 1, images: [] });
  }

  getData = () => {
    const { perPage, page, searchText } = this.state;
    getImages(searchText,  page , perPage)
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
          this.setState((prevState) => ({
            images: [...prevState.images, ...images],
            totalPages: Math.ceil(data.totalHits / perPage),
            loadButton: images.length >= 12 ? true : false,
          }));
        } else {
          throw new Error(`No images found for ${searchText}`);
        }
      })
      .catch((error) => {
        this.setState({ images: [], error,  loadButton: false });
      })
      .finally(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText, page} = this.state;
    if (prevState.searchText !== searchText || prevState.page !== page) {
      this.setState({ loading: true });
      this.getData();
    }
  }

  loadMore = () => {
    const { page, totalPages } = this.state;
    if (page < totalPages) {
      this.setState((prevState) => ({
        page: prevState.page + 1,
      }));
    } else {
      this.setState({ loadButton: false });
    }
  }

  showModal = ({ id }) => {
    const modalImage = this.state.images.find(
      (image) => image.id === id
    );
    this.setState({
      modalImage,
      showModal: true,
    });
  }

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' })
  }

  render() {
    const { images, loading, error, modalImage, loadButton} = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.searchSubmit} />
        {loading && <WatchSpinner />}
        {error && <div>{error.message}</div>}
        <ImageGallery propsImage={images} showModal={this.showModal} />
        {loadButton && <LoadMore loadMore={this.loadMore} />}
        <ToastContainer autoClose={3000} />
        {this.state.showModal && <Modal modalImage={modalImage} onCloseModal={this.closeModal}/>}
      </div>
    );
  }
}

export default App;