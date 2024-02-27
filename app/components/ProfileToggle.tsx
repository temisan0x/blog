import Image from "next/image";

const ProfileToggler = ({
  handleDropdownToggle,
  session,
  handleSignOut,
  usernameData,
}: any) => {
  const { image, name } = session?.user || {};
  const handleMouseEnter = () => handleDropdownToggle(true);

  return (
    <div
      className="absolute top-16 right-0 p-4 shadow-md rounded-md w-48 bg-gray-900 border-gray-800 bg-bg/75"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => handleDropdownToggle(false)}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <Image src={image} width={40} height={40} alt={`${name} image`} />
        <hr className="my-2 border-gray-300" />
        <p className="text-sm text-gray-400 hover:text-gray-300 transition duration-300 ease-in-out">
          profile settings
        </p>
          <button
            onClick={handleSignOut}
            className="text-gray-600 hover:text-red-500 transition duration-300 ease-in-out"
          >
            Logout
          </button>
      </div>
    </div>
  );
};

export default ProfileToggler;