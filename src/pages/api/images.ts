import {NextApiRequest ,NextApiResponse} from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res:NextApiResponse){
    const{category}=req.query;

    if(!category || (category !== 'pre-wedding' && category !== 'wedding')){
        return res.status(400).json({error:
            'invalid category'
        });
    }
    try{
        const imagesDirectory = path.join(process.cwd(),"public","images",category);
        const files =fs.readdirSync(imagesDirectory);
        const imagePaths = files.map((file) => `/images/${category}/${file}`);

        res.status(200).json(imagePaths);
    }catch(error){
        res.status(500).json({error:'Failed to load images'});
    }
}