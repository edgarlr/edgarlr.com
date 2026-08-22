import { defineConfig, globalIgnores } from 'eslint/config'
import next from 'eslint-config-next'
import prettier from 'eslint-config-prettier/flat'

export default defineConfig([
  globalIgnores(['.next/**', 'out/**']),
  next,
  prettier,
])
