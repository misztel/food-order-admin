import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../state/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import useModal from '../../../hooks/useModal/useModal';

import Button from '../../../components/UI/Button/Button';
import AddMenuCategoryForm from '../../../components/Forms/AddMenuCategoryForm/AddMenuCategoryForm';

const Menu = (props) => {
  const { getImages, images, isLoading } = props;
  const [isShowingModal, toggleModal] = useModal();

  useEffect(() => {
    getImages();
  }, [])

  const handleAddCategory = () => {
    toggleModal();
  }

  return (
    <div>
      <h1>Menu</h1>

      <Button clicked={handleAddCategory}>Nowa Kategoria</Button>

      <Modal
        show={isShowingModal}
        clicked={toggleModal}
      >
        <AddMenuCategoryForm images={images} isLoading={isLoading} />
      </Modal>
    </div>
  )
};

const mapStateToProps = state => ({
  images: state.images.images,
  isLoading: state.images.isLoading
});

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(actions.getImages())
});

Menu.propTypes = {
  getImages: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  isLoading: PropTypes.bool.isRequired
}

Menu.defaultProps = {
  images: []
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
