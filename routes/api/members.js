const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

/// REST API - Get All Members
router.get("/", (req, res) => res.json(members));

/// Get Single Member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: `Please include a name and email` });
  } else {
    members.push(newMember);
    res.json(members);
  }
});

// Update member
router.patch("/:id", (req, res) => {
  const memberId = parseInt(req.params.id);

  // Find the member in the list based on the ID
  const member = members.find(member => member.id === memberId);

  if (member != undefined) {
     // Update the member properties
    if (req.body.name) {
      member.name = req.body.name;
    }

    if (req.body.email) {
      member.email = req.body.email;
    }

    res.json({message: "Member updated successfully.", member});
  } else {
    res.status(404).json({ msg: `No member found with the id of ${memberId}` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const memberId = parseInt(req.params.id);

  // Find the index of the member in the list based on the ID
  const memberIndex = members.findIndex(member => member.id === memberId);

  if (memberIndex !== -1) {
    // Remove the member from the list
    members.splice(memberIndex, 1);

    res.json({message: 'Member deleted successfully'});
  } else {
    res.status(404).json({message: 'Member not found'});
  }
});

module.exports = router;
