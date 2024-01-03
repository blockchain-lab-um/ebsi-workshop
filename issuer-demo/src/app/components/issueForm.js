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
	const [loading, setLoading] = useState(false);

	async function onSubmit() {
		if (!name) return;
		setLoading(true);

		try {
			const credential = await (await fetch(`/api/issue?name=${name}`)).json();
			setCredential(credential);
		} catch (error) {
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
						type='text'
						label='Name'
						labelPlacement='inside'
						placeholder='Name'
						isClearable
						value={name}
						onValueChange={setName}
						onClear={() => setName('')}
					/>
					<Button color='primary' isLoading={loading} onClick={onSubmit}>
						Issue
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
