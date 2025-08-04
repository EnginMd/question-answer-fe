import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post';

const User = () =>
{
    const params = useParams();

  return (
    <div>
          User!!! {params.id}
        
    </div>
  )
}

export default User
