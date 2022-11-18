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
    if (searchQuery === '') {
      return;
    }
    const fetchImages = () => {
      setLoading(true);
      setStatus('pending');

      getImage({ page, q: searchQuery })
        .then(res => {
          const totalPages = Math.ceil(res.data.totalHits / 12);
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
  
  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setLoading(false);
    setPage(1);
    setImages([]);
  }

  const loadMore = () => {
    setPage(prevPage =>  prevPage + 1 );
  }

  const openModal = imageData => {
    setModal(!modal);
    setImageData(imageData);
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery
        items={images}
        onClick={openModal} />}
      {status === 'pending' && <Loader />}
      {loading && status === 'resolved' && <Button onClick={loadMore} />}
      {modal && (<Modal onClose={openModal} items={images}>
        <img alt={imageData.tags} src={imageData.largeImageURL} />
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
};