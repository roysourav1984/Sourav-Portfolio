#!/usr/bin/env node
process.env.VITEST_ENV = 'node';
require('tsx').default(['scripts/vitest-runner.ts']);
