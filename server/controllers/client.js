import Loan from "../models/Loan.js";
import User from "../models/User.js";

export const getLoans = (req, res) => {
  const user_id = req.query.id;
  console.log(user_id);


  User.findById(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      else {
        if(user.role=='admin'){
          Loan.find({ status: { $in: ["approved", "pending"] } })
        .then((loans) => {
          res.status(200).json(loans);
        })
        .catch((error) => {
          console.error("Error fetching loans:", error);
          res.status(500).json({ error: "Internal server error" });
        });
        }
        else if(user.role=='verifier'){
          Loan.find({ status: { $in: ["verified", "pending"] } })
          .then((loans) => {
            res.status(200).json(loans);
          })
          .catch((error) => {
            console.error("Error fetching loans:", error);
            res.status(500).json({ error: "Internal server error" });
          });
        }
        else{
          Loan.find({ user_id:user_id })
          .then((loans) => {
            res.status(200).json(loans);
          })
          .catch((error) => {
            console.error("Error fetching loans:", error);
            res.status(500).json({ error: "Internal server error" });
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

export const submitFormData = async (req, res) => {
  try {
    // Retrieve form data from the request body
    const formData = req.body;
    console.log(formData);

    // Find the user by user ID
    const user = await User.findById(formData.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);

    // Create a new loan entry using the form data
    const newLoan = new Loan({
      user_id: user._id,
      name: formData.fullName,
      amount: formData.amountNeeded,
      tenure: formData.loanTenure,
      employment_status: formData.employmentStatus,
      reason: formData.reasonForLoan,
      address: formData.employmentAddress,
    });

    console.log(newLoan);
    // Save the new loan entry to the database
    await newLoan.save();

    // Respond with the newly created loan
    res.status(201).json(newLoan);
  } catch (error) {
    console.error("Error saving loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUserRole = (req, res) => {
  //const userId= '63701cc1f03239c72c000182';
  const user_id = req.query.id;
  
  User.findById(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        const { role } = user; 
        console.log(role);
        res.status(200).json({ role }); 
      }
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};
