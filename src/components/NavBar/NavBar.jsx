import { Button } from '@material-ui/core';
import LoadFeed from '../UI/LoadFeed/LoadFeed';

const NavBar = ({
  counter,
  setCounter,
  counterChangeHandler,
  setAddNewPost,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'rgb(44 101 144 / 10%) 0px 0px 8px 0px',
        backgroundColor: '#8c65bb',
        padding: '0 16px',
        position: 'sticky',
        top: '0',
        zIndex: '10',
      }}
    >
      <LoadFeed
        counter={counter}
        setCounter={setCounter}
        onClick={counterChangeHandler}
      />
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setAddNewPost(true)}
          style={{ marginRight: '10px' }}
        >
          Thêm bài viết
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
