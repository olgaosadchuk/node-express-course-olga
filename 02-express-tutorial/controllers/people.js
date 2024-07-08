const { people } = require("../data");

const getPeople = (req, res) => {
  res.json(people);
};

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }

  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res.status(201).json({ success: true, name });
};

const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find(p => p.id === id);
  
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: "Person not found" });
  }
};

const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const personIndex = people.findIndex(p => p.id === id);

  if (personIndex !== -1) {
    people[personIndex].name = name;
    res.json({ success: true, name });
  } else {
    res.status(404).json({ message: "Person not found" });
  }
};

const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const personIndex = people.findIndex(p => p.id === id);

  if (personIndex !== -1) {
    people.splice(personIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ message: "Person not found" });
  }
};

module.exports = {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson
};