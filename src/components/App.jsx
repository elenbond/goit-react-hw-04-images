import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { getImage } from '../api/api';
import Modal from './Modal/Modal';
// import css from '../styles.css';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    loaging: false,
    page: 1,
    modal: false,
  }

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch('https://pixabay.com/api/?q=cat&page=1&key=27732054-5513c218cb3363c8c09534df6&image_type=photo&orientation=horizontal&per_page=12/')
  //     .then(res => res.json())
  //     .then(images => this.setState({ images: [] }))
  //     .finally(()=>this.setState({loading: false}));
  // }

  componentDidMount() {
    this.setState({
      images: [],
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchQuery } = this.props;
    if (page > prevState.page) {
      this.fetchImages(searchQuery, page);
      return;
    }
    if (page !== prevState.page && prevProps.searchQuery !== searchQuery) {
      this.fetchImages(searchQuery, 1);
      this.setState({ loading: true, page: 1 });
      return;
    }
  }
  
  onSubmit = ({searchQuery}) => {
    this.setState({ searchQuery, page: 1, images: []})
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,  // the mistake possible
    }))
  }

  openModal = imageData => {
    this.setState(({
      modal: true,
      imageData,
    }));
  }

  fetchImages = async (searchQuery, page) => {
    try {
      const { images } = await getImage({ page, q: searchQuery });
        if (images.length === 0) {
          toast.error('This search result wasn`t successful. Please, try again!');
          return;
        };
        if (images.lenght === 1) {
          toast.success('View results!');
        }
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            loading: false,
          };
        });
      
      }
    catch (error)  {
      this.setState({
        loading: false,
      });
      toast.error('Sorry, something went wrong.');
    };
  }

  render() {
    const { loading, images, modal, imageData } = this.state;
    return(
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {loading && <Loader/>}
        {images.length > 0 && <ImageGallery
          items={images}
          onClick={this.openModal} />}
        {images.length > 0 && <Button onClick={this.loadMore} />}
        {modal && <Modal
          onClose={this.openModal}
          items={images}>
            <img alt={imageData.alt} src={imageData.url}/>
        </Modal>}
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
