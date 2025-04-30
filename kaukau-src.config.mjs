import { defineConfig } from 'kaukau/config'

export default defineConfig({
  enableLogs: true,
  exitOnFail: true,
  files: 'test/src',
  ext: '.test.ts',
  options: {
    bail: false,
    fullTrace: true,
    grep: '',
    ignoreLeaks: false,
    reporter: 'spec',
    retries: 0,
    slow: 100,
    timeout: 2000,
    ui: 'bdd',
    color: true,
  }
})
