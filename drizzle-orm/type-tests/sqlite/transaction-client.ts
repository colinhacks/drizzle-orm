import type { SqliteClient } from '@effect/sql-sqlite-node/SqliteClient';
import type { Client, Transaction } from '@libsql/client';
import type { Database } from 'better-sqlite3';
import * as Effect from 'effect/Effect';
import type { DatabaseSync } from 'node:sqlite';
import { type Equal, Expect } from 'type-tests/utils.ts';
import type { BetterSQLite3Database } from '~/better-sqlite3/index.ts';
import type { EffectSQLiteNodeDatabase } from '~/effect-sqlite-node/index.ts';
import type { LibSQLDatabase } from '~/libsql/index.ts';
import type { NodeSQLiteDatabase } from '~/node-sqlite/index.ts';

{
	const db = {} as BetterSQLite3Database & { $client: Database };
	db.transaction((tx) => {
		Expect<Equal<typeof tx.$client, Database>>;
		tx.transaction((sp) => {
			Expect<Equal<typeof sp.$client, Database>>;
		});
	});
	// @ts-expect-error - sync drivers still refuse an async callback
	db.transaction(async () => {});
}

{
	const db = {} as NodeSQLiteDatabase & { $client: DatabaseSync };
	db.transaction((tx) => {
		Expect<Equal<typeof tx.$client, DatabaseSync>>;
	});
}

{
	const db = {} as LibSQLDatabase & { $client: Client };
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, Transaction>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, Transaction>>;
		});
	});
}

{
	const db = {} as EffectSQLiteNodeDatabase;
	db.transaction((tx) =>
		Effect.sync(() => {
			Expect<Equal<typeof tx.$client, SqliteClient>>;
		})
	);
}
