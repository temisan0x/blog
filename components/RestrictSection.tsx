const RestrictSection = () => {
    return (
      <div
        className="bg-red-500 text-white p-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>You are restricted from viewing this content.</h2>
        <p>Please contact the administrator for access.</p>
      </div>
    );
  };
  export default RestrictSection;