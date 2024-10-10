import { useSelector } from "react-redux";

export const ClientProfile = () => {
  const isLoggedIn = useSelector((state) => {
    return state.globalState.user;
  });

  return (
    isLoggedIn.email && (
      <div className="client-profile-page">
        <h2>
          Welcome, {isLoggedIn.firstName} {isLoggedIn.lastName}
        </h2>
        <p>Appointment Data</p>
      </div>
    )
  );
};
