const ImageCard = ({ image }) => {
  // <div className='max-w-sm rounded overflow-hidden shadow-lg'>
  return (
    <div className='rounded overflow-hidden shadow-lg'>
      <img src={image.webformatURL} alt={image.user} className='w-full' />
      <div className='px-6 py-4'>
        <div className='font-bold text-purple-500 text-xl mb-2'>
          Photo by {image.user.charAt(0).toUpperCase() + image.user.slice(1)}
        </div>
        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Dowloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
          <li>
            <strong>Comments: </strong>
            {image.comments}
          </li>
          <li>
            <strong>Collections: </strong>
            {image.collections}
          </li>
          <li>
            <strong>Image Width: </strong>
            {image.imageWidth}
          </li>
          <li>
            <strong>Image Height: </strong>
            {image.imageHeight}
          </li>
          <li>
            <strong>Image Size: </strong>
            {image.imageSize}
          </li>
        </ul>
      </div>
      <div className='px-6 py-4'>
        {image.tags &&
          image.tags.split(',').map((tag, i) => (
            <span
              key={i}
              className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-3'
            >
              #{tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ImageCard;
