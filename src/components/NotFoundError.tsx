
const NotFoundError = ({error}: {error:string}) => {

  return (
    <div className=" text-center font-bold mt-4 p-10 capitalize font-open text-gray-500">
      <img
        src="src/assets/no-input-error.jpg"
        alt="error-logo"
        className="w-[400px]"
      />
      {error}!
    </div>
  );
};

export default NotFoundError;
