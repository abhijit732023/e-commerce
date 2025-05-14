import express from 'express';
import {Address_model} from '../../index.js'
const Address_route = express.Router();

// Create a new address
Address_route.post('/', async (req, res) => {
  console.log(req.body);
  
  try {
    const address = new Address_model(req.body);
    const saved = await address.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all addresses for a user
Address_route.get('/', async (req, res) => {
  try {
    const addresses = await Address_model.find();
    res.status(200).json({ message: 'successfully retrived', data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get a single address by userId
Address_route.get('/:userid', async (req, res) => {
  const userid = req.params.userid;
  console.log("User ID:", userid);
  try {
    const address = await Address_model.findOne({ userid: userid });
    console.log("Address:", address);

    if (!address || address.length === 0 || address === null) {
      // Send suitable data when no address is found
      return res.status(200).json({ success: true, data: null, message: 'No address found for this user' });
    }
    res.status(200).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update an address
Address_route.put('/:id', async (req, res) => {
  try {
    const updated = await Address_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete an address
Address_route.delete('/:id', async (req, res) => {
  try {
    const deleted = await Address_model.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }
    res.status(200).json({ success: true, message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default Address_route;
