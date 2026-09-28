import type { DataSourceItem } from './types'
import type { Tool } from '@/app/components/tools/types'

export const transformDataSourceToTool = (dataSourceItem: DataSourceItem) => {
  const isLocalFile = dataSourceItem.declaration.provider_type === 'local_file'
  const hasCredentials = !isLocalFile && !!dataSourceItem.declaration.credentials_schema?.length
  const isAuthorized = isLocalFile || !hasCredentials || dataSourceItem.is_authorized

  return {
    id: dataSourceItem.plugin_id,
    provider: dataSourceItem.provider,
    name: dataSourceItem.provider,
    author: dataSourceItem.declaration.identity.author,
    description: dataSourceItem.declaration.identity.description,
    icon: dataSourceItem.declaration.identity.icon,
    label: dataSourceItem.declaration.identity.label,
    type: dataSourceItem.declaration.provider_type,
    team_credentials: {},
    allow_delete: hasCredentials,
    is_team_authorization: isAuthorized,
    is_authorized: isAuthorized,
    labels: dataSourceItem.declaration.identity.tags || [],
    plugin_id: dataSourceItem.plugin_id,
    plugin_unique_identifier: dataSourceItem.plugin_unique_identifier,
    tools: dataSourceItem.declaration.datasources.map((datasource) => {
      return {
        name: datasource.identity.name,
        author: datasource.identity.author,
        label: datasource.identity.label,
        description: datasource.description,
        parameters: datasource.parameters,
        labels: [],
        output_schema: datasource.output_schema,
      } as Tool
    }),
    credentialsSchema: dataSourceItem.declaration.credentials_schema || [],
    meta: {
      version: '',
    },
  }
}
