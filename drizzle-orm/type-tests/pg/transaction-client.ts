import type { PgClient } from '@effect/sql-pg/PgClient';
import type { Transaction as PgliteTransaction } from '@electric-sql/pglite';
import type { Client as NeonClient, PoolClient as NeonPoolClient } from '@neondatabase/serverless';
import type { VercelClient, VercelPoolClient } from '@vercel/postgres';
import * as Effect from 'effect/Effect';
import type { Client, Pool, PoolClient } from 'pg';
import type { Sql, TransactionSql } from 'postgres';
import { type Equal, Expect } from 'type-tests/utils.ts';
import type { EffectPgDatabase } from '~/effect-postgres/index.ts';
import type { NeonDatabase } from '~/neon-serverless/index.ts';
import type { NodePgDatabase } from '~/node-postgres/index.ts';
import type { PgliteDatabase } from '~/pglite/index.ts';
import type { PostgresJsDatabase } from '~/postgres-js/index.ts';
import type { PostgresAuroraClient, PostgresAuroraDatabase } from '~/postgres/aurora/index.ts';
import type { Connection, Pool as PostgresPool, PostgresDatabase } from '~/postgres/index.ts';
import type { VercelPgDatabase } from '~/vercel-postgres/index.ts';

{
	const db = {} as NodePgDatabase & { $client: Pool };
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PoolClient | Client>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, PoolClient | Client>>;
		});
	});
}

{
	const db = {} as PostgresJsDatabase & { $client: Sql };
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, TransactionSql>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, TransactionSql>>;
		});
	});
}

{
	const db = {} as PgliteDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PgliteTransaction>>;
	});
}

{
	const db = {} as NeonDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, NeonPoolClient | NeonClient>>;
	});
}

{
	const db = {} as VercelPgDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, VercelPoolClient | VercelClient>>;
	});
}

{
	const db = {} as PostgresDatabase & { $client: PostgresPool };
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, Connection>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, Connection>>;
		});
	});
}

{
	const db = {} as PostgresAuroraDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PostgresAuroraClient>>;
	});
}

{
	const db = {} as EffectPgDatabase;
	db.transaction((tx) =>
		Effect.sync(() => {
			Expect<Equal<typeof tx.$client, PgClient>>;
		})
	);
}
