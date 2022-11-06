import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { getImage } from 'api/api';
import Modal from './Modal/Modal';
import css from '../styles.css'

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    loaging: false,
    page: 1,
    modal: false,
  }

  componentDidMount() {
    this.setState({
      images: [],
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (page !== prevState.page || prevState.searchQuery !== searchQuery) {
      this.setState({ loading: true });
      if (page === 1) {
        this.setState({
          images: []
        });
      }
      this.fetchImages();
    }
  }
  
  onSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] })
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  openModal = imageData => {
    this.setState(({ modal }) => ({
      modal: !modal,
      imageData,
    }));
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    getImage({ page, q: searchQuery })
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res],
          loading: false,
        }));
        if (res.length === 0) {
          return toast.error('This search result wasn`t successful. Please, try again!');
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
        })
        toast.error('Sorry, something went wrong.');
      })
  }

  render() {
    const { loading, images, modal, imageData } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {loading && <Loader/>}
        {images.length > 0 && <ImageGallery
          items={images}
          onClick={this.openModal} />}
        {images.length > 0 && <Button onClick={this.loadMore} />}
        {modal && (<Modal onClose={this.openModal} items={images}>
            <img alt={imageData.tags} src={imageData.largeImageURL}/>
        </Modal>)}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
  )};
};