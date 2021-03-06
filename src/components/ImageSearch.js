import React, { useState } from 'react';
import { Modal } from 'antd';
import '../index.scss';

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '')
      Modal.error({ content: 'Please enter some text for search' });
    else searchText(text);
  };

  return (
    <div className='max-w-sm rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className='w-full max-w-sm'>
        <div className='flex items-center border-b border-b-2 border-teal-500 py-2'>
          <input
            onChange={(e) => setText(e.target.value)}
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
            type='text'
            placeholder='Search Image Term...'
          />
          <button
            className='bg-purple-500 flex-shrink-0 hover:bg-purple-400 text-sm font-semibold text-white py-2 px-4 rounded'
            type='submit'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageSearch;

// when we are not passing any props to child Components or passing some string, number or any other promitive value its working fine with React.memo but when passing arrays, and objects then its not work with React.memo
