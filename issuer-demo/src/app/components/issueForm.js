'use client';

import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Divider,
	Button,
	Input,
} from '@nextui-org/react';

export default function IssueForm({ setCredential }) {
	const [name, setName] = useState('');
	const [did, setDid] = useState(
		'did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK'
	);
	const [loading, setLoading] = useState(false);

	async function onSubmit() {
		if (!did || !name) {
			alert('Please fill out all fields');
			return;
		}
		const regexPattern = /^did:key:z[a-km-zA-HJ-NP-Z1-9]+$/;
		if (!regexPattern.test(did)) {
			alert('Invalid DID');
			return;
		}
		setLoading(true);

		try {
			const credential = await (
				await fetch(
					`/api/issue?name=${encodeURIComponent(name)}&did=${encodeURIComponent(
						did
					)}`
				)
			).json();
			setCredential(credential);
		} catch (error) {
			alert('Error issuing credential');
			console.error(error);
		}

		setLoading(false);
	}

	return (
		<Card className='max-w-[400px]'>
			<CardHeader className='flex gap-3'>
				<div className='flex flex-col'>
					<p className='text-md'>Issue a test credential</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>Input a name that the credential will be issued to.</p>
				<div className='flex flex-col justify-between gap-4 mt-4'>
					<Input
						id='name'
						type='text'
						label='Name'
						labelPlacement='inside'
						placeholder='Name'
						isClearable
						value={name}
						onValueChange={setName}
						onClear={() => setName('')}
					/>
					<Input
						id='did'
						type='text'
						label='Recipient DID'
						labelPlacement='inside'
						placeholder='DID'
						isClearable
						value={did}
						onValueChange={setDid}
						onClear={() => setDid('')}
					/>
					<Button color='primary' isLoading={loading} onClick={onSubmit}>
						Issue
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
