import type { Connection, PoolConnection } from 'mysql2/promise';
import { type Equal, Expect } from 'type-tests/utils.ts';
import type { SingleStoreDriverDatabase } from '~/singlestore/index.ts';

{
	const db = {} as SingleStoreDriverDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PoolConnection | Connection>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, PoolConnection | Connection>>;
		});
	});
}
