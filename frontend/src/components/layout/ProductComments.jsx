import React, { useState } from 'react';

const ProductComments = ({ comments, onCommentSubmit, username }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userComment = `${username}: ${newComment}`;
    onCommentSubmit(userComment);
    setNewComment('');
  };

  return (
    <div>
      {comments.length > 0 ? ( // Verifica se há comentários
        <>
          <h2>What our customers think about this...</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <h2>Let us know what you think</h2>
        </>
      ) : (
        <p>Be the first to comment about this product!</p> // Mensagem se não houver comentários
      )}
      {/* Formulário para adicionar comentários */}
      <form onSubmit={handleSubmit}>
        {username && <p>Logged in as: {username}</p>}
        <textarea
          className="h-32 p-2 border rounded-lg"
          placeholder="Write your comment here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="mt-2">
            <button type="submit" className="btn btn-primary">Submit Comment</button>
        </div>
      </form>
    </div>
  );
};

export default ProductComments;
