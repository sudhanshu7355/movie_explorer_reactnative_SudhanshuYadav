import axios from 'axios';



//sign-up api
export const signUpRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-ashutosh-singh.onrender.com/users',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

//sign-in api
export const LoginRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-ashutosh-singh.onrender.com/users/sign_in',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

// Get All Movies
export const getAllMovies = async () => {
  try{
  const res = await axios.get('https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies?=page=2&per_page=50')
  return res.data.movies;
  } catch(error){
    console.log("Error Occured while fetching", error);
    return null;
  }
};
export const updateMovie = async (id,token, formData) => {
  try {
    const response = await axios.put(`https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const deleteMovie = async (id, token) => {
  console.log('DeleteMovie called');
  console.log('Received token:', token);

  try {
    const response = await axios.delete(
      `https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    console.log('Delete success:', response.data);
    return true;
  } catch (error) {
    console.error('Delete error:', error.response?.data || error.message); 
    return false;
  }
};

export const createSubscription = async (planType: string , token: string): Promise<string> => {
  try {
    console.log("Retrieved token:", token);
    if (!token) {
      toast.error("You need to sign in first.");
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      `https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/subscription`,
      { plan_type: planType },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`,
        },
      }
    );

    console.log('API Response:', response.data);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const checkoutUrl = response.data.checkoutUrl || response.data.data?.checkoutUrl || response.data.url;
    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from server.');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error(error.message || 'Failed to initiate subscription');
  }
};

export const GetSubscriptionStatus = async (session_id : string) => {
  try {
    const res = await axios.get(
      `https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/subscriptions/success?session_id=${session_id}`,
    );
    return res;
  } catch (error) {
    console.log('Error fetching:', error);
    return null;
  }
};
export const createMovie = async (formData, token) => {
  console.log(token)
  console.log(formData)
  try {
    const response = await axios.post('https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies', formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'multipart/form-data',
        
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetsubscriptionStatus = async(token)=>{
  try {
    const response = await axios.get('https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/subscriptions/status', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
      throw error;
  }
}
