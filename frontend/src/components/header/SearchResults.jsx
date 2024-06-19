import React from 'react'

function SearchResults({ searchResults }) {
  return <div className='absolute bg-gray-50 shadow rounded-lg p-2 w-full'>
    {searchResults?.map((result) => (
      <div key={result.user_id} className="flex items-center gap-4 p-2 border-b">
        <div>
          <h3 className="text-lg font-semibold">{result.first_name} {result.last_name}</h3>
          <p className="text-sm text-gray-500">{result.email}</p>
        </div>
      </div>
    ))}
  </div>;
}

export default SearchResults