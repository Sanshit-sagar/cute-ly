// import { withAuth } from '../../../lib/middlewares';
import { getAllSites } from '../../../lib/db'; 

const handler = async (req, res) => {
  try {
    const { sites } = await getAllSites();
    console.log("Inside handler"); 
    return res.status(200).json({ sites });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default handler; 

// export default withAuth(handler);