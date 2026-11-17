import type { MysqlClient } from '@effect/sql-mysql2/MysqlClient';
import type { Transaction as PlanetScaleTransaction } from '@planetscale/database';
import type { Tx } from '@tidbcloud/serverless';
import * as Effect from 'effect/Effect';
import type { Connection, Pool, PoolConnection } from 'mysql2/promise';
import { type Equal, Expect } from 'type-tests/utils.ts';
import type { EffectMysql2Database } from '~/effect-mysql2/index.ts';
import type { MySql2Database } from '~/mysql2/index.ts';
import type { PlanetScaleDatabase } from '~/planetscale-serverless/index.ts';
import type { TiDBServerlessDatabase } from '~/tidb-serverless/index.ts';

{
	const db = {} as MySql2Database & { $client: Pool };
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PoolConnection | Connection>>;
		await tx.transaction(async (sp) => {
			Expect<Equal<typeof sp.$client, PoolConnection | Connection>>;
		});
	});
}

{
	const db = {} as PlanetScaleDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, PlanetScaleTransaction>>;
	});
}

{
	const db = {} as TiDBServerlessDatabase;
	db.transaction(async (tx) => {
		Expect<Equal<typeof tx.$client, Tx>>;
	});
}

{
	const db = {} as EffectMysql2Database;
	db.transaction((tx) =>
		Effect.sync(() => {
			Expect<Equal<typeof tx.$client, MysqlClient>>;
		})
	);
}
