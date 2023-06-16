import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Forbidden</div>
      <div>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    </>
  );
};

export default ForbiddenPage;
