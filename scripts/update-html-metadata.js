const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '../src/constants/metadata.json');
const htmlPath = path.join(__dirname, '../public/index.html');

try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Helper to escape HTML special characters for attributes
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    // Helper to replace or insert meta tags
    const updateMeta = (property, content) => {
        const escapedContent = escapeHtml(content);
        const tag = `<meta property="${property}" content="${escapedContent}" />`;
        const regex = new RegExp('<meta\\s+property="' + property + '"[^>]*>', 'g');

        if (regex.test(html)) {
            html = html.replace(regex, tag);
        } else {
            // Insert before </head>
            if (html.includes('</head>')) {
                html = html.replace('</head>', `    ${tag}\n    </head>`);
            } else {
                console.warn(
                    `Warning: Could not find </head> tag to insert meta property "${property}".`,
                );
            }
        }
    };

    // Update <title>
    const titleTag = `<title>${escapeHtml(metadata.name)}</title>`;
    if (/<title>[\s\S]*?<\/title>/.test(html)) {
        html = html.replace(/<title>[\s\S]*?<\/title>/, titleTag);
    } else {
        if (html.includes('</head>')) {
            html = html.replace('</head>', '    ' + titleTag + '\n    </head>');
        } else {
            console.warn('Warning: Could not find </head> tag to insert title tag.');
        }
    }
        }
    }
        }
    }
        }
    }
        }
    }
        }
    }
        }
    }
        }
    }
        }
    }

    updateMeta('og:title', metadata.name);
    updateMeta('og:description', metadata.description);
    updateMeta('og:url', metadata.homepage);

    const imageUrl = `${metadata.homepage}/icon.png`;
    updateMeta('og:image', imageUrl);

    updateMeta('twitter:title', metadata.name);
    updateMeta('twitter:description', metadata.description);
    updateMeta('twitter:url', metadata.homepage);
    updateMeta('twitter:image', imageUrl);
    // Twitter card type
    updateMeta('twitter:card', 'summary_large_image');

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully updated public/index.html with metadata.');
} catch (error) {
    console.error('Error updating metadata:', error);
    process.exit(1);
}
