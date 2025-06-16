import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import slugify from 'slugify';
import fetch from 'node-fetch'; // npm install node-fetch
import OpenAI from 'openai';
const PIXABAY_API_KEY = "50854526-b653f2709cc61ca4df8d0da29";


async function fetchPixabayImageData(query) {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=true&per_page=5&order=popular&orientation=horizontal`;
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

async function generateBlogPost(topic) {
    console.log('Calling OpenAI with topic:', topic);
    const openai = new OpenAI({
        apiKey: "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",
    });
    const pixabayData = await fetchPixabayImageData(topic);
    console.log('Fetched image data:', pixabayData);

    const promptTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{title}}</title>
<link rel="stylesheet" href="styles.css" />
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
</head>
<body>

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

    // Generate full blog content from OpenAI
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
            role: 'user',
            content: `Write a detailed SEO-friendly blog post about "${topic}" in HTML format with paragraphs and headings only. Include a controversial opinion paragraph. Include a bulleted list of relevant links at the bottom of the blog post.`
        }],
    });

    let fullContent = completion.choices[0].message.content;

    // Strip markdown triple backticks and optional html fences
    fullContent = fullContent
        .replace(/^```html\s*/, '')
        .replace(/^```\s*/, '')
        .replace(/```$/, '')
        .trim();
    // Remove trailing AI summary text after the last closing </html> tag (if HTML)
    const htmlEndIndex = fullContent.lastIndexOf('</html>');
    if (htmlEndIndex !== -1) {
        fullContent = fullContent.slice(0, htmlEndIndex + 7).trim(); // 7 = length of "</html>"
    } else {
        // Alternatively, try trimming after last paragraph close if you don't have full HTML
        const lastParagraphIndex = fullContent.lastIndexOf('</p>');
        if (lastParagraphIndex !== -1) {
            fullContent = fullContent.slice(0, lastParagraphIndex + 4).trim();
        }
    }
    // Extract first paragraph and the rest
    const firstParaMatch = fullContent.match(/<p>.*?<\/p>/i);
    let firstParagraph = '', remainingContent = '';
    if (firstParaMatch) {
        firstParagraph = firstParaMatch[0];
        remainingContent = fullContent.replace(firstParaMatch[0], '');
    } else {
        firstParagraph = fullContent;
        remainingContent = '';
    }
    const attributionHtml = pixabayData.user
        ? `<p style="font-size:0.8rem; color:#666; margin-top: 3rem;">
       Image courtesy of
       <a href="${pixabayData.userProfile}" target="_blank" rel="noopener noreferrer">${pixabayData.user}</a> on
       <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">Pixabay</a>.
     </p>`
        : '';
    // Fill in the template
    const filledHtml = promptTemplate
        .replace(/{{title}}/g, topic)
        .replace(/{{firstParagraph}}/g, firstParagraph)
        .replace(/{{remainingContent}}/g, remainingContent)
        .replace(/{{imageUrl}}/g, pixabayData.imageUrl)
        .replace(/{{attribution}}/g, attributionHtml);

    return filledHtml;
}

async function main() {
    const topic = process.argv.slice(2).join(' ');
    if (!topic) {
        console.error('Usage: node generate-blog.js "<topic>"');
        process.exit(1);
    }

    try {
        const htmlContent = await generateBlogPost(topic);
        const filename = slugify(topic, { lower: true, strict: true }) + '.html';
        const blogPath = path.join(process.cwd(), 'blog', filename);

        fs.writeFileSync(blogPath, htmlContent, 'utf8');
        console.log('Blog post saved to', blogPath);

        execSync(`git add "${blogPath}"`);
        execSync(`git commit -m "Add blog post about ${topic}"`);
        execSync('git push');
        console.log('Changes pushed to GitHub');

        // Run the index updater script to refresh blog.html
        console.log('Running update-blog-index.js...');
        execSync('node update-blog-index.js', { stdio: 'inherit' });
        execSync('git add blog/index.html');
        execSync('git commit -m "Update blog index with new article"');
        execSync('git push');
        console.log('Blog index updated and pushed.');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();