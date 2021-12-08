import React, { useState, useEffect } from 'react';
import { Pagination, Select } from 'antd';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

const { Option } = Select;

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  const imageTypeOptions = ['all', 'photo', 'illustration', 'vector'];
  const [selectedImageType, setSelectedImageType] = useState(
    imageTypeOptions[0]
  );

  const orientationOptions = ['all', 'horizontal', 'vertical'];
  const [selectedOrientation, setSelectedOrientation] = useState(
    orientationOptions[0]
  );

  const categoriesOptions = [
    'backgrounds',
    'fashion',
    'nature',
    'science',
    'education',
    'feelings',
    'health',
    'people',
    'religion',
    'places',
    'animals',
    'industry',
    'computer',
    'food',
    'sports',
    'transportation',
    'travel',
    'buildings',
    'business',
    'music',
  ];
  const [selectedCategory, setSelectedCategory] = useState(
    categoriesOptions[0]
  );

  const colorOptions = [
    'grayscale',
    'transparent',
    'red',
    'orange',
    'yellow',
    'green',
    'turquoise',
    'blue',
    'lilac',
    'pink',
    'white',
    'gray',
    'black',
    'brown',
  ];
  const [allSelectedColors, setAllSelectedColors] = useState('');

  const orderOptions = ['popular', 'latest'];
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0]);

  const apiUrl = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&category=${selectedCategory}&image_type=${selectedImageType}&orientation=${selectedOrientation}&pretty=true`;
  useEffect(() => {
    fetch(
      // `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=200`
      apiUrl
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [term, selectedCategory, selectedImageType, selectedOrientation]);

  const onShowSizeChange = (current, pageSize) =>
    console.log(current, pageSize);

  const handleSelectedCategory = (value) => setSelectedCategory(value);
  const handleSelectedImageType = (value) => setSelectedImageType(value);
  const handleSelectedOrientation = (value) => setSelectedOrientation(value);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div className='container mx-auto my-15'>
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className='text-5xl text-center mx-auto mt-32'>No Images Found</h1>
      )}
      {isLoading ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <>
          <div className='py-10 flex'>
            <div className='pr-10'>
              <label className='text-purple-500 font-semibold'>
                Filter By Category :{' '}
              </label>
              <Select
                defaultValue={categoriesOptions[0]}
                value={selectedCategory}
                style={{ width: 150 }}
                onChange={handleSelectedCategory}
              >
                {categoriesOptions &&
                  categoriesOptions.map((option, i) => (
                    <Option key={i} value={option}>
                      {capitalizeFirstLetter(option)}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className='pr-10'>
              <label className='text-purple-500 font-semibold'>
                Filter By Image Type :{' '}
              </label>
              <Select
                defaultValue={imageTypeOptions[0]}
                value={selectedImageType}
                style={{ width: 120 }}
                onChange={handleSelectedImageType}
              >
                {imageTypeOptions &&
                  imageTypeOptions.map((option, i) => (
                    <Option key={i} value={option}>
                      {capitalizeFirstLetter(option)}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className='pr-10'>
              <label className='text-purple-500 font-semibold'>
                Filter By Orientation :{' '}
              </label>
              <Select
                defaultValue={orientationOptions[0]}
                value={selectedOrientation}
                style={{ width: 120 }}
                onChange={handleSelectedOrientation}
              >
                {orientationOptions &&
                  orientationOptions.map((option, i) => (
                    <Option key={i} value={option}>
                      {capitalizeFirstLetter(option)}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-8'>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
          <div className='w-full py-10 ml-auto'>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
