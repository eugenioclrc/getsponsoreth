import dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();



/** @type {import('./index').RequestHandler} */
export const post = async ({ request, locals }) => {
	const form = await request.formData();




	return {
		body: {
            form
		}
	}
};

