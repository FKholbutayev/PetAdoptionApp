import React, { useState, useEffect, useContext, lazy } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { navigate } from "@reach/router";
import ThemeContext from "./ThemeContext";
const Modal = lazy(() => import("./Modal"));

const Details = (props) => {
  const [state, setState] = useState({ loading: true, showModal: false });
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    pet
      .animal(+props.id)
      .then(({ animal }) => {
        setState((defaultState) => ({
          ...defaultState,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          url: animal.url,
          loading: false,
        }));
      })
      .catch((err) => {
        setState({ error: err });
      });
  }, [+props.id]);

  const toggleModal = () => {
    setState((defaultState) => ({
      ...defaultState,
      showModal: !defaultState.showModal,
    }));
  };

  const adopt = () => navigate(state.url);

  const {
    animal,
    breed,
    location,
    showModal,
    description,
    media,
    name,
    loading,
  } = state;
  if (loading) {
    return <h1>loading ...</h1>;
  }
  return (
    <div className="details">
      {/* <Carousel media={media} /> */}
      <div>
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
        <button onClick={toggleModal} style={{ backgroundColor: theme }}>
          Adopt {name}
        </button>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={adopt}>Yes</button>
                <button onClick={toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
