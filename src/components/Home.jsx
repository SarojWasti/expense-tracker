import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Messages from './Messages';

const Home = ({ user }) => {
  const userName = user.displayName;
  const email = user.email;
  const emailVerified = user.emailVerified;
  const photo = user.photoURL;
  const displayUserInfo = () => {
    alert(`
      User Name: ${userName}
      User Email: ${email}
      Email Verified: ${emailVerified}
      `);
      window.location.href = photo;
  };

  return (

    <div className="w-3/4 bg-white top-1 ml-4">
      <div className="userIcon float-right mr-[4rem]">
        <button className="p-2" onClick={() => displayUserInfo()}>
          <span className="space-x-2 flex items-center">
            <img className="rounded-2xl" src={photo} height={30} width={30} />
            <span>{user.displayName}</span>
          </span>
        </button>
      </div>
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Search"
          className="searchThis w-full p-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
      <Messages user={user}/>
    </div>
  );
};

export default Home;
