import { useContext } from 'react';
import { AuthContext } from '../../../contextapi/AuthContext';

const ContenInformation = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <p>Loading...</p>;
  }

  const { user, isLogged } = authContext;

  if (!isLogged) {
    return <p>Please log in to see user information.</p>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>FullName:</strong> {user.fullName}</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default ContenInformation;
