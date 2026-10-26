import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'))

test('manifest points at the rule and the hook file', () => {
  const plugin = readJson('.cursor-plugin/plugin.json')
  assert.equal(plugin.name, 'arabic-mixed-order')
  assert.equal(plugin.rules, './rules/')
  assert.equal(plugin.hooks, './hooks/hooks.json')
  assert.equal(plugin.license, 'MIT')
  assert.match(plugin.version, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/)
})

test('marketplace installs the root plugin', () => {
  const market = readJson('.cursor-plugin/marketplace.json')
  assert.equal(market.plugins.length, 1)
  assert.equal(market.plugins[0].name, 'arabic-mixed-order')
  assert.equal(market.plugins[0].source, '.')
})

test('mixed-order rule is always applied', () => {
  const raw = readFileSync(join(root, 'rules', 'mixed-order.mdc'), 'utf8')
  assert.match(raw, /^---\r?\n[\s\S]*?alwaysApply:\s*true[\s\S]*?\r?\n---/)
  for (const line of [
    'Put U+2067 at the first character of that paragraph and U+2069 at the last character.',
    'One pair covers the whole paragraph.',
    'however many Latin words it has.',
    'Do not wrap a Latin word in backticks, bold, or a link.',
    'A reply with several mixed paragraphs needs one pair per paragraph, including the first.',
    'Do not use U+202B or U+202C.',
    'Leave a paragraph that is only Arabic, or only English, unwrapped.',
    'Do not edit the existing arabic plugin.',
    'Do not run shape.mjs.',
  ]) {
    assert.ok(raw.includes(line), line)
  }
})

test('hooks run on session start and before submit', () => {
  const hooks = readJson('hooks/hooks.json')
  assert.equal(hooks.version, 1)
  assert.equal(hooks.hooks.sessionStart[0].command, 'node ./hooks/arabic-mixed-order.mjs')
  assert.equal(hooks.hooks.beforeSubmitPrompt[0].command, 'node ./hooks/arabic-mixed-order.mjs')
})

test('sessionStart emits the rule body', async () => {
  const raw = readFileSync(join(root, 'rules', 'mixed-order.mdc'), 'utf8')
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim()
  const child = spawn(process.execPath, [join(root, 'hooks', 'arabic-mixed-order.mjs')], {
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  let out = ''
  let err = ''
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')
  child.stdout.on('data', (chunk) => { out += chunk })
  child.stderr.on('data', (chunk) => { err += chunk })
  child.stdin.end(JSON.stringify({ session_id: 'desktop', hook_event_name: 'sessionStart' }))
  const code = await new Promise((resolve) => child.on('close', resolve))
  assert.equal(err, '')
  assert.equal(code, 0)
  const parsed = JSON.parse(out)
  assert.equal(parsed.additional_context, body)
  assert.equal(parsed.continue, undefined)
})

test('beforeSubmitPrompt keeps the prompt and repeats the rule', async () => {
  const child = spawn(process.execPath, [join(root, 'hooks', 'arabic-mixed-order.mjs')], {
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  let out = ''
  child.stdout.setEncoding('utf8')
  child.stdout.on('data', (chunk) => { out += chunk })
  child.stdin.end(JSON.stringify({
    hook_event_name: 'beforeSubmitPrompt',
    prompt: 'اكتب جملة فيها Figma',
  }))
  assert.equal(await new Promise((resolve) => child.on('close', resolve)), 0)
  const parsed = JSON.parse(out)
  assert.equal(parsed.continue, true)
  assert.match(parsed.additional_context, /U\+2067/)
  assert.match(parsed.additional_context, /U\+2069/)
})
