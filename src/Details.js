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
    <div>
      {/* <Carousel media={media} /> */}
      <div class="flex mb-4">
        <div class="w-1/2">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={media[0].medium} alt={name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{name}</div>
              <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl">{`${animal} — ${breed} — ${location}`}</h2>
            </div>

            <div className="px-6 py-4">
              <button
                onClick={toggleModal}
                className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Adopt {name}
              </button>
            </div>
          </div>
        </div>
        <div class="w-1/2">
          {showModal ? (
            <div
              class="mt-8 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div class="flex">
                <div class="py-1">
                  <svg
                    class="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p class="font-bold">Would like to adopt {name} ? </p>
                  <button
                    className="mt-2 mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={adopt}
                  >
                    Yes
                  </button>
                  <button
                    className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={toggleModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
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
