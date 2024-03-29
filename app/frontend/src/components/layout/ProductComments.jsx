import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

const ProductComments = ({ comments, user_id, product, setComments }) => {
  const [newHeader, setNewHeader] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');

  useEffect(() => {
    comments.map((comment, i) => {
      document.getElementById(`comment_body-${i}`).innerHTML =
        comment.description;
    });
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productID', product.id);
      formData.append('userID', user_id);
      formData.append('header', newHeader);
      formData.append('description', newComment);
      formData.append('stars', newRating);

      const response = await fetch('http://localhost:8080/product/addReview', {
        method: 'POST',
        body: formData,
      });

      const data = await response.text();
      console.log(data);
      if (response.ok) {
        console.log('Review sucessfully added');
        setNewHeader('');
        setNewComment('');
        setComments([...comments, { header: newHeader, comment: newComment }]);
        window.location.reload(); // Atualiza a página para aparecer tudo direitinho
      } else {
        console.error('Review failed to be added');
      }
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        {
          //Zona dos comentários
          comments.length > 0 ? ( // Verifica se há comentários
            <>
              <h2 className="font-light text-start ">
                What our customers think about this product...
              </h2>
              <ul>
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="p-4 rounded-lg"
                  >
                    <h2 className="font-bold">{comment.user}</h2>
                    <Rating
                      value={comment.numStars}
                      readOnly
                      size="small"
                      precision={0.5}
                      className="my-2"
                    />
                    <h3 className="text-accent font-medium">
                      {comment.header}
                    </h3>
                    <p
                      id={`comment_body-${index}`}
                      className="text-sm font-light"
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h2 className="font-light text-center">
              Be the first to comment about this product!
            </h2> // Mensagem se não houver comentários
          )
        }
      </div>

      <div className="w-full p-2">
        <h2 className="font-light divider ">Let us know what you think</h2>
        {/* Formulário para adicionar comentários */}
        <form onSubmit={handleReviewSubmit}>
          <span className="flex flex-col">
            <label
              className="font-light my-2"
              htmlFor="rating"
            >
              Your rating
            </label>
            <Rating
              id="rating"
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              size="large"
              onChange={(e) => {
                setNewRating(e.target.value ? e.target.value : 0);
              }}
            />
          </span>

          <div className="mt-2 flex flex-col">
            <label className="font-light my-2">Your review</label>
            <span>
              <input
                className="p-2 input-sm rounded-lg my-2 w-full"
                type="text"
                placeholder="Title"
                value={newHeader}
                onChange={(e) => setNewHeader(e.target.value)} // Campo para o título
              />
            </span>
            <textarea
              id="comment-section"
              className="min-h-[25vh] p-2 border-secondary focus:border-secondary rounded-lg w-full"
              placeholder="Write your comment here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Campo para a descrição
            />
          </div>
          <div className="my-2 text-right flex">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                newRating === '' || newHeader === '' || newComment === ''
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductComments;
