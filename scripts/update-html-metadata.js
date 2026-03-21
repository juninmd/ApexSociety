const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '../src/constants/metadata.json');
const templatePath = path.join(__dirname, '../public/index.template.html');
const outputPath = path.join(__dirname, '../public/index.html');

try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    let html = fs.readFileSync(templatePath, 'utf8');

    // Allow environment variables to override metadata
    const homepage = process.env.HOMEPAGE || metadata.homepage;
    if (!homepage) {
        throw new Error('homepage is not defined in metadata.json or as a HOMEPAGE environment variable.');
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;
    }
    // Remove trailing slash if present for consistency
    const cleanHomepage = homepage.endsWith('/') ? homepage.slice(0, -1) : homepage;

    const imageUrl = `${cleanHomepage}/icon.png`;

    const replacements = {
        '{{TITLE}}': metadata.name,
        '{{DESCRIPTION}}': metadata.description,
        '{{URL}}': cleanHomepage,
        '{{IMAGE_URL}}': imageUrl,
        '{{AUTHOR}}': metadata.author,
        '{{KEYWORDS}}': metadata.keywords,
        '{{THEME_COLOR}}': metadata.themeColor,
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
        // Replace all occurrences using split/join as a global replace
        html = html.split(placeholder).join(value || '');
    });

    fs.writeFileSync(outputPath, html, 'utf8');
    console.log('Successfully generated public/index.html from template with metadata.');
} catch (error) {
    console.error('Error generating index.html:', error);
    process.exit(1);
}
