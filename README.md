# arabic-mixed-order

يبقي ترتيب الجملة العربية ثابتًا في شات Cursor على سطح المكتب لما يكون فيها كلمة إنجليزية.

الكلمة الإنجليزية بتقسم الجملة، والشات بيرسم من الشمال لليمين، فالكلام اللي قبل الكلمة بيتبدل مع الكلام اللي بعدها. السكربت بيطلب من الوكيل يلف الفقرة بعلامتين:

- `U+2067` في أول الفقرة
- `U+2069` في آخر الفقرة

ده لشات البرنامج فقط. لا يغيّر الكتابة داخل مربع الإرسال، ولا يغيّر agent الطرفية.

## التثبيت

1. انسخ `hooks/arabic-mixed-order.mjs` إلى `%USERPROFILE%\.cursor\hooks\`.
2. ادمج محتوى `hooks.example.json` داخل `%USERPROFILE%\.cursor\hooks.json`. لو الملف موجود، أضف نفس الأمرين تحت `sessionStart` و `beforeSubmitPrompt` من غير ما تمسح الخطافات التانية.
3. افتح جلسة شات جديدة.

## Install

1. Copy `hooks/arabic-mixed-order.mjs` to `%USERPROFILE%\.cursor\hooks\`.
2. Merge `hooks.example.json` into `%USERPROFILE%\.cursor\hooks.json`. Keep any hooks already there.
3. Start a new desktop chat.
