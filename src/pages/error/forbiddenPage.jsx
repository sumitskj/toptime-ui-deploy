import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Forbidden</div>
      <div>
        <button onClick={() => navigate('/', { replace: 'true' })}>Go Home</button>
      </div>
    </>
  );
};

export default ForbiddenPage;
