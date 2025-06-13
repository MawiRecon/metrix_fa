const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'Blog');
const indexPath = path.join(__dirname, 'blog.html');

function getTitleFromHTML(content) {
    const match = content.match(/<title>(.*?)<\/title>/i);
    return match ? match[1].trim() : 'Untitled Post';
}

function generateListItems() {
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));
    return files.map(file => {
        const filePath = path.join(blogDir, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        const title = getTitleFromHTML(html);
        return `            <li><a href="Blog/${file}">${title}</a></li>`;
    }).join('\n');
}

function updateIndex() {
    const blogHTML = fs.readFileSync(indexPath, 'utf-8');

    const newList = generateListItems();

    const updatedHTML = blogHTML.replace(
        /<ul>([\s\S]*?)<\/ul>/,
        `<ul>\n${newList}\n        </ul>`
    );

    fs.writeFileSync(indexPath, updatedHTML);
    console.log('✅ blog.html updated with latest blog post links.');
}

updateIndex();
