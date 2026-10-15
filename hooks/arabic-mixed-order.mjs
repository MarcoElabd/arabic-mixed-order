// Desktop chat only. Does not modify the existing arabic plugin.
// An English word splits an Arabic paragraph, and the clause before that word
// is drawn after it. U+2067 ... U+2069 keeps the paragraph right-to-left.

const chunks = []
for await (const chunk of process.stdin) chunks.push(chunk)
const raw = Buffer.concat(chunks.map((c) => (typeof c === 'string' ? Buffer.from(c) : c))).toString('utf8')

let input = {}
try {
  input = JSON.parse(raw || '{}')
} catch {
  input = {}
}

const additional_context = [
  'Mixed Arabic order: when one paragraph contains Arabic letters and Latin letters, the Cursor desktop chat swaps the Arabic clause before a Latin word with the clause after it.',
  'Write that paragraph in normal logical order. Do not shape it and do not reverse its letters.',
  'Put U+2067 at the first character of the paragraph and U+2069 at the last character.',
  'Leave a paragraph that is only Arabic, or only English, unwrapped. Leave an English-only code block unwrapped.',
  'Do not edit the existing arabic plugin.',
].join('\n')

const isPrompt = input.hook_event_name === 'beforeSubmitPrompt' || typeof input.prompt === 'string'
const output = isPrompt ? { continue: true, additional_context } : { additional_context }
process.stdout.write(`${JSON.stringify(output)}\n`)
