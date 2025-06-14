// generate-blog.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import slugify from 'slugify';
import OpenAI from 'openai';

async function generateBlogPost(topic) {
    console.log('Calling OpenAI with topic:', topic);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // set your key in env variable
    });

    const prompt = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{title}}</title>
<link rel="stylesheet" href="styles.css" />
<style>
  body {
    font-family: sans-serif;
    margin: 0;
    background-color: #f5f5fa;
    color: #222;
  }
  .header {
    background: #1e1e1e;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header a {
    color: white;
    text-decoration: none;
    border: 1px solid white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  .container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  }
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  .date {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1.5rem;
  }
  .ad-slot {
    margin: 2rem 0;
    min-height: 250px;
    text-align: center;
  }
  .footer-link {
    text-align: center;
    margin-top: 2rem;
  }
  .footer-link a {
    color: #1e1e1e;
    text-decoration: underline;
  }
</style>
</head>
<body>
  <div class="header">
    <h2>Metrix Blog</h2>
    <a href="/">Back to Calculator</a>
  </div>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="date">Published June 2025</div>
    <!-- Blog Image -->
    <img src="https://picsum.photos/800/400" alt="Random marketing image" style="width: 100%; margin: 1rem 0; border-radius: 12px;" />
    {{content}}
    <!-- Ad Slot 1 -->
    <div class="ad-slot" id="atContainer-90b09ebfb759ea63f8e3e872f27804d9"></div>
    <script type="text/javascript">
      if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
      atAsyncOptions.push({
        key: '90b09ebfb759ea63f8e3e872f27804d9',
        format: 'js',
        async: true,
        container: 'atContainer-90b09ebfb759ea63f8e3e872f27804d9',
        params: {}
      });
      var script1 = document.createElement('script');
      script1.type = "text/javascript";
      script1.async = true;
      script1.src = 'https://www.highperformanceformat.com/90b09ebfb759ea63f8e3e872f27804d9/invoke.js';
      document.getElementsByTagName('head')[0].appendChild(script1);
    </script>
    <!-- Ad Slot 2 -->
    <div class="ad-slot" id="atContainer-507dbf7941144ad29e081c012beec202"></div>
    <script type="text/javascript">
      if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
      atAsyncOptions.push({
        key: '507dbf7941144ad29e081c012beec202',
        format: 'js',
        async: true,
        container: 'atContainer-507dbf7941144ad29e081c012beec202',
        params: {}
      });
      var script2 = document.createElement('script');
      script2.type = "text/javascript";
      script2.async = true;
      script2.src = 'https://www.highperformanceformat.com/507dbf7941144ad29e081c012beec202/invoke.js';
      document.getElementsByTagName('head')[0].appendChild(script2);
    </script>
    <!-- Ad Slot 3 -->
    <div class="ad-slot" id="atContainer-8fb363dc734c5f02a2ccef7879c7cf31"></div>
    <script type="text/javascript">
      if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
      atAsyncOptions.push({
        key: '8fb363dc734c5f02a2ccef7879c7cf31',
        format: 'js',
        async: true,
        container: 'atContainer-8fb363dc734c5f02a2ccef7879c7cf31',
        params: {}
      });
      var script3 = document.createElement('script');
      script3.type = "text/javascript";
      script3.async = true;
      script3.src = 'https://www.highperformanceformat.com/8fb363dc734c5f02a2ccef7879c7cf31/invoke.js';
      document.getElementsByTagName('head')[0].appendChild(script3);
    </script>
    <div class="footer-link">
      <a href="/blog.html">← Browse more articles</a>
    </div>
  </div>
</body>
</html>
`;

    // Replace placeholders with actual topic and content prompt
    const filledPrompt = prompt
        .replace(/{{title}}/g, topic)
        .replace(/{{content}}/g, `<p>Write a detailed SEO-friendly blog post about "${topic}". Use headings, paragraphs, and natural language.</p>`);

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: filledPrompt }],
    });

    return completion.choices[0].message.content;
}

async function main() {
    console.log('Script started');

    const topic = process.argv.slice(2).join(' ');
    console.log('Topic:', topic);

    if (!topic) {
        console.error('Usage: node generate-blog.js "<topic>"');
        process.exit(1);
    }

    console.log('Generating blog post for topic:', topic);

    try {
        const htmlContent = await generateBlogPost(topic);
        const filename = slugify(topic, { lower: true, strict: true }) + '.html';
        const blogPath = path.join(process.cwd(), 'Blog', filename);

        fs.writeFileSync(blogPath, htmlContent, 'utf8');
        console.log('Blog post saved to', blogPath);

        execSync(`git add "${blogPath}"`);
        execSync(`git commit -m "Add blog post about ${topic}"`);
        execSync('git push');
        console.log('Changes pushed to GitHub');
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
