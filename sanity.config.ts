import { DefaultDocument, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

import { myTheme } from './theme'
import StudioNavbar from './components/StudioNavbar'
import Logo from './components/Logo'
import { getDefaultDocumentNode } from './structure'

export default defineConfig({
  basePath: '/studio',

  name: 'devs_stories_Content_Studio',
  title: 'Devs Stories Content Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',

  plugins: [
    deskTool({
      defaultDocumentNode: getDefaultDocumentNode
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar
    }
  },

  theme: myTheme
})
