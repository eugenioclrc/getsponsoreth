import dotenv from 'dotenv';
import fetch, { FormData, File } from 'node-fetch'

dotenv.config();



/** @type {import('./index').RequestHandler} */
export const post = async ({ request, locals }) => {
    const data = await request.json();

    const body = new FormData()
    const file = new File([data.content], data.filename, { type: data.filetype })
   
    body.set('file', file);

    const r = await fetch("https://demo.storj-ipfs.com/api/v0/add", {
        method: "POST",
        body,
    });

    const { Hash } = await r.json();

	return {
		body: {
            Hash
		}
	}
};



/** @type {import('./index').RequestHandler} */
export const get = async ({ request, locals }) => {

    const body = new FormData()
    const file = new File(['text'], 'abc.txt', { type: 'text/plain' })


    body.set('file', file);

    const response = await fetch("https://demo.storj-ipfs.com/api/v0/add", {
        method: "POST",
        body,
    });

    const { Hash } = await response.json();

    // sample url:
    // https://demo.storj-ipfs.com/ipfs/QmY2T5EfgLn8qWCt8eus6VX1gJuAp1nmUSdmoehgMxznAf

	return {
		body: {
            e: Hash
		}
	}
};

