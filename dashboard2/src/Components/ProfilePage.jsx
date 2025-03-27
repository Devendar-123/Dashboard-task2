import React from "react";

const ProfilePage = () => {
  const user = {
    name: "Nenavath Devendar",
    email: "devendar.doe@example.com",
    designation: "Associate Software Engineer",
    mobile: +91-8795642290,
    favouriteShows: "American got talent",
    profilePicture: "https://photosbulk.com/wp-content/uploads/instagram-profile-blurry.webp", 
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>
      <div>
        <img src={user.profilePicture} alt="Profile" width="150" height="150" />
      </div>
      <div>
        <h3>Name: {user.name}</h3>
        <h4>Email: {user.email}</h4>
      </div>
      <div>
        <h4>Designation: {user.designation}</h4>
        <h4>Mobile Number: {user.mobile}</h4>
        <h4>Favourite Show: {user.favouriteShows}</h4>
      </div>
    </div>
  );
};

export default ProfilePage;
