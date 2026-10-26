// Desktop chat only. Does not modify the existing arabic plugin.
// An English word splits an Arabic paragraph, and the clause before that word
// is drawn after it. U+2067 ... U+2069 keeps the paragraph right-to-left.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const chunks = []
for await (const chunk of process.stdin) chunks.push(chunk)
const raw = Buffer.concat(chunks.map((c) => (typeof c === 'string' ? Buffer.from(c) : c))).toString('utf8')

let input = {}
try {
  input = JSON.parse(raw || '{}')
} catch {
  input = {}
}

const here = dirname(fileURLToPath(import.meta.url))
const rule = readFileSync(join(here, '..', 'rules', 'mixed-order.mdc'), 'utf8')
const additional_context = rule.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim()
if (!additional_context) {
  console.error('rules/mixed-order.mdc has an empty body')
  process.exit(1)
}

const isPrompt = input.hook_event_name === 'beforeSubmitPrompt' || typeof input.prompt === 'string'
const output = isPrompt ? { continue: true, additional_context } : { additional_context }
process.stdout.write(`${JSON.stringify(output)}\n`)
