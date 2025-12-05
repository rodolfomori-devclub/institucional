import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemaTypes from './schemas'

export default defineConfig({
  name: 'default',
  title: 'DevClub Blog',

  projectId: 'twwvsuby', // Substitua pelo seu Project ID
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Aguardando Revisão')
              .child(
                S.documentList()
                  .title('Aguardando Revisão')
                  .filter('_type == "post" && status == "pending_review"')
              ),
            S.listItem()
              .title('Publicados')
              .child(
                S.documentList()
                  .title('Publicados')
                  .filter('_type == "post" && status == "published"')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['post'].includes(listItem.getId() as string)
            ),
            S.listItem()
              .title('Todos os Posts')
              .child(S.documentTypeList('post').title('Todos os Posts')),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})