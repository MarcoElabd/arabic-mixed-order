# ترتيب الجملة المختلطة — Arabic mixed order

يبقي ترتيب الجملة العربية ثابتًا في شات Cursor على سطح المكتب لما الفقرة فيها كلمة إنجليزية.
Keeps Arabic clause order in the Cursor desktop chat when a paragraph also contains an English word.

الكلمة الإنجليزية بتقسم الجملة، والشات بيرسم من الشمال لليمين، فالكلام اللي قبل الكلمة بيتبدل مع الكلام اللي بعدها. الإضافة بتطلب من الوكيل يلف الفقرة بعلامتين:
An English word splits the sentence, and the chat draws from left to right, so the words before that word swap with the words after it. The plugin tells the agent to wrap the paragraph with two marks:

- `U+2067` في أول الفقرة
  at the start of the paragraph
- `U+2069` في آخر الفقرة
  at the end of the paragraph

الفقرة العربية فقط، أو الإنجليزية فقط، أو بلوك الكود الإنجليزي، تفضل من غير العلامتين. الإضافة لا تغيّر إضافة arabic الموجودة.
A paragraph that is only Arabic, only English, or an English code block stays unwrapped. This plugin does not change the existing arabic plugin.

## التثبيت / Install

1. من الشريط الجانبي افتح **Customize**.
   Open **Customize** in the sidebar.
2. اختر **From GitHub Repository** والصق المستودع:
   Choose **From GitHub Repository** and paste the repository:

   ```text
   MarcoElabd/arabic-mixed-order
   ```

3. ثبّت إضافة **arabic-mixed-order** على نطاق **user**.
   Install the **arabic-mixed-order** plugin at **user** scope.
4. ابدأ محادثة Agent جديدة. القاعدة لا تُضاف إلى محادثة مفتوحة من قبل.
   Start a new Agent chat. The rule is not added to a chat that is already open.

للتجربة المحلية انسخ المستودع إلى `~/.cursor/plugins/local/arabic-mixed-order` ثم أعد تحميل النافذة من **Developer: Reload Window**.
To try it locally, copy the repository to `~/.cursor/plugins/local/arabic-mixed-order`, then run **Developer: Reload Window**.

## ماذا يفعل / What it does

التعليمات في `rules/mixed-order.mdc` وتُطبَّق دائمًا. عند بداية الجلسة وقبل إرسال الرسالة يعيد `hooks/arabic-mixed-order.mjs` نفس النص إلى Cursor.
The instructions live in `rules/mixed-order.mdc` and always apply. At session start, and before a prompt is submitted, `hooks/arabic-mixed-order.mjs` sends the same text to Cursor.

ده لشات البرنامج فقط. لا يغيّر الكتابة داخل مربع الإرسال، ولا يشغّل تشكيل حروف الـ CLI.
This is for the desktop chat only. It does not change text in the input box, and it does not run the CLI shaper.

## الاختبارات / Tests

```powershell
node --test hooks/*.test.mjs
```

## الرخصة / License

MIT — انظر [LICENSE](LICENSE).
MIT — see [LICENSE](LICENSE).
