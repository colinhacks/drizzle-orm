import type { Client, PoolClient } from 'pg';
import { type Equal, Expect } from 'type-tests/utils.ts';
import type { NodeCockroachDatabase } from '~/cockroach/index.ts';

{
	const db = {} as NodeCockroachDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PoolClient | Client>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, PoolClient | Client>>;
		});
	});
}
