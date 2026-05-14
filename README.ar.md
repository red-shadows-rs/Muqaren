<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/public/favicon.svg">
    <img alt="مقارن" src="src/public/favicon.svg" width="96" height="96">
  </picture>
</p>

<h1 align="center">مقارن</h1>

<p align="center">
  <strong>منصة مقارنة أسعار الفنادق — قارن بين أجودا وبوكينج فوراً</strong>
</p>

<p align="center">
  <a href="https://github.com/red-shadows-rs/Muqaren/blob/main/README.md">English</a>
  &nbsp;&bull;&nbsp;
  <a href="#-المميزات">المميزات</a>
  &nbsp;&bull;&nbsp;
  <a href="#-التقنيات-المستخدمة">التقنيات</a>
  &nbsp;&bull;&nbsp;
  <a href="#-بدء-الاستخدام">بدء الاستخدام</a>
  &nbsp;&bull;&nbsp;
  <a href="#-هيكل-المشروع">الهيكل</a>
  &nbsp;&bull;&nbsp;
  <a href="#-المساهمة">المساهمة</a>
  &nbsp;&bull;&nbsp;
  <a href="#-الترخيص">الترخيص</a>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/الإصدار-1.0.0-2563eb?style=for-the-badge" alt="الإصدار 1.0.0">
  <img src="https://img.shields.io/badge/الترخيص-MIT-10b981?style=for-the-badge" alt="ترخيص MIT">
  <img src="https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js 5">
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 20">
  <img src="https://img.shields.io/badge/Playwright-1-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/EJS-قوالب-b4ca65?style=for-the-badge&logo=ejs&logoColor=white" alt="EJS">
</p>

<br/>

---

## لماذا مقارن؟

البحث عن أفضل سعر فندق عبر منصات حجز متعددة يستغرق وقتاً طويلاً. مقارن يحل هذه المشكلة بالبحث في أجودا وبوكينج في وقت واحد، مع عرض النتائج في واجهة عربية أنيقة. لا مزيد من التنقل بين التبويبات — قارن الأسعار جنباً إلى جنب في ثوانٍ.

- **تصميم عربي أولاً** — تخطيط كامل من اليمين لليسار، خط القاهرة، تسميات عربية، وتقويم متوافق هجرياً
- **بحث ثنائي المزودين** — أجودا (Playwright) + بوكينج (Axios/Cheerio) في طلب واحد
- **استخراج مباشر** — بيانات أسعار حية، غير مخزنة أو قديمة
- **خفيف الوزن** — Express.js 5 مع قوالب EJS، اعتماديات بسيطة

---

## ✨ المميزات

<table>
  <tr>
    <td width="50%">
      <h3>🔍 البحث</h3>
      <ul>
        <li><strong>متعدد المزودين</strong> — بحث في أجودا وبوكينج في وقت واحد</li>
        <li><strong>إدخال ذكي للوجهة</strong> — حقل وجهة جاهز للإكمال التلقائي</li>
        <li><strong>تقويم مخصص</strong> — أسماء أشهر عربية، اختصارات أيام هجرية</li>
        <li><strong>أدوات الغرف والنزلاء</strong> — محددات ديناميكية للغرف والبالغين والأطفال</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📊 النتائج</h3>
      <ul>
        <li><strong>مقارنة جنباً إلى جنب</strong> — عرض نتائج أجودا وبوكينج معاً</li>
        <li><strong>عرض الأسعار</strong> — عملة درهم إماراتي مع تفصيل الضرائب والرسوم</li>
        <li><strong>تفاصيل الفندق</strong> — صور، أوصاف، مواقع، ومسافات</li>
        <li><strong>روابط مباشرة</strong> — وصول بنقرة واحدة لصفحات الحجز</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 تجربة المستخدم</h3>
      <ul>
        <li><strong>العربية أولاً</strong> — تخطيط RTL كامل مع خط القاهرة</li>
        <li><strong>تصميم متجاوب</strong> — محسّن للجوال، الجهاز اللوحي، والحاسوب</li>
        <li><strong>أيقونات Font Awesome</strong> — أيقونات نظيفة في كل الأنحاء</li>
        <li><strong>صفحات أخطاء</strong> — صفحات 404 و 500 مخصصة بالعربية</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🛠️ البنية</h3>
      <ul>
        <li><strong>نمط MVC</strong> — متحكمات، مسارات، خدمات، وواجهات</li>
        <li><strong>خدمات معيارية</strong> — مستخلصات مستقلة لكل مزود</li>
        <li><strong>قوالب EJS</strong> — عرض من جانب الخادم مع بيانات ديناميكية</li>
        <li><strong>إعدادات البيئة</strong> — dotenv للمنفذ والإعدادات</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 التقنيات المستخدمة

| الفئة           | التقنية                                                                             | الغرض                 |
| --------------- | ----------------------------------------------------------------------------------- | --------------------- |
| **الإطار**      | [Express.js 5](https://expressjs.com/)                                              | خادم الويب            |
| **بيئة التشغيل** | [Node.js 20](https://nodejs.org/)                                                  | بيئة JavaScript       |
| **القوالب**     | [EJS](https://ejs.co/)                                                              | واجهات الخادم         |
| **الاستخراج**   | [Playwright](https://playwright.dev/) + [Cheerio](https://cheerio.js.org/)          | أجودا وبوكينج         |
| **HTTP**        | [Axios](https://axios-http.com/)                                                    | طلبات بوكينج          |
| **التحليل**     | [body-parser](https://github.com/expressjs/body-parser)                             | بيانات النماذج        |
| **الإعدادات**   | [dotenv](https://github.com/motdotla/dotenv)                                        | متغيرات البيئة        |
| **الأيقونات**   | [Font Awesome 6](https://fontawesome.com/)                                          | أيقونات الواجهة       |
| **الخطوط**      | [Cairo](https://fonts.google.com/specimen/Cairo)                                    | الطباعة العربية       |

---

## 📦 بدء الاستخدام

### المتطلبات الأساسية

- **Node.js** >= 20
- **npm** >= 10

### البدء السريع

```bash
git clone https://github.com/red-shadows-rs/Muqaren.git
cd muqaren
npm install
cp .env.example .env
npm start
```

افتح [http://localhost:3000](http://localhost:3000) في متصفحك.

### متغيرات البيئة

| المتغير | مطلوب | الافتراضي | الوصف        |
| ------- | ----- | --------- | ------------ |
| `PORT`  | لا    | `3000`    | منفذ الخادم  |

---

## 📁 هيكل المشروع

```
Muqaren/
├── src/
│   ├── controllers/            # معالجات المسارات
│   │   ├── mainController.js   # متحكم الصفحة الرئيسية
│   │   └── searchController.js # متحكم منطق البحث
│   ├── middlewares/            # وسائط Express
│   ├── public/                 # الأصول الثابتة
│   │   ├── assets/             # الصور والأيقونات
│   │   ├── javascripts/        # JavaScript للعميل
│   │   └── stylesheets/        # ملفات CSS
│   ├── routes/                 # مسارات Express
│   │   ├── mainRouter.js       # مسارات الصفحة الرئيسية
│   │   └── searchRouter.js     # مسارات API البحث
│   ├── services/               # مستخلصات المزودين
│   │   ├── agodaService.js     # أجودا (Playwright)
│   │   └── bookingService.js   # بوكينج (Axios + Cheerio)
│   ├── views/                  # قوالب EJS
│   │   ├── mainPage.ejs        # الصفحة الرئيسية مع البحث
│   │   ├── searchPage.ejs      # صفحة نتائج البحث
│   │   └── errorPage.ejs       # صفحات الأخطاء (404/500)
│   └── index.js                # نقطة دخول التطبيق
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
├── README.md
├── README.ar.md
├── .env.example
└── package.json
```

---

## 🗺️ خارطة الطريق

- [ ] واجهة مقارنة النتائج جنباً إلى جنب
- [ ] مزودين إضافيين (Expedia، Hotels.com)
- [ ] سجل الأسعار وتتبع الاتجاهات
- [ ] حسابات مستخدمين وبحوث محفوظة
- [ ] إعداد نشر Docker
- [ ] اختبارات الوحدة والتكامل

---

## 🤝 المساهمة

نرحب بالمساهمات. يرجى قراءة [دليل المساهمة](./CONTRIBUTING.md) و[مدونة السلوك](./CODE_OF_CONDUCT.md) قبل تقديم طلب سحب.

1. قم بعمل fork للمستودع
2. أنشئ فرعاً للميزة (`git checkout -b feature/ميزة-رائعة`)
3. قم بعمل commit للتغييرات (`git commit -m 'Muqaren | vX.Y.Z | إضافة ميزة رائعة'`)
4. ادفع إلى الفرع (`git push origin feature/ميزة-رائعة`)
5. افتح طلب سحب (Pull Request)

---

## 🔒 الأمان

للإبلاغ عن ثغرة أمنية، يرجى اتباع [سياسة الأمان](./SECURITY.md) الخاصة بنا. لا تفتح مشكلة عامة.

---

## 📝 سجل التغييرات

اطلع على [CHANGELOG.md](./CHANGELOG.md) لسجل مفصل بالإصدارات. يتبع هذا المشروع [الإصدارات الدلالية](https://semver.org/).

| الإصدار   | التاريخ    | أبرز المميزات                                                        |
| --------- | ---------- | -------------------------------------------------------------------- |
| **1.0.0** | 2026-05-15 | إصدار أولي: مقارنة أجودا وبوكينج، واجهة عربية                        |

---

## 📄 الترخيص

هذا المشروع مرخص تحت [رخصة MIT](./LICENSE).

---

## 👤 المؤلف

**SHADOW_x7 — RED SHADOWS | RS**

---

<p align="center">
  <sub>بُني بـ ❤️ من قبل <a href="https://github.com/red-shadows-rs">RED SHADOWS | RS</a></sub>
</p>