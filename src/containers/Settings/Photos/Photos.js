import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';
import ConfirmationModal from '../../../components/UI/ConfirmationModal/ConfirmationModal';
import useConfirmationModal from '../../../hooks/UseConfirmationModal/useConfirmationModal';
import * as actions from '../../../state/actions/index';
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading';

const UploadBox = styled.div`
  margin-bottom: 20px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor.secondary};
`;

const PickedImageInfo = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: center;
  flex-direction: column;

  & p {
    margin-bottom: 10px;
  }
`;

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ImageItem = styled.div`
  position: relative;
  width: 25%;
  padding: 10px;

  & img {
    aspect-ratio: 1/1;
    width: 100%;
    border-radius: 10px;
  }

  & div{
    position: absolute;
    top: 10px;
    width: 100%;
    height: 100%;
    left: 10px;

  }
`;

const Photos = (props) => {
  const { getImages, addImage, deleteImage, images, isLoading } = props;
  const [inputKey, setInputKey] = useState(Date.now());
  const [selectedImage, setSelectedImage] = useState();
  const [isImagePicked, setIsImagePicked] = useState(false);

  // Confirmation Modal
  const [isShowingConfirmationModal, toggleConfirmationModal] = useConfirmationModal();
  const [imageId, setImageId] = useState(null);

  const inputFileRef = useRef();

  useEffect(() => {
    getImages();
  }, []);

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setIsImagePicked(true);
    }
  }

  const handleSubmission = () => {
    if (isImagePicked) {
      addImage(selectedImage);
      setInputKey(Date.now());
      setIsImagePicked(false);
      setSelectedImage();
    }
  }

  const triggerFileInput = () => {
    inputFileRef.current.click();
  }

  const handleDelete = (id) => {
    toggleConfirmationModal();
    setImageId(id)
  }

  const handleConfirm = (id) => {
    deleteImage(id);
    toggleConfirmationModal();
  }

  return (
    <div>
      <h2>Media</h2>
      <UploadBox>
        <input type="file" name="image" style={{ display: 'none' }} ref={inputFileRef} onChange={imageHandler} key={inputKey} />
        <Button clicked={triggerFileInput}>Dodaj zdjęcie</Button>
        {isImagePicked ? (
          <PickedImageInfo>
            <p>Zdjęcie: {selectedImage.name}</p>
            <Button clicked={handleSubmission}>Prześlij zdjęcie</Button>
          </PickedImageInfo>
        ) : null}
      </UploadBox>
      {isLoading
        ?
        <Loading />
        :
        (
          <ImageList>
            {
              images.length > 0
                ?
                (images.map(image =>
                  <ImageItem key={image._id}>
                    <div>
                      <Button variant="alert" clicked={() => handleDelete(image._id)}>
                        <Trash2 size={20} />
                      </Button>
                    </div>
                    <img key={image._id} src={`http://localhost:8080/upload/${image.name}`} alt={image._id} />
                  </ImageItem>
                ))
                :
                (<p>Brak Zdjęć</p>)
            }
          </ImageList>
        )
      }
      <ConfirmationModal
        show={isShowingConfirmationModal}
        clicked={toggleConfirmationModal}
        title="Potwierdź operację"
        text="Usunąć ten obraz?"
        onConfirm={() => handleConfirm(imageId)}
      />
    </div>
  )
};

const mapStateToProps = (state) => ({
  images: state.images.images,
  isLoading: state.images.isLoading,
  isUploading: state.images.isUploading,
  getError: state.images.getError,
  uploadError: state.images.uploadError
});

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(actions.getImages()),
  addImage: (image) => dispatch(actions.addImage(image)),
  deleteImage: (id) => dispatch(actions.deleteImage(id))
});

Photos.defaultProps = {
  images: []
};

Photos.propTypes = {
  getImages: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }))
};


export default connect(mapStateToProps, mapDispatchToProps)(Photos);
