// generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';

const blogDir = path.join(process.cwd(), 'blog');
const files = fs
    .readdirSync(blogDir)
    .filter(f => f.endsWith('.html'));

// create sitemap stream
const sitemap = new SitemapStream({ hostname: 'https://metrixcalculator.com' });

// add each blog page
files.forEach(file => {
    sitemap.write({
        url: `/blog/${file}`,
        changefreq: 'weekly',
        priority: 0.8
    });
});

// end and write file
sitemap.end();
streamToPromise(sitemap).then(output => {
    fs.writeFileSync('sitemap.xml', output.toString());
    console.log('✅ sitemap.xml generated');
});