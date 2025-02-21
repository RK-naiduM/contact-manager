import { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newContact = { name, email, phone };

        try {
            const response = await axios.post('http://localhost:5000/contacts', newContact);
            console.log(response.data);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div>
            <h2>Add New Contact</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
