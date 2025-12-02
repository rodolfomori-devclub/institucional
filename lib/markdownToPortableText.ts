export const markdownToPortableText = (markdown: string) => {
  
  return [
    {
      _type: 'code',
      language: 'markdown-content',
      code: markdown
    }
  ];
};