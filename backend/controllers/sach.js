import db from "../db.js";

export const getlistsach = async (req, res) =>{
    try {
        const result = await db.query('SELECT * FROM sach');
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching list of books:', error);
        res.status(500).json({ error: 'Error fetching list of books' });
      }
    
}

export const gettentheloaisach = async (req, res) =>{
    try {
        const result = await db.query('select distinct tentheloaisach from sach');
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching list of books:', error);
        res.status(500).json({ error: 'Error fetching list of books' });
      }   
}

