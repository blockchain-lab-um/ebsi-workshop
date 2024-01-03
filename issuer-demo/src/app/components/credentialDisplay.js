'use client';

import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Textarea,
} from '@nextui-org/react';

export default function credentialDisplay({ credential, setCredential }) {
	return (
		<Card className='min-w-full'>
			<CardBody>
				<Textarea
					isReadOnly
					variant='faded'
					maxRows={30}
					value={JSON.stringify(credential, null, 4)}
					className='min-w-full h-fit'
				/>
			</CardBody>
			<Divider />
			<CardFooter>
				<Button color='primary' onClick={() => setCredential(null)}>
					Reset
				</Button>
			</CardFooter>
		</Card>
	);
}
