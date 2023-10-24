import React, { useState } from 'react';

const ProductComments = ({ comments, user_id, product, setComments}) => {
  const [newHeader, setNewHeader] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productID', product.id);
      formData.append('userID', user_id);
      formData.append('header', newHeader);
      formData.append('description', newComment);
      formData.append('stars', 4);

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
        setComments([...comments, {header: newHeader, comment: newComment}]);
        window.location.reload(); // Atualiza a página para aparecer tudo direitinho
      } else {
        console.error('Review failed to be added');
      }

    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        {//Zona dos comentários
          comments.length > 0 ? ( // Verifica se há comentários
            <>
              <h2 className='font-bold mt-8 text-center mb-2'>What our customers think about this...</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index} className="mb-4 ml-6 mr-6 border border-gray-200 p-4 rounded-lg">
                    <p className='font-bold'>{comment.user}</p>
                    <p className='underline'>{comment.header}</p>
                    <p>{comment.description}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h2 className='font-bold mt-8 text-center'>Be the first to comment about this product!</h2> // Mensagem se não houver comentários
          )}
      </div>

      <div className="w-1/2">
        <h2 className='font-bold mt-8'>Let us know what you think!</h2>
        {/* Formulário para adicionar comentários */}
        <form onSubmit={handleReviewSubmit}>
          <input
            className="p-2 border rounded-lg mt-2"
            type="text"
            placeholder="Title"
            value={newHeader}
            onChange={(e) => setNewHeader(e.target.value)} // Campo para o título
          />
          <div className="mt-2 ">
            <textarea
              className="h-32 p-2 border rounded-lg w-full" style={{ maxWidth: "80ch" }}
              placeholder="Write your comment here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Campo para a descrição
            />
          </div>
          <div className="mt-2 text-right">
            <button type="submit" className="btn btn-primary">Submit Comment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductComments;
