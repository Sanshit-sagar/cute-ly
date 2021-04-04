export default async (req, res) => {
    try {
        res.status(200).json({ msg: {...req} });
    } catch (error) {
        res.status(401).json({ msg: 'ERROR' });
    }
}