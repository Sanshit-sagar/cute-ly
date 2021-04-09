import db from  '../../../lib/firebase-admin';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const ref = db.ref('views').child(req.query.slug);
            const { snapshot } = await ref.transaction((currentViews) => {
                if (currentViews === null) {
                  return 1;
                }
                return currentViews + 1;
            });
        
            return res.status(200).json({
                total: snapshot.val()
            });
        } catch (error) {
            return res.status(401).json({ 
                message: 'ERROR',
                data: error.message,
            });
        }
    } else if (req.method === 'GET') {
        try {
            const snapshot = await db.ref('views').child(req.query.slug).once('value');
            const views = snapshot.val();
        
            return res.status(200).json({ total: views });
        } catch (error) {
            return res.status(401).json({ 
                message: 'ERROR',
                data: error.message,
            });
        }
    }
}