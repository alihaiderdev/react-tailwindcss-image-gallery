import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Pagination, Select } from 'antd';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import { Col, Row } from 'react-bootstrap';
import './index.scss';

const { Option } = Select;

const App = () => {
  const [totalHits, setTotalHits] = useState(0);
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

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [itemsPerPage, seTItemsPerPage] = useState(10);

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
  const [allSelectedColors, setAllSelectedColors] = useState([colorOptions[2]]);

  const orderOptions = ['popular', 'latest'];
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0]);

  // &colors=${allSelectedColors}
  const apiUrl = `https://pixabay.com/api/?key=${
    process.env.REACT_APP_PIXABAY_API_KEY
  }&q=${term}&page=${currentPageNumber}&per_page=${itemsPerPage}&safesearch=${true}&order=${selectedOrder}&category=${selectedCategory}&image_type=${selectedImageType}&orientation=${selectedOrientation}&pretty=true`;
  useEffect(() => {
    fetch(
      // `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=200`
      apiUrl
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
        setTotalHits(data.total);
        console.log('data', data);
      })
      .catch((error) => console.log(error));
  }, [
    term,
    itemsPerPage,
    currentPageNumber,
    // allSelectedColors,
    selectedOrder,
    selectedCategory,
    selectedImageType,
    selectedOrientation,
  ]);
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const showTotal = (total) => `${total} Total Items: `;

  const onShowSizeChange = (current, pageSize) => {
    seTItemsPerPage(pageSize);
    setIsLoading(true);
  };

  const onPageChange = (page) => {
    setCurrentPageNumber(page);
    setIsLoading(true);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handleSelectedColors = (value) => {
    console.log(`selected ${value}`);
    setAllSelectedColors(value);
    setIsLoading(true);
  };
  // console.log('all Selected Colors: ', allSelectedColors);

  const handleSelectedOrder = (value) => {
    setSelectedOrder(value);
    setIsLoading(true);
  };

  const handleSelectedCategory = (value) => {
    setSelectedCategory(value);
    setIsLoading(true);
  };
  const handleSelectedImageType = (value) => {
    setSelectedImageType(value);
    setIsLoading(true);
  };
  const handleSelectedOrientation = (value) => {
    setSelectedOrientation(value);
    setIsLoading(true);
  };

  return (
    <div className='container mx-auto my-15'>
      <ImageSearch
        searchText={useMemo(() => {
          return (text) => setTerm(text);
        }, [])}
      />

      {!isLoading && images.length === 0 ? (
        <h1 className='text-5xl text-center mx-auto mt-32'>No Images Found</h1>
      ) : isLoading ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <>
          <div className='py-5'>
            {/* <div className='pr-10'>
              <label className='text-purple-500 font-semibold'>
                Filter By Colors:{' '}
              </label>
              <Select
                mode='multiple'
                allowClear
                style={{ width: 150 }}
                placeholder='Please select colors'
                defaultValue={['red']}
                onChange={handleSelectedColors}
              >
                {colorOptions &&
                  colorOptions.map((option, i) => (
                    // <Option key={option} value={option}>
                    <Option key={option}>{option}</Option>
                  ))}
              </Select>
            </div> */}
            {/* className='pr-10' */}
            <Row>
              <Col xs={12} sm={6} md={4} lg={3} className='py-2'>
                <label className='text-purple-500 font-semibold pr-2'>
                  Order By:
                </label>
                <Select
                  defaultValue={orderOptions[0]}
                  value={selectedOrder}
                  style={{ width: 150 }}
                  onChange={handleSelectedOrder}
                >
                  {orderOptions &&
                    orderOptions.map((option, i) => (
                      <Option key={i} value={option}>
                        {capitalizeFirstLetter(option)}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className='py-2'>
                <label className='text-purple-500 font-semibold pr-2'>
                  Filter By Category:{' '}
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
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className='py-2'>
                <label className='text-purple-500 font-semibold pr-2'>
                  Filter By Image Type:{' '}
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
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className='py-2'>
                <label className='text-purple-500 font-semibold pr-2'>
                  Filter By Orientation:{' '}
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
              </Col>
            </Row>
          </div>
          <Row>
            {images.map((image) => (
              <Col
                key={image.id}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                xxl={4}
                className='py-3'
              >
                <ImageCard image={image} />
              </Col>
            ))}
          </Row>
          {/* <div className='grid grid-cols-3 gap-8'>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div> */}
          <div className='w-full py-10 ml-auto'>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              total={totalHits}
              showTotal={showTotal}
              showQuickJumper
              current={currentPageNumber}
              onChange={onPageChange}
              hideOnSinglePage={true}
              pageSizeOptions={['10', '50', '100', '200']}
              responsive={true}
              // defaultCurrent={currentPageNumber}
              // total={500}
              // itemRender={itemRender}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;

// const Greeting = (props) => {
//   console.log('Greeting Comp render');
//   return <h1>Hi {props.name}!</h1>;
// };

// const Greeting = React.memo((props) => {
//   console.log('Greeting Comp render');
//   return <h1>Hi {props.name}!</h1>;
// });

// function App() {
//   const [counter, setCounter] = React.useState(0);
//   React.useEffect(() => {
//     setInterval(() => {
//       setCounter(counter + 1);
//     }, 2000);
//   }, []);

//   console.log('App render');
//   return <Greeting name='Ruben' />;
// }

// export default App;
