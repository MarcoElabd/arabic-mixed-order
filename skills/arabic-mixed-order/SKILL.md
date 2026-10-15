---
name: arabic-mixed-order
description: >-
  Keeps Arabic clause order when a paragraph also contains English words.
  Use when writing Arabic mixed with Latin words, identifiers, or product
  names in a Cursor desktop chat reply, so the words before an English word
  stay before it and the words after it stay after it.
---

# Arabic mixed order

The Cursor desktop chat lays text out left to right. One English word splits an Arabic paragraph into two runs, and the run before that word is drawn after it.

## When this applies

Apply this to every user-visible paragraph that contains both Arabic letters and Latin letters.

Do not wrap a paragraph that is only Arabic. Do not wrap a paragraph or code block that is only English. Do not edit the existing arabic plugin.

## How to write the paragraph

1. Write the words in normal logical order. Do not reverse letters and do not run a shaper.
2. Make the first character of that paragraph U+2067.
3. Make the last character of that paragraph U+2069.

## Example

Logical sentence:

عنوان الشات بقى BIM Work and Apps، والشغل هنا هيبقى خاص بـ BIM: النمذجة، التطبيقات، وسير العمل.

Surround that whole paragraph with U+2067 and U+2069. Do not use U+202B or U+202C.
