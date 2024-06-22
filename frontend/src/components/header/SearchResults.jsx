import React from 'react'
import { userStore } from '../../stores/UserStore';
import { sendFriendRequest } from '../../modules/userApis';

function SearchResults({ searchResults }) {
  const {userInfo} = userStore()

async function handleFreindRequest(result) {
  const response = await sendFriendRequest(result.user_id, userInfo.user_id);
  console.log(response)
}

  return <div className='absolute z-20 bg-gray-50 shadow rounded-lg p-2 w-full'>
    {searchResults?.map((result) => {
      
      if(result.user_id === userInfo.user_id) return null

      return (
      <div key={result.user_id} className="flex justify-between items-center gap-4 p-2 border-b">
        <div>
          <h3 className="text-lg font-semibold">{result.first_name} {result.last_name}</h3>
          <p className="text-sm text-gray-500">{result.email}</p>
        </div>
        <button onClick={()=>handleFreindRequest(result)} className='bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600'>Add</button>
      </div>
    )})}
  </div>;
}

export default SearchResults