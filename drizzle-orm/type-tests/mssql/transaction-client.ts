import type { Transaction } from 'mssql';
import { type Equal, Expect } from 'type-tests/utils.ts';
import type { NodeMsSqlDatabase } from '~/node-mssql/index.ts';

{
	const db = {} as NodeMsSqlDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, Transaction>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, Transaction>>;
		});
	});
}
