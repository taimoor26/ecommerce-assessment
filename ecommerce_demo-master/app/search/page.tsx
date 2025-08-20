'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [userInput, setUserInput] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = () => {
    setComments([...comments, userInput]);
    setUserInput('');
  };

  return (
    <div className='p-8'>
      <h1 className='text-3xl mb-4'>Search Results</h1>

      <div
        className='mb-4 p-4 bg-gray-100'
        dangerouslySetInnerHTML={{
          __html: `You searched for: <strong>${query}</strong>`,
        }}
      />

      <div className='mt-8'>
        <h2 className='text-xl mb-4'>Leave a Comment</h2>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className='w-full p-2 border'
          rows={4}
        />
        <button
          onClick={handleCommentSubmit}
          className='mt-2 px-4 py-2 bg-blue-500 text-white'
        >
          Submit Comment
        </button>

        <div className='mt-4'>
          {comments.map((comment, idx) => (
            <div
              key={idx}
              className='p-2 mb-2 bg-white border'
              dangerouslySetInnerHTML={{ __html: comment }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
