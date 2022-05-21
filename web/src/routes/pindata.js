import dotenv from 'dotenv';
import { ethers } from 'ethers';
import fetch, { FormData, File, fileFrom } from 'node-fetch'

import { Blob } from 'buffer';

dotenv.config();



/** @type {import('./index').RequestHandler} */
export const post = async ({ request, locals }) => {
	return {
		body: {
            form: "TODO"
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

