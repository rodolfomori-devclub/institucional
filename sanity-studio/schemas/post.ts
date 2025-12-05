export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrição (SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(160)
    },
    {
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        }
      ]
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Manual',
      type: 'image',
      description: 'Imagem opcional para substituir a gerada automaticamente pela IA',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        }
      ]
    },
    {
      name: 'featured',
      title: 'Post em Destaque',
      type: 'boolean',
      description: 'Marque para exibir como post em destaque',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Rascunho', value: 'draft' },
          { title: 'Aguardando Revisão', value: 'pending_review' },
          { title: 'Publicado', value: 'published' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft'
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Blog', value: 'blog' },
          { title: 'Newsletter', value: 'newsletter' }
        ],
        layout: 'radio'
      },
      initialValue: 'blog'
    },
    {
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            }
          ]
        },
        {
          type: 'code',
          options: {
            withFilename: true
          }
        },
        {
          name: 'youtube',
          type: 'object',
          title: 'YouTube Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              validation: (Rule: any) => Rule.required()
            }
          ],
          preview: {
            select: {
              url: 'url'
            },
            prepare({ url }: any) {
              return {
                title: 'YouTube Video',
                subtitle: url
              }
            }
          }
        },
        {
          name: 'embed',
          type: 'object',
          title: 'Embed (Twitter, CodePen, etc)',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL do Embed',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'type',
              type: 'string',
              title: 'Tipo',
              options: {
                list: [
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'CodePen', value: 'codepen' },
                  { title: 'CodeSandbox', value: 'codesandbox' },
                  { title: 'GitHub Gist', value: 'gist' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage'
    },
    prepare(selection: any) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `por ${author}`
      })
    }
  }
}