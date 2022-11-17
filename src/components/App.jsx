import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { getImage } from 'api/api';
import Modal from './Modal/Modal';
import css from '../styles.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    const fetchImages = () => {
      setLoading(true);
      setStatus('pending');

      getImage({ page, q: searchQuery })
        .then(res => {
          const totalPages = Math.ceil(res.data.totalHits / 20);
          if (page <= totalPages) {
            setImages(prev => [...prev, ...res.data.hits]);
            setStatus('resolved');
            setLoading(page !== totalPages ? true : false);
          }
          if (res.length === 0) {
            return toast.error('This search result wasn`t successful. Please, try again!');
          }
        })
        .catch(error => {
          setLoading(false);
          setStatus('rejected');
          toast.error('Sorry, something went wrong.');
        })
    }
    fetchImages();
  }, [searchQuery, page]);
// }

// export class App extends Component {
//   state = {
//     images: [],
//     searchQuery: '',
//     loaging: false,
//     page: 1,
//     modal: false,
//     status: 'idle',
//   }

  // async componentDidUpdate(prevProps, prevState) {
  //   const { page, searchQuery } = this.state;
  //   if (page !== prevState.page || prevState.searchQuery !== searchQuery) {
  //     this.setState({ loading: true });
  //     this.fetchImages();
  //   }
  // }
  
  const onSubmit = searchQuery => {
    // this.setState({ searchQuery, page: 1, images: [] })
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  }

  const loadMore = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    setPage(prevPage =>  prevPage + 1 );
  }

  const openModal = imageData => {
    // this.setState(({ modal }) => ({
    //   modal: !modal,
    //   imageData,
    // }));
    setImageData(imageData);
    setModal(false);
  }

  // const fetchImages = () => {
  //   // const { searchQuery, page } = this.state;
  //   setStatus('pending');
  //   // this.setState({ status: 'pending' });
  //   getImage({ page, q: searchQuery })
  //     .then(res => {
  //       const totalPages = Math.ceil(res.data.totalHits / 20);
  //       if (page <= totalPages) {
  //         // this.setState(prevState => ({
  //         //   images: [...prevState.images, ...res.data.hits],
  //         //   status: 'resolved',
  //         //   loading:  page !== totalPages ? true : false,
  //         // }));
  //         setImages(prev => [...prev, ...images]);
  //         setStatus('resolved');
  //         setLoading(page !== totalPages ? true : false);
  //       }
  //       if (res.length === 0) {
  //         return toast.error('This search result wasn`t successful. Please, try again!');
  //       }
  //     })
  //     .catch(error => {
  //       // this.setState({
  //       //   loading: false,
  //       //   status: 'rejected',
  //       // })
  //       setLoading(false);
  //       setStatus('rejected');
  //       toast.error('Sorry, something went wrong.');
  //     })
  // }

  // render() {
    // const { loading, images, modal, imageData, status } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        {images.length > 0 && <ImageGallery
          items={images}
          onClick={openModal} />}
        {status === 'pending' && <Loader/>}
        {loading && status === 'resolved' && <Button onClick={loadMore} />}
        {modal && (<Modal onClose={openModal} items={images}>
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
  )
// };
};