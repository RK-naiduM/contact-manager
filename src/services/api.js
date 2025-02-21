import axios from "axios";

const API_URL = "http://localhost:5000"; // Backend URL

export const getContacts = async () => {
  return await axios.get(`${API_URL}/contacts`);
};

export const addContact = async (contactData) => {
  return await axios.post(`${API_URL}/contacts`, contactData);
};
