import { useParams } from 'react-router-dom'

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
