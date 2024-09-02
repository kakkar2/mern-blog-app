const handlePOSTData = async (url, data, method = "POST") => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
      method: method,
      credentials: "include", // Important for sending cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};

const handleGETData = async (url) => {
  try {
    console.log(`${import.meta.env.VITE_BACKEND_URL}${url}`);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
      method: "GET",
      credentials: "include", // Important for sending cookies
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};

const handleDeleteData = async (url) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
      method: "DELETE",
      credentials: "include", // Important for sending cookies
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};

const handleProfileUpdate = async (url, data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user${url}`,
      {
        method: "PUT",
        credentials: "include", // Important for sending cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};

const handleImageUpload = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return console.log(error.message);
  }
};

export {
  handlePOSTData,
  handleGETData,
  handleProfileUpdate,
  handleImageUpload,
  handleDeleteData,
};
