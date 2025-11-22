import Establishment from '../models/Establishment.js';
import Region from '../models/Region.js';
import Dish from '../models/Dish.js';
import Country from '../models/Country.js';

export const getEstablishments = async (req, res) => {
  try {
    const establishments = await Establishment.find();
    res.json(establishments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDishesByCountry = async (req, res) => {
  try {
    let { countryName } = req.params;
    // Ensure capitalize
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1).toLowerCase();

    // The original code just did .slice(1), but let's be more robust with toLowerCase() for the rest
    // Check if original data is Title Case. Assuming yes.
    
    const dishes = await Dish.find({ country: { $regex: new RegExp(`^${countryName}$`, 'i') } }); 
    // Using regex for case-insensitive match is safer
    
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

