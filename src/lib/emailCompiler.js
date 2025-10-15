import fs from 'fs/promises';
import mjml2html from 'mjml';

const TEMPLATE_FILE = 'src/templates/NewsletterTemplate.mjml';

export async function compileEmail(htmlContent) {
  try {
    const mjmlTemplate = await fs.readFile(TEMPLATE_FILE, 'utf-8');
    const finalMjml = mjmlTemplate.replace('<!-- CONTENT_SLOT -->', htmlContent);
    
    const { html, errors } = mjml2html(finalMjml, { validationLevel: 'strict' });
    
    if (errors.length > 0) {
      console.error('MJML Errors:', errors);
    }
    
    return html;
  } catch (error) {
    console.error('Email compilation failed:', error);
    return null;
  }
}