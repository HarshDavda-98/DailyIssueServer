const { signUpData } = require("./Schema_model");
const bcrypt = require("bcrypt");
const e = require("express");

const GetSignup = async (req, res) => {
  try {
    const signup = await signUpData.find();
    res.status(202);
    res.send(signup);
  } catch (error) {
    res.send(error);
    res.status(501);
  }
};

const PostSignup = async (req, res) => {
  const {
    UserName,
    EmailAdd,
    Password,
    Confirm_Password,
    Id,
    LastName,
    FirstName,
  } = req.body;
  const Sign = new signUpData({
    LastName: LastName,
    UserName: UserName,
    EmailAdd: EmailAdd,
    Password: Password,
    Confirm_Password: Confirm_Password,
    Id: Id,
    FirstName: FirstName,
  });

  await signUpData.findOne({ EmailAdd: EmailAdd }).then((EmailAdd) => {
    if (EmailAdd) {
      res.status(202).json({
        msg: "Email_already_registered",
      });
    } else if (!EmailAdd) {
      Sign.save();
      res.status(202).json({
        msg: "Data_Entered_Successfully",
      });
    }
  });
};
const GetLogin = (req, res) => {
  res.send("Get the login");
};
const PostLogin = async (req, res) => {
  const { EmailAdd, Password } = req.body;
  const LogIn = await signUpData.findOne({ EmailAdd: EmailAdd });
  if (!LogIn) {
    res.status(401).send({ msg: "Account Does Not Exists" });
  } else if (LogIn.Confirm_Password !== Password) {
    res.status(401).json({ msg: "Enter valid Password" });
  } else {
    res.status(201).json({ msg: "Successs" });
  }
};
const Signout = async(req, res) => {
  if (signUpData) {
  let signout =  await signUpData.findOneAndDelete(req.params.Id);
    res.status(201).json({msg:"success",signout});
  }
};

module.exports = { GetSignup, PostSignup, PostLogin, GetLogin, Signout };
