import fs from 'fs'
import path from 'path'

//define the structure of the metadata we expect in the frontmatter file
type Metadata = {
    title: string
    publishedAt: string
    summary: string
    tag: string
    image?: string //optional field
}

//funtion to pass the frontmatter from file content
function parseFrontmatter(fileContent: string) {
    //regex to match the frontmatter block content ('---' ~ markers) 
    let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    //execute the file content to extract the frontmatter block
    let match = frontmatterRegex.exec(fileContent);
    //extract the frontmatter block
    let frontMatterBlock = match![1];
    //remove any hidden trail of white spaces from the frontmatter block
    let content = fileContent.replace(frontmatterRegex, '').trim();
    //Split the frontmatter block into individual lines
    let frontMatterLines = frontMatterBlock.trim().split('\n');

    //initialize an empty list of lines
    let metadata: Partial<Metadata> = {}; //assign the metadata to hold key value pairs

    //We process each line of the frontmatter block by iterating over each line in the metadata
    frontMatterLines.forEach((line) => {
        //split each line into keys and values pairs
        let [key, ...valueArr] = line.split(': ');
        let value = valueArr.join(': ').trim()
        value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
        metadata[key.trim() as keyof Metadata] = value
    })

    return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
    let rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
    let mdxFiles = getMDXFiles(dir)
    return mdxFiles.map((file) => {
        let { metadata, content } = readMDXFile(path.join(dir, file))
        let slug = path.basename(file, path.extname(file))
                                                    
        return {
            metadata,
            slug,
            content,
        }
    })
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), 'content'))
}

export function formatDate(date: string, includeRelative = false) {
    let currentDate = new Date()
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    let targetDate = new Date(date)

    let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
    let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
    let daysAgo = currentDate.getDate() - targetDate.getDate()

    let formattedDate = ''

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`
    } else {
        formattedDate = 'Today'
    }

    let fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    if (!includeRelative) {
        return fullDate
    }

    return `${fullDate} (${formattedDate})`
}