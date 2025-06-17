// generate-blog.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import slugify from 'slugify';
import fetch from 'node-fetch';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
if (!process.env.OPENAI_API_KEY || !PIXABAY_API_KEY) {
    console.error('⚠️  Make sure OPENAI_API_KEY and PIXABAY_API_KEY are set in .env');
    process.exit(1);
}

// ———— PIXABAY helper ————
async function fetchPixabayImageData(query) {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`
        + `&q=${encodeURIComponent(query)}`
        + `&image_type=photo&safesearch=true&per_page=5`
        + `&order=popular&orientation=horizontal`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
        const image = data.hits[Math.floor(Math.random() * data.hits.length)];
        return {
            imageUrl: image.largeImageURL,
            user: image.user,
            userProfile: `https://pixabay.com/users/${image.user}-${image.user_id}/`,
            userImageURL: image.userImageURL
        };
    }
    // fallback
    return {
        imageUrl: 'https://picsum.photos/800/400',
        user: null,
        userProfile: null,
        userImageURL: null
    };
}

// ———— generate one post ————
async function generateBlogPost(topic) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const pixabayData = await fetchPixabayImageData(topic);
    const slug = slugify(topic, { lower: true, strict: true });
    const datePublished = new Date().toISOString().split('T')[0];
    const fullTitle = `What’s the Deal?: ${topic}`;

    const promptTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PVBXGZ7Q');</script>
<!-- End Google Tag Manager -->

<title>{{title}}</title>
<link rel="stylesheet" href="styles.css" />
<meta name="description" content="{{description}}" />
<style>
  body { font-family: sans-serif; margin: 0; background-color: #f5f5fa; color: #222; }
  .header { background: #1e1e1e; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
  .header a { color: white; text-decoration: none; border: 1px solid white; padding: 4px 10px; border-radius: 4px; font-size: 0.9rem; }
  .page-wrapper { display: flex; max-width: 960px; margin: 2rem auto; gap: 1rem; }
  .container { flex: 1; padding: 1rem; background: white; box-shadow: 0 0 5px rgba(0,0,0,0.05); }
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .header h2 { color: white !important;}
  .date { font-size: 0.9rem; color: #888; margin-bottom: 1.5rem; }
  .ad-slot { margin: 2rem 0; text-align: center; }
  .sidebar-ad { width: 300px; position: sticky; top: 2rem; align-self: flex-start; background: white; box-shadow: 0 0 5px rgba(0,0,0,0.05); border-radius: 8px; padding: 0.5rem 0; min-height: 250px; text-align: center; }
  #sticky-footer { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 468px; height: 60px; background: transparent; z-index: 9999; text-align: center; box-shadow: 0 -2px 6px rgba(0,0,0,0.15); border-radius: 8px 8px 0 0; }
  .footer-link { text-align: left; margin-top: 2rem; }
  .footer-link a { color: #1e1e1e; text-decoration: underline; }
</style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "description": "{{description}}",
  "image": "{{imageUrl}}",
  "url": "https://metrixcalculator.com/blog/{{slug}}",
  "datePublished": "{{datePublished}}",
  "author": {
    "@type": "Person",
    "name": "Metrix Blog"
  }
}
</script>

  <!-- CANONICAL URL: outside the JSON-LD script -->
  <link rel="canonical" href="https://metrixcalculator.com/blog/{{slug}}" />

</head>
<body>
        <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVBXGZ7Q"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

  <div class="header">
    <h2>Metrix Blog</h2>
    <a href="/">Back to Calculator</a>
  </div>

      <!-- Top Leaderboard Ad -->
    <div class="top-banner-ad">
        <div class="ad-slot" id="atContainer-60218279d99f5ceeda7adba3fdd7c83a"></div>
        <script type="text/javascript">
            if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
            atAsyncOptions.push({
                'key': '60218279d99f5ceeda7adba3fdd7c83a',
                'format': 'js',
                'async': true,
                'container': 'atContainer-60218279d99f5ceeda7adba3fdd7c83a',
                'params': {}
            });
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.async = true;
            script.src = 'https' + '://www.highperformanceformat.com/60218279d99f5ceeda7adba3fdd7c83a/invoke.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        </script>
    </div>

  <div class="page-wrapper">

    <div class="container">

        <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">
            <a href="https://www.profitableratecpm.com/zkupn3qrp?key=36a541d23de77f6fb879cd3f33309c4d" target="_blank" rel="noopener noreferrer">
            Learn more here
            </a>
        </p>

      <h1>{{title}}</h1>
      <div class="date">Published June 2025</div>

      <!-- Blog Image -->
      <img src="{{imageUrl}}" alt="Image related to {{title}}" style="width:100%; margin:1rem 0; border-radius:12px;" />

      <!-- First paragraph -->
      {{firstParagraph}}
      

        <!--  start 300x250 -->
        <div class="ad-slot" id="atContainer-90b09ebfb759ea63f8e3e872f27804d9"></div>
        <script type="text/javascript">
            if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
            atAsyncOptions.push({
                'key': '90b09ebfb759ea63f8e3e872f27804d9',
                'format': 'js',
                'async': true,
                'container': 'atContainer-90b09ebfb759ea63f8e3e872f27804d9',
                'params': {}
            });
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.async = true;
            script.src = 'https' + '://www.highperformanceformat.com/90b09ebfb759ea63f8e3e872f27804d9/invoke.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        </script>
        <!--  end 300x250 -->

      <!-- Remaining content -->
      {{remainingContent}}

      <div class="footer-link">
        <a href="../blog/">← Browse more articles</a>
      </div>
        <!-- Pixabay Attribution -->
      {{attribution}}
    </div>

    <aside class="sidebar-ad">
      <!-- Native ad -->
      <div id="container-9b73c7751896d7cce1136982fd030b54" style="width: 300px; height: 250px;"></div>
      <script async data-cfasync="false" src="//pl26912764.profitableratecpm.com/9b73c7751896d7cce1136982fd030b54/invoke.js"></script>
    </aside>

  </div>

            <!--  start 468x60 -->
            <div class="ad-slot" id="atContainer-507dbf7941144ad29e081c012beec202"></div>
            <script type="text/javascript">
                if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
                atAsyncOptions.push({
                    'key': '507dbf7941144ad29e081c012beec202',
                    'format': 'js',
                    'async': true,
                    'container': 'atContainer-507dbf7941144ad29e081c012beec202',
                    'params': {}
                });
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.async = true;
                script.src = 'https' + '://www.highperformanceformat.com/507dbf7941144ad29e081c012beec202/invoke.js';
                document.getElementsByTagName('head')[0].appendChild(script);
            </script>
            <!--  end 468x60 -->

</body>
</html>
`;

    // 1) Call OpenAI…
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are an expert SEO copywriter and HTML formatter.' },
            { role: 'user', content: `Write a detailed SEO-friendly blog post about "${topic}" in HTML format. Include a list of 3-5 relevant links at the bottom of the blog. Aim for a minimum of 500 words…` }
        ]
    });

    // 2) Grab and clean raw HTML
    let fullContent = completion.choices[0].message.content
        .replace(/^```html\s*/, '')
        .replace(/^```\s*/, '')
        .replace(/```$/, '')
        .trim();

    // 3) Drop AI commentary before the first HTML tag
    fullContent = fullContent
        .replace(/^[\s\S]*?(?=<)/, '')
        .trim();

    // 4) Strip any nested <html>…<body> wrappers
    fullContent = fullContent
        .replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '')
        .replace(/<\/body>[\s\S]*<\/html>/i, '')
        .trim();
    // 5) Now fall back to your existing “trim after </html> or </p>” logic
    const htmlEnd = fullContent.lastIndexOf('</html>');
    if (htmlEnd !== -1) {
        fullContent = fullContent.slice(0, htmlEnd + 7).trim();
    } else {
        const pEnd = fullContent.lastIndexOf('</p>');
        if (pEnd !== -1) {
            fullContent = fullContent.slice(0, pEnd + 4).trim();
        }
    }

    // extract first paragraph
    const firstParaMatch = fullContent.match(/<p>.*?<\/p>/i) || [];
    const firstParagraph = firstParaMatch[0] || '';
    const remainingContent = firstParagraph
        ? fullContent.replace(firstParaMatch[0], '')
        : fullContent;
    const rawText = firstParagraph.replace(/<[^>]+>/g, '').trim();
    const description = rawText.length > 155
        ? rawText.slice(0, 152).trim() + '…'
        : rawText;

    // Pixabay attribution
    const attributionHtml = pixabayData.user
        ? `<p style="font-size:0.8rem; color:#666; margin-top: 3rem;">
       Image courtesy of
       <a href="${pixabayData.userProfile}" target="_blank" rel="noopener noreferrer">${pixabayData.user}</a> on
       <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">Pixabay</a>.
     </p>`
        : '';

    // fill in placeholders
    return promptTemplate
        .replace(/{{title}}/g, fullTitle)
        .replace(/{{description}}/g, description)
        .replace(/{{imageUrl}}/g, pixabayData.imageUrl)
        .replace(/{{slug}}/g, slug)
        .replace(/{{datePublished}}/g, datePublished)
        .replace(/{{firstParagraph}}/g, firstParagraph)
        .replace(/{{remainingContent}}/g, remainingContent)
        .replace(/{{attribution}}/g, attributionHtml);
}

// ———— main: loop over topics.txt ————
async function main() {
    const topicsPath = path.join(process.cwd(), 'topics.txt');
    if (!fs.existsSync(topicsPath)) {
        console.error('❌ topics.txt not found.');
        process.exit(1);
    }
    const topics = fs.readFileSync(topicsPath, 'utf8')
        .split(/\r?\n/)
        .map(l => l.trim().replace(/^"|"$/g, ''))
        .filter(Boolean);

    if (!topics.length) {
        console.error('❌ No topics in topics.txt.');
        process.exit(1);
    }

    console.log(`🔎 Generating ${topics.length} posts…`);
    for (const topic of topics) {
        console.log(`📝 ${topic}`);
        const html = await generateBlogPost(topic);
        const filename = slugify(topic, { lower: true, strict: true }) + '.html';
        const outPath = path.join(process.cwd(), 'blog', filename);
        fs.writeFileSync(outPath, html, 'utf8');
        execSync(`git add "${outPath}"`);
    }

    execSync(`git commit -m "Add blog posts: ${topics.join(', ')}"`);
    execSync('git push');
    console.log('🚀 New posts pushed.');

    console.log('🔄 Updating blog index…');
    execSync('node update-blog-index.js', { stdio: 'inherit' });
    execSync('git add blog/index.html');
    execSync(`git commit -m "Update blog index with new posts"`);
    execSync('git push');
    console.log('✅ Index updated & pushed.');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
