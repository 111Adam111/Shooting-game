export const addScore = async (req, res) => {
    try {
      const record = req.body;
  
      res.status(201).json({ message: "Score added successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  };