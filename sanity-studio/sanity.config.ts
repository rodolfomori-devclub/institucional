import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemaTypes from './schemas'

export default defineConfig({
  name: 'default',
  title: 'DevClub Blog',

  projectId: 'twwvsuby', // Substitua pelo seu Project ID
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})