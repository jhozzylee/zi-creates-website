import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: 'j61z87re',
  dataset:'production',
  apiVersion,
  useCdn: true,
})
